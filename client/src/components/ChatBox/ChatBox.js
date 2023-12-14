import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Input,
  Space,
  message,
  Badge,
  Avatar,
  Tooltip,
  Dropdown,
  Menu,
} from 'antd';
import styles from './styles';
import {
  CloseOutlined,
  DeleteOutlined,
  MessageOutlined,
  SendOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Message from '../Message';

const ChatBox = ({
  messageContent,
  setMessageContent,
  messages,
  userId,
  scrollRef,
  handleNewMessage,
  setCurrentChat,
  handleDeleteChat,
  currentChat,
}) => {
  useEffect(() => {}, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleWriteMessage = (e) => {
    setMessageContent(e.target.value);
  };

  const handleCloseChat = () => {
    setCurrentChat(null); // Set the current chat to null to close the chat window
  };

  const menuItems = [
    {
      key: '1',
      label: (
        <Space>
          <CloseOutlined />
          Close Chat
        </Space>
      ),
      onClick: handleCloseChat, // Assign the close chat function to onClick
    },
    {
      key: '2',
      label: (
        <Space>
          <DeleteOutlined />
          Delete Chat
        </Space>
      ),
      onClick: handleDeleteChat, // Assign the delete chat function to onClick
    },
  ];

  const menu = (
    <Menu>
      {menuItems.map((item, index) => (
        <Menu.Item key={index}>
          <Button onClick={item.onClick} type='text'>
            {item.label}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Card style={styles.chatCard}>
      <div className='chatBox' style={styles.chatBox}>
        <div className='topMenu' style={styles.topMenu}>
          <Space size='middle' style={{ display: 'flex-end' }}>
            <Tooltip title={`${currentChat.members.length} members`}>
              <Badge count={currentChat.members.length}>
                <Avatar shape='square' icon={<UserOutlined />} size='middle' />
              </Badge>
            </Tooltip>
            <Tooltip title={`${messages.length} messages`}>
              <Badge count={messages.length}>
                <Avatar
                  shape='square'
                  icon={<MessageOutlined />}
                  size='middle'
                />
              </Badge>
            </Tooltip>
            <Badge>
              <Dropdown overlay={menu} placement='bottomLeft'>
                <Button>...</Button>
              </Dropdown>
            </Badge>
          </Space>
        </div>
        {messages.length > 0 ? (
          <>
            <div className='chatBoxTop' style={styles.chatBoxTop}>
              {messages.map((m, index) => (
                <div ref={scrollRef} key={index}>
                  <Message
                    message={m}
                    own={m.senderId === userId}
                    key={index}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <Card style={styles.noMessageCard}>
            <span className='noMessageText' style={styles.noMessageText}>
              Be the first to message.
            </span>
          </Card>
        )}
        <div className='chatBoxBottom' style={styles.chatBoxBottom}>
          <Space.Compact
            style={{
              width: '100%',
              display: 'flex',
            }}
          >
            <Input
              placeholder='Write somethig...'
              value={messageContent}
              allowClear
              onChange={handleWriteMessage}
            />
            <Button type='primary' htmlType='submit' onClick={handleNewMessage}>
              <SendOutlined />
            </Button>
          </Space.Compact>
        </div>
      </div>
    </Card>
  );
};

export default ChatBox;
