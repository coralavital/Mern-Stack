import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoryList from '../StoryList';
import StoryForm from '../StoryForm';
import { Layout, Input, Card, Button, Divider } from 'antd';
import styles from './styles';
import { getStories } from '../../actions/stories';
import {
  GlobalOutlined,
  PhoneOutlined,
  PictureOutlined,
  ShareAltOutlined,
  SmileOutlined,
} from '@ant-design/icons';

const { Content } = Layout;

const Feed = () => {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  const stories = useSelector((state) => state.stories);
  const [visible, setVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));
  const username = user?.result?.username;

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  return (
    <Layout>
      <Content style={styles.content}>
        <Card style={styles.formCard} onClick={() => setVisible(true)}>
          <Input
            type='primary'
            style={styles.input}
            value={`So ${username}, tell us something...`}
            allowClear={false}
          />
          <Divider>
            <Button.Group
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'canter',
              }}
            >
              <Button>
                <PictureOutlined />
              </Button>
              <Button>
                <SmileOutlined />
              </Button>
              <Button>
                <GlobalOutlined />
              </Button>
            </Button.Group>
          </Divider>
        </Card>
        <StoryForm
          visible={visible}
          setVisible={setVisible}
          setSelectedId={setSelectedId}
          selectedId={selectedId}
        />
        <StoryList setSelectedId={setSelectedId} setVisible={setVisible} />
      </Content>
    </Layout>
  );
};

export default Feed;
