import React from 'react';
import { Button, Space } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  LikeOutlined,
  MessageOutlined,
  DeleteTwoTone,
  HeartTwoTone,
  HeartOutlined,
} from '@ant-design/icons';
import {
  deleteStory,
  likeStory,
  deleteComment,
  likeComment,
} from '../actions/stories';

const IconText = ({ icon, text, onClick }) => (
  <Button onClick={onClick}>
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  </Button>
);

export const storyActions = (
  item,
  username,
  setSelectedId,
  setVisible,
  setOpenCommentsSections,
  dispatch
) => {
  return [
    <Space style={{ marginTop: '30px' }}>
      <IconText
        icon={LikeOutlined}
        text={item.likes.length}
        key='list-vertical-like'
        onClick={() => {
          dispatch(likeStory(item._id));
        }}
      />
      <IconText
        icon={MessageOutlined}
        text={item.comments.length}
        key='list-vertical-message'
        onClick={() => {
          setOpenCommentsSections((prevState) => ({
            ...prevState,
            [item._id]: !prevState[item._id], // Toggle the state for the specific story
          }));
        }}
      />
      {item.username === username && <IconText
        icon={EditOutlined}
        text={''}
        key='list-vertical-edit'
        onClick={() => {
          setSelectedId(item._id);
          setVisible(true);
        }}
      /> }
      {item.username === username && <IconText
        icon={DeleteOutlined}
        text={''}
        key='list-vertical-delete'
        onClick={() => dispatch(deleteStory(item._id))}
      />}
      
    </Space>,
  ];
};

export const commentActions = (story, item, user, dispatch) => [
  <Space style={{ marginBottom: '5px' }}>
    <IconText
      icon={HeartOutlined}
      text={item.likes.length}
      key='list-vertical-like'
      onClick={() => {
        const data = {
          commentId: item._id,
          userId: user._id,
        };
        dispatch(likeComment(story._id, data));
      }}
    />
    {user.username === item.author && <IconText
      icon={DeleteOutlined}
      text={''}
      key='list-vertical-delete'
      onClick={() =>
        dispatch(deleteComment(story._id, { commentId: item._id }))
      }
    /> }
  </Space>,
];
