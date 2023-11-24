import {
  EditOutlined,
  DeleteTwoTone,
  HeartTwoTone,
  MessageTwoTone,
} from '@ant-design/icons';
import {
  deleteStory,
  likeStory,
  deleteComment,
  // likeComment,
} from '../../actions/stories';
import { Tooltip } from 'antd';
// import { Icon } from '@ant-design/compatible';

import styles from './styles';

export const storyCardActions = (
  story,
  setVisible,
  setIsComment,
  setSelectedId,
  dispatch
) => [
  <div style={styles.actions}>
    <Tooltip
      placement='top'
      title='Like'
      onClick={() => {
        dispatch(likeStory(story._id));
      }}
    >
      <HeartTwoTone twoToneColor='magenta' />
      &nbsp; {story.likes.length} &nbsp;
    </Tooltip>
  </div>,
  <div style={styles.actions}>
    <Tooltip
      placement='top'
      title='Comment'
      onClick={() => {
        setIsComment((prevIsComment) => !prevIsComment);
      }}
    >
      <MessageTwoTone twoToneColor='green' />
    </Tooltip>
  </div>,
  <div style={styles.actions}>
    <Tooltip
      placement='top'
      title='Edit'
      onClick={() => {
        setSelectedId(story._id);
        setVisible(true);
      }}
    >
      <EditOutlined twoToneColor='grey' />
    </Tooltip>
  </div>,
  <div style={styles.actions}>
    <Tooltip placement='top' title='Delete'>
      <DeleteTwoTone
        twoToneColor='red'
        onClick={() => dispatch(deleteStory(story._id))}
      />
    </Tooltip>
  </div>,
];

export const commentActions = (story, item, dispatch) => [
  // <div style={styles.actions}>
  //   <Tooltip placement='top' title='Like'>
  //     <Icon
  //       type='like'
  //       twoToneColor='grey'
  //       onClick={() => {}}
  //       // dispatch(likeComment(story._id, item))
  //     />
  //   </Tooltip>
  // </div>,
  <div style={styles.actions}>
    <Tooltip placement='top' title='Delete'>
      <DeleteTwoTone
        twoToneColor='red'
        onClick={() =>
          dispatch(deleteComment(story._id, { commentId: item._id }))
        }
      />
    </Tooltip>
  </div>,
];
