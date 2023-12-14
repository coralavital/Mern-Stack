import React, { useEffect, useRef, useState } from 'react';
import {
  Typography,
  Avatar,
  Space,
  List,
  Badge,
  Flex,
  Segmented,
  Tooltip,
  Divider,
  Card,
} from 'antd';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';

import styles from './styles';
import Meta from 'antd/es/card/Meta';
import Title from 'antd/es/skeleton/Title';

const { Paragraph } = Typography;

const Message = ({ message, own }) => {
  const users = useSelector((state) => state.users);
  const [username, setUsername] = useState('');

  const random = Math.floor(Math.random() * 10);

  useEffect(() => {
    console.log(users);
    setUsername(users.find((user) => user._id === message.senderId).username);
  }, [message]);

  return (
    <div style={own ? styles.messageOwn : styles.message}>
      <Space style={styles.messageTop} size='middle'>
        {own ? (
          <Card
            style={{
              ...styles.messageText,
              backgroundColor: 'rgb(245, 241, 241)',
              color: 'black',
            }}
          >
            <Meta
              title={
                <div style={{ fontWeight: 'normal', textAlign: 'end',  color: 'black' }}>
                  {message.text}
                </div>
              }
              description={
                <Tooltip
                  placement='left'
                  title={
                    <div style={{ fontSize: '10px' }}>{message.createdAt}</div>
                  }
                >
                  <div style={{ textAlign: 'start', color: 'black' }}>
                    {format(message.createdAt)}
                  </div>
                </Tooltip>
              }
            />
          </Card>
        ) : null}
        <Badge>
          <Segmented
            options={[
              {
                label: (
                  <div
                    style={{
                      padding: 3,
                    }}
                  >
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${random}`}
                    />
                    <div style={{ fontWeight: 'bold' }}>{username}</div>
                  </div>
                ),
                value: 'user1',
              },
            ]}
          />
        </Badge>
        {!own ? (
          <Card
            style={{
              ...styles.messageText,
              backgroundColor: '#1877f2',
            }}
          >
            <Meta
              title={<div style={{ fontWeight: 'normal', color: 'white', }}>{message.text}</div>}
              description={
                <Tooltip
                  placement='right'
                  title={
                    <div style={{ fontSize: '10px' }}>{message.createdAt}</div>
                  }
                >
                  <div style={{ textAlign: 'end', color: 'white' }}>
                    {format(message.createdAt)}
                  </div>
                </Tooltip>
              }
            />
          </Card>
        ) : null}
      </Space>
    </div>
  );
};

export default Message;
