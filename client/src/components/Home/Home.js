import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StoryList from '../StoryList';
import StoryForm from '../StoryForm';
import { Layout, Input, Button, Card } from 'antd';
import styles from './styles';
import { getStories } from '../../actions/stories';

const { Content } = Layout;

const Home = () => {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem('profile'));
  const username = user?.result?.username;

  return (
    <Layout>
      <Content style={styles.content}>
        <div>
        <Card style={styles.formCard}>
          <Input
            type='primary'
            style={styles.input}
            onClick={() => setVisible(true)}
            value={`So ${username}, tell me something...`}
            allowClear={false}
            
          />
          <StoryForm visible={visible} onCancel={() => setVisible(false)} setSelectedId={setSelectedId} selectedId={selectedId}/>
        </Card>
        </div>
        <StoryList setSelectedId={setSelectedId} />
      </Content>
    </Layout>
  );
};

export default Home;
