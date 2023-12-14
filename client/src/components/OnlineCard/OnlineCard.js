import { Avatar, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import Title from 'antd/es/typography/Title';

const OnlineCard = ({
  onlineUsers,
  searchValue,
  handleNewConversation,
  color,
}) => {
  const [onlineList, setOnlineList] = useState([]);

  useEffect(() => {
    setOnlineList(onlineUsers);
  }, [onlineUsers]);

  return (
    <Card
      title={<Title style={{ fontSize: '30px' }}>Online Users</Title>}
      style={styles.onlineCard}
    >
      {onlineList?.map((o, index) => (

          <Avatar
          key={index}
            onClick={(e) => {
            searchValue.push({ value: o._id, label: 1 });
            // searchValue.push({ value: userId, label: 2 });
            handleNewConversation();
          }}
            style={{
              backgroundColor: color,
              verticalAlign: 'middle',
            }}
            size='large'
          >
            {o.username}
          </Avatar>

      ))}
    </Card>
  );
};

export default OnlineCard;
