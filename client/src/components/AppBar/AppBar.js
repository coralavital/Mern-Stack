import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Image, Typography, Dropdown } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import Logo from '../../images/instaverse.png';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import { jwtDecode } from "jwt-decode";

import styles from './styles';

const { Title } = Typography;
const { Header } = Layout;

export default function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  const items = user
    ? [
        {
            label: 'Setting',
            key: '2',
            icon: <SettingOutlined />
        },
        {
          label: 'Logout',
          key: '1',
          icon: <LogoutOutlined />,
        },
      ]
    : [
        {
          label: 'Login',
          key: '0',
          icon: <LoginOutlined />,
        },
      ];

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/authform'); // redirect to login page
    setUser(null);
  };

  const onClick = ({ key }) => {
   switch(key) {
    case '0':
        return navigate('/authform');
    case '1':
        return logout();
    default:
      break;
        
   }
  };
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <Header style={styles.header}>
      <Link to='/'>
        <div style={styles.homeLink}>
          <Image style={styles.image} preview={false} src={Logo} width={45} />
          &nbsp;
          <Title style={styles.title}>Instaverse</Title>
        </div>
      </Link>
      {!user ? (
        <div style={styles.userInfo}>
          <Dropdown.Button
            menu={{ items, onClick }}
            placement='bottom'
            icon={<UserOutlined />}
          >
            Hi
          </Dropdown.Button>
        </div>
      ) : (
        <div style={styles.userInfo}>
          <Dropdown.Button
            menu={{ items, onClick }}
            placement='bottom'
            icon={<UserOutlined />}
          >
            Hi, {user?.result?.username}
          </Dropdown.Button>
        </div>
      )}
    </Header>
  );
}
