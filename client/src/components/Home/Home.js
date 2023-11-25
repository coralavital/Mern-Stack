import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import StoryList from '../StoryList';
import StoryForm from '../StoryForm';
import { Layout, Input, Card, Typography } from 'antd';
import styles from './styles';
import { getStories } from '../../actions/stories';
import Link from 'antd/es/typography/Link';
const { Title } = Typography;

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

  if (!user) {
    return (
      <Card style={styles.formCard}>
        <Title level={4}>
          <span style={styles.formTitle}>Welcome to Instaverse!</span> <br />
          Please <Link to='/authform'>login</Link> or{' '}
          <Link to='/authform'>register</Link> for sharing instant moments or
          ideas.
        </Title>
      </Card>
    );
  }


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
          <StoryForm visible={visible} setVisible={setVisible} setSelectedId={setSelectedId} selectedId={selectedId}/>
        </Card>
        </div>
        <StoryList setSelectedId={setSelectedId} setVisible={setVisible} />
      </Content>
    </Layout>
  );
};

export default Home;
