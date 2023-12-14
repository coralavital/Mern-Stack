import {
  Typography,
  Card,
  Descriptions,
  Button,
  Row,
  Col,
  Input,
  Popconfirm,
  message,
} from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles';
import { deleteUser, updatePassword } from '../../actions/users';
import { LockOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';

import { LOGOUT } from '../../constants/actionTypes';

const Account = ({ dispatch }) => {
  const currentUser = JSON.parse(localStorage.getItem('profile'));
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user._id === currentUser?.result?._id);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const onDeleteUser = () => {
    dispatch({ type: LOGOUT });
    dispatch(deleteUser(user._id));
    navigate('/authform'); // redirect to login page
  }

  const onUpdatePassword = async () => {
    const passwords = {
      currentPassword, newPassword, confirmPassword
    }
    try {
      await dispatch(updatePassword(user._id, passwords));
      message.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <Card style={styles.formCard}>
      <Descriptions column={1} title={<Title>User Setting</Title>}>
        <Descriptions.Item label='Change Password'>
        <Row align={'center'}>
            <Col span={16} style={{ marginBottom: '20px' }}>
              <Input
                type='password'
                placeholder='Current Password'
                prefix={<LockOutlined />}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Col>
            <Col span={16} style={{ marginBottom: '20px' }}>
              <Input
                type='password'
                placeholder='New Password'
                prefix={<LockOutlined />}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Col>
            <Col span={16} style={{ marginBottom: '20px' }}>
              <Input
                type='password'
                placeholder='Confirm Password'
                prefix={<LockOutlined />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
            <Col span={16}>
              <Button onClick={onUpdatePassword}>Update Password</Button>
            </Col>
          </Row>
        </Descriptions.Item>
        <Descriptions.Item label='Delete Account'>
        <Row align={'center'}>
            <Col span={2} style={{ marginLeft: '50px' }}>
        
            <Popconfirm
              placement='right'
              title={'Delete Account'}
              description={'Are you sure you want to delete your account?'}
              okButtonProps={{onClick: onDeleteUser}}
              okText='Yes'
              cancelText='No'
            >
              <Button>Delete Account</Button>
            </Popconfirm>
         </Col>
         </Row>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Account;
