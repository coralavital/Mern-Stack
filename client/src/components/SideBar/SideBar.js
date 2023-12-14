import React, { useState } from 'react';
import {
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  BulbOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { Menu, Badge } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';

const SideBar = ({ setScreenIndex, screenIndex, socket, toggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const leaveChatSection = () => {
    socket?.current.disconnect(); // Emit event to notify server about leaving Chat section
  };

  const onClick = ({ key }) => {
    switch (key) {
      case '1':
        // Feed section
        return setScreenIndex(1);
      case '2':
        // Chat section
        return setScreenIndex(2);
      case '3':
        // Account section
        return setScreenIndex(3);
      case '4':
        // Account section
        return setScreenIndex(4);
      case '5':
        // Logout
        leaveChatSection();
        setScreenIndex(1);
        return logout();
      default:
        break;
    }
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/authform'); // redirect to login page
    setUser(null);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    {
      key: 'toggle',
      icon: (
        <Badge
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={toggleCollapsed}
              style={{ alignSelf: 'left' }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={toggleCollapsed}
              style={{ alignSelf: 'left' }}
            />
          )}
          <span style={{ flex: 1 }}></span>{' '}
          {/* Empty span to push the Bulb icon to the end */}
          <BulbOutlined style={{ alignSelf: 'right' }} onClick={toggleTheme} />
        </Badge>
      ),
      label: '',
      type: 'toggle',
    },
    getItem(
      '',
      '0',
      null,
      [
        getItem('Feed', '1', <AppstoreOutlined />),
        getItem('Chats', '2', <CommentOutlined />),
      ],
      'group'
    ),
    {
      type: 'divider',
    },
    getItem(
      '',
      'user-menu',
      <ProfileOutlined />,
      [
        getItem('Profile', '3', <UserOutlined />),
        getItem('Account', '4', <SettingOutlined />),
        getItem('Logout', '5', <LogoutOutlined />),
      ],
      'sub4'
    ),
    {
      type: 'divider',
    },
  ];

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={[`${screenIndex}`]}
      defaultOpenKeys={[`${screenIndex}`]}
      mode='inline'
      items={items}
      // theme={themeVariables.primaryColor}
      inlineCollapsed={collapsed}
      style={{
        width: !collapsed ? 210 : 120,
        marginTop: '30px',
        height: '100%',
        // backgroundColor: themeVariables.primaryColor,
        // color: themeVariables.textColor
      }}
    />
  );
};
export default SideBar;
