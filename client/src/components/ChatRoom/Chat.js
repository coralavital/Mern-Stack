import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Row, message } from 'antd';
import { useSelector } from 'react-redux';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../actions/users';
import {
  createConversation,
  createMessage,
  deleteConversation,
  getConversations,
  getMessages,
} from '../../actions/conversations';
import Title from 'antd/es/typography/Title';
import ChatMenu from '../ChatMenu/ChatMenu';
import ChatBox from '../ChatBox/ChatBox';
import OnlineCard from '../OnlineCard/OnlineCard';

const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const Chat = ({ socket, onlineUsers }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?._id;
  const messageList = useSelector((state) => state.messages);
  const conversations = useSelector((state) => state.conversations);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  
  const dispatch = useDispatch();
  
  const [messageContent, setMessageContent] = useState('');
  const [searchValue, setSearchValue] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  
  const random = Math.floor(Math.random() * 3) + 0;
  const color = ColorList[random];

  useEffect(() => {
    setMessages(messageList);
  }, [messageList, arrivalMessage]);

  useEffect(() => {
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        text: data.text,
        senderId: data.senderId,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMessages(currentChat?._id));
  }, [dispatch, currentChat]);

  useEffect(() => {
    dispatch(getConversations(userId));
  }, [dispatch, userId]);
  
  useEffect(() => {
    socket.current.on('newConversation', (data) => {
      dispatch(getConversations(userId));
      return () => {
        socket.current.off('newConversation');
      };
    });
  
  }, [dispatch, userId]);
  useEffect(() => {
    socket.current.on('conversationDeleted', (data) => {
      dispatch(getConversations(userId));
      setCurrentChat(null);
      return () => {
        socket.current.off('deleteConversation');
      };
    });
  
  }, [dispatch, userId]);

  const handleNewMessage = (e) => {
    if (!currentChat) {
      console.error('Current chat or members not available');
      return;
    }
  
    const message = {
      conversationId: currentChat._id,
      text: messageContent,
      senderId: userId,
    };
  
    const receivers = currentChat.members.filter((member) => member !== userId);
  
    socket.current.emit('sendMessage', {
      senderId: userId,
      receivers,
      text: messageContent,
    });
  
    dispatch(createMessage(message));
    setMessageContent('');
  };
  

  const handleNewConversation = () => {
    if (!searchValue.length) {
      message.error('You cannot open a conversation by yourself');
    } else {
      const members = searchValue.map((member) => member.value);
      members.push(userId);
  
      try {
        // Create conversation and get the result
        dispatch(createConversation({ members }));
        dispatch(getConversations(userId));
        setSearchValue([]);
  
        // Emit a socket event to notify other users about the new conversation
        socket.current.emit('newConversation', { members });
        // Set the newly created conversation as the current chat
      const newConversation = conversations[conversations.length - 1];
      setCurrentChat(newConversation); // Update this line based on the structure of the newConversation object
      } catch (error) {
        // Handle error if any
        console.error('Error creating conversation:', error);
      }
    }
  };

  const handleDeleteChat = () => {
    dispatch(deleteConversation(currentChat?._id));
    socket.current.emit('deleteConversation', { conversationId: currentChat?._id });
    message.info('Conversation deleted');

  };


  return (
    <Row style={styles.chat}>
      <Col span={6}>
        <ChatMenu
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setCurrentChat={setCurrentChat}
          handleNewConversation={handleNewConversation}
        />
      </Col>
      <Col span={18}>
        {currentChat ? (
          <ChatBox
            messageContent={messageContent}
            setMessageContent={setMessageContent}
            messages={messages}
            userId={userId}
            scrollRef={scrollRef}
            handleNewMessage={handleNewMessage}
            color={color}
            setCurrentChat={setCurrentChat}
            handleDeleteChat={handleDeleteChat}
            currentChat={currentChat}
          />
        ) : (
          <Card style={styles.chatCard}>
            <Title style={styles.noConversationText}>
              Open a conversations to start a chat
            </Title>
          </Card>
        )}
      </Col>
      {/* <Col span={6}>
        <OnlineCard
          onlineUsers={onlineUsers}
          searchValue={searchValue}
          handleNewConversation={handleNewConversation}
          color={color}
        />
      </Col> */}
    </Row>
  );
};

export default Chat;
