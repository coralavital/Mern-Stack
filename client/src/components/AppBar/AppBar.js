import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Image, Typography, Dropdown } from 'antd';
import {
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Logo from '../../images/likeme-logo.png';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';

import styles from './styles';

const { Title } = Typography;
const { Header } = Layout;

export default function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/authform'); // redirect to login page
    setUser(null);
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
    <Header style={{...styles.header}}>
      <Link to='/'>
        <div style={styles.homeLink}>
          
          
          <Image preview={false} src={Logo} width={210} height={120} />
        </div>
      </Link>
    </Header>
  );
}
