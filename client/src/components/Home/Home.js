import React, { useEffect, useState } from 'react';
import { Layout, Card, Typography } from 'antd';
import styles from './styles';
import { Link } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import Chat from '../ChatRoom/Chat';
import Feed from '../Feed/Feed';
import Account from '../Account/Account';
import Profile from '../Profile/Profile';
import { io } from 'socket.io-client';
import { getUsers } from '../../actions/users';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { Title } = Typography;
const { Content } = Layout;

const Home = ({ toggleTheme }) => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?._id;
  const socket = useRef();
  const [screenIndex, setScreenIndex] = useState(1);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  useEffect(() => {
    socket.current = io('ws://localhost:4000');
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', userId);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        allUsers?.filter((f) =>
          users.some((u) => u.userId === f._id && u.userId !== userId)
        )
      );
    });
  }, [userId, allUsers]);

  return (
    <Layout hasSider>
      {user ? (
        <SideBar
          style={styles.siderStyle}
          setScreenIndex={setScreenIndex}
          screenIndex={screenIndex}
          socket={socket}
          toggleTheme={toggleTheme}
        />
      ) : null}
      {!user ? (
        <Content style={styles.content}>
          <Card style={styles.auth}>
            <Title level={4}>
              <span style={styles.formTitle}>Welcome to Instaverse!</span>{' '}
              <br />
              Please <Link to='/authform'>login</Link> or{' '}
              <Link to='/authform'>register</Link> for sharing instant moments
              or ideas.
            </Title>
          </Card>
        </Content>
      ) : screenIndex === 1 ? (
        <Feed />
      ) : screenIndex === 2 ? (
        <Chat
          style={styles.chatCard}
          socket={socket}
          onlineUsers={onlineUsers}
        />
      ) : screenIndex === 3 ? (
        <Profile dispatch={dispatch} />
      ) : screenIndex === 4 ? (
        <Account dispatch={dispatch} />
      ) : null}
    </Layout>
  );
};

export default Home;
