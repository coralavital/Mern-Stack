import { Tooltip, Space, Input, Button, List, Typography, Divider } from 'antd';
import { addComment } from '../../actions/stories';
import React, { useEffect, useState } from 'react';
import { Comment } from '@ant-design/compatible';
import { commentActions } from '../../constants/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Link from 'antd/es/typography/Link';

const { Title } = Typography;

function Comments({ story }) {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'))?.result;
  const username = user?.username;

  useEffect(() => {
    console.log(story);
  }, [story]);

  const onSubmit = () => {
    const newComment = {
      author: username,
      content: comment,
      postDate: new Date().toISOString(),
      likes: [],
    };
    dispatch(addComment(story._id, newComment));

    reset();
  };

  const reset = () => {
    setComment('');
  };

  return (
    <div>
      <List
        className='comment-list'
        style={{ marginBottom: '10px' }}
        dataSource={story.comments}
        renderItem={(item, index) => (
          <li>
            <Comment
            key={index}
              style={{ padding: '8px' }}
              author={
                <Link style={{ fontSize: '14px', fontWeight: 'bolder' }}>
                  {item.author}
                </Link>
              }
              content={
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <p style={{ marginBottom: 0 }}>{item.content}</p>
                  {user ? commentActions(story, item, user, dispatch) : null}
                </div>
              }
              datetime={
                <Tooltip
                  title={moment(item.postDate).format('YYYY-MM-DD HH:mm:ss')}
                >
                  <Title
                    style={{
                      fontSize: '13px',
                      fontWeight: 'revert-layer',
                      marginTop: '3px',
                    }}
                  >
                    {' '}
                    {moment().from(item.postDate)}
                  </Title>
                </Tooltip>
              }
            />
          </li>
        )}
      />
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <Space.Compact compact='true' style={{ width: '60%' }}>
          <Input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            placeholder='Write something...'
          />
          <Button type='primary' onClick={onSubmit}>
            Submit
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
}

export default Comments;
