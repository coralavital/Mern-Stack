import { EditOutlined, DeleteTwoTone, HeartTwoTone } from "@ant-design/icons";
import { deleteStory, likeStory, updateStory } from '../../actions/stories';
import { Card, Tooltip, Typography, Image, Carousel } from "antd";
import { useDispatch } from "react-redux";
import React, { useState } from 'react';
import moment from 'moment';

import styles from './styles';

const { Meta } = Card;
const { Link, Paragraph, Text } = Typography;

function Story({ story, setSelectedId }) {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(true);

  const user = JSON.parse(localStorage.getItem("profile"));

  const cardActions = [
    <div style={styles.actions}>
      <Tooltip
        placement='top'
        title='Like'
        color='magenta'
        onClick={() => { dispatch(likeStory(story._id)) }}
      >
        <HeartTwoTone twoToneColor="magenta" />
        &nbsp; {story.likes.length} &nbsp;
      </Tooltip>
    </div>,
    <Tooltip
      placement='top'
      title='Edit'
      onClick={() => { dispatch(updateStory(story, story._id)) }}
    >
      <EditOutlined onClick={() => {
        setSelectedId(story._id);
      }} />
    </Tooltip>,
    <Tooltip
      placement='top'
      title='Delete'
      color='red'
    >
      <DeleteTwoTone twoToneColor="red" onClick={() => dispatch(deleteStory(story._id))} />
    </Tooltip>
  ];

  return (
    <Card
      style={styles.card}
      cover={<Carousel infinite={false} effect="fade">{story.images.map((image, index) =>  {return <div key={index}><Image height={427} width={421} src={image} /></div>})}</Carousel>}
      actions={
        user?.result?._id === story?.userId ?
          cardActions :
          user?.result ?
            cardActions.slice(0, 1)
            : null
      }
    >
      <Meta title={story.username} />
      <Paragraph
        style={{ margin: 0 }}
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: "more",
          onExpand: () => {
            setExpand(true);
          },
          onEllipsis: () => {
            setExpand(false);
          }
        }}
      >
        {story.caption}
      </Paragraph>
      {expand ?
        <Link href="#">{story.tags.split(" ").map((tag) => `#${tag} `)}</Link>
        : null }
        <br />
        <Text type="secondary">{moment(story.postDate).fromNow()}</Text>
    </Card>
  )
}

export default Story;