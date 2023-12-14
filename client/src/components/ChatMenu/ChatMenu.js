import React, { useEffect } from 'react';
import { Button, Card, Select, Space, message } from 'antd';
import styles from './styles';
import Conversation from '../Conversation/Conversation';
import { FormOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const ChatMenu = ({
  searchValue,
  setSearchValue,
  setCurrentChat,
  handleNewConversation,
  color,
}) => {
  const conversations = useSelector((state) => state.conversations);
  const users = useSelector((state) => state.users);
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?._id;

  useEffect(() => {}, [conversations])

  return (
    <Card style={styles.chatMenu}>
      <Space.Compact
        style={{
          width: '100%',
          display: 'flex',
        }}
      >
        <Select
          bordered={false}
          showSearch
          value={searchValue}
          onChange={(newValue) => {
            setSearchValue(newValue);
          }}
          placeholder='Search for friends'
          labelInValue
          mode='multiple'
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option?.label ?? '').includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          style={styles.select}
          options={users
            .filter((user) => user._id !== userId)
            .map((user) => ({
              label: user.username,
              value: user._id,
            }))}
        />
        <Button
          type='primary'
          htmlType='submit'
          onClick={handleNewConversation}
        >
          <FormOutlined />
        </Button>
      </Space.Compact>
      {conversations?.map((c, index) => (
        <div onClick={() => setCurrentChat(c)} key={index}>
          <Conversation
            key={index}
            conversation={c}
            users={users.filter((user) => user._id !== userId)}
            color={color}
          />
        </div>
      ))}
    </Card>
  );
};

export default ChatMenu;
