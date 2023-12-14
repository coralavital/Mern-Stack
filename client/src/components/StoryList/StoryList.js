import { useSelector } from 'react-redux';
import {
  Card,
  Tooltip,
  Typography,
  Image,
  Carousel,
  List,
  Spin,
  Row,
  Col,
} from 'antd';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Comments from '../Comments/Comments';
import styles from './styles';
import { storyActions } from '../../constants/actions';
import { Content } from 'antd/es/layout/layout';
import Paragraph from 'antd/es/typography/Paragraph';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Link } = Typography;

function StoryList({ setSelectedId, setVisible }) {
  const stories = useSelector((state) => state.stories);
  const [openCommentsSections, setOpenCommentsSections] = useState({});

  const user = JSON.parse(localStorage.getItem('profile'));
  const username = user?.result?.username;
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return !stories ? (
    <div style={{ textAlign: 'center' }}>
      <Spin size='medium' />
    </div>
  ) : stories.length === 0 ? (
    <List dataSource={[]} />
  ) : (
    <List
      itemLayout='vertical'
      size='large'
      dataSource={stories}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      renderItem={(item) => (
        <div>
          <Card style={styles.card}>
            <List.Item
              key={item._id}
              actions={storyActions(
                item,
                username,
                setSelectedId,
                setVisible,
                setOpenCommentsSections,
                dispatch
              )}
              extra={
                <Carousel
                  style={{
                    width: '250px',
                    height: '200px',
                    marginTop: '20px',
                  }}
                  infinite={false}
                  effect='fade'
                >
                  {item.images.map((image, index) => {
                    return (
                      <div key={index}>
                        <Image
                          style={{ width: '250px', height: '200px' }}
                          src={image}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              }
            >
              <List.Item.Meta
                title={
                  <Row>
                    <Col span={19}>
                      <span style={{ fontSize: '17px', fontWeight: 'bolder' }}>
                        {item.username}
                      </span>
                    </Col>
                    <Col>
                      <Tooltip
                        title={moment(item.postDate).format(
                          'YYYY-MM-DD HH:mm:ss'
                        )}
                      >
                        <Paragraph style={{ color: 'gray' }}>
                          <ClockCircleOutlined /> {moment().from(item.postDate)}
                        </Paragraph>
                      </Tooltip>
                    </Col>
                  </Row>
                }
              />
              <Content style={{ marginBottom: '1rem' }}>{item.caption}</Content>

              <Link href='#'>
                {item.tags.split(' ').map((tag) => `#${tag} `)}
              </Link>
            </List.Item>
            {openCommentsSections[item._id] ? <Comments story={item} /> : null}
          </Card>
        </div>
      )}
    />
  );
}

export default StoryList;
