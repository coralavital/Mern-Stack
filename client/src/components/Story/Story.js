import { addComment } from '../../actions/stories';
import {
  Card,
  Tooltip,
  Typography,
  Image,
  Carousel,
  Space,
  Input,
  Button,
  List,
} from 'antd';
import { Comment } from '@ant-design/compatible';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { storyCardActions, commentActions } from './actions';
import styles from './styles';

const { Meta } = Card;
const { Link, Paragraph, Text } = Typography;

function Story({ story, setSelectedId, setVisible }) {
  const [expand, setExpand] = useState(true);
  const [comment, setComment] = useState('');
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));
  const username = user?.result?.username;

  useEffect(() => {}, [story]);

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
    setIsComment(false);
  };

  return (
    <Card
      style={styles.card}
      cover={
        <Carousel infinite={false} effect='fade'>
          {story.images.map((image, index) => {
            return (
              <div key={index}>
                <Image height={427} width={421} src={image} />
              </div>
            );
          })}
        </Carousel>
      }
      actions={
        // Check if the current user is the owner of the story
        // If so, the cuerrnt user have full access to the action
        // Otherwise, he only can like it.
        user?.result?._id === story?.userId
          ? storyCardActions(
              story,
              setVisible,
              setIsComment,
              setSelectedId,
              dispatch
            )
          : user?.result
          ? storyCardActions(
              story,
              setVisible,
              setIsComment,
              setSelectedId,
              dispatch
            ).slice(0, 1)
          : null
      }
    >
      <Meta title={story.username} />
      <Paragraph
        style={{ margin: 0 }}
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: 'more',
          onExpand: () => {
            setExpand(true);
          },
          onEllipsis: () => {
            setExpand(false);
          },
        }}
      >
        {story.caption}
      </Paragraph>
      {expand ? (
        <Link href='#'>{story.tags.split(' ').map((tag) => `#${tag} `)}</Link>
      ) : null}
      <br />
      <Text type='secondary'>{moment(story.postDate).fromNow()}</Text>
      <List
        className='comment-list'
        header={`${story.comments.length} replies`}
        itemLayout='horizontal'
        dataSource={story.comments}
        renderItem={(item) => (
          <li>
            <Comment
              actions={user?.result?.username === item.author 
              ? commentActions(story, item, dispatch) 
              : user?.result ? commentActions(story, item, dispatch).slice(1, 2) 
              : null }
              author={item.author}
              content={item.content}
              datetime={
                <Tooltip title={moment(item.postDate).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment().from(item.postDate)}</span>
                </Tooltip>
              }
            />
          </li>
        )}
      />
      {isComment ? (
        <Space.Compact compact='true'>
          <Input
            onChange={(e) => setComment(e.target.value)}
            placeholder='Write something'
          />
          <Button type='primary' onClick={onSubmit}>
            Submit
          </Button>
        </Space.Compact>
      ) : null}
    </Card>
  );
}

export default Story;
