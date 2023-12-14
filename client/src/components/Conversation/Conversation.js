import { UserOutlined } from '@ant-design/icons';
import { List, Button, Avatar, Space, Tooltip } from 'antd';
import React from 'react';

function Conversation({ conversation, users, color }) {
  const getMembers = () => {
    return users
      .filter((user) => conversation.members.includes(user._id))
      .map((member, index) => (
        <Tooltip title={member.username} placement="top">
         <Avatar
          key={index}
          style={{
            backgroundColor: color,
            verticalAlign: 'middle',
          }}
          size='large'
          icon={<UserOutlined />}

        />
          
      </Tooltip>
       
      ));
  };

  return (
    <div>
      <List.Item.Meta
        title={
          <Space>
            <Button type='link'>
              <Avatar.Group
                maxCount={2}
                maxStyle={{
                  color: '#9EC8B9',
                  backgroundColor: '#1B4242',
                }}
              >
                {getMembers()}
              </Avatar.Group>
            </Button>
          </Space>
        }
      />
    </div>
  );
}

export default Conversation;
