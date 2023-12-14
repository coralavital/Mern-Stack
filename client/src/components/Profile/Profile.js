import {
  Typography,
  Card,
  Descriptions,
  Button,
  Row,
  Col,
  Input,
  Avatar,
} from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles';
import { updateUser } from '../../actions/users';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

const { Paragraph } = Typography;

const Profile = ({ dispatch }) => {
  const currentUser = JSON.parse(localStorage.getItem('profile'));
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user._id === currentUser?.result?._id);

  const [editableAge, setEditableAge] = useState(null);
  const [editableAddress, setEditableAddress] = useState(null);
  const [editablePhone, setEditablePhone] = useState(null);
  const [editableFullName, setEditableFullName] = useState(null);

  const onSubmit = () => {
    const updatedFields = {
      age: editableAge !== null ? editableAge : user.age,
      address: editableAddress !== null ? editableAddress : user.address,
      phone: editablePhone !== null ? editablePhone : user.phone,
      fullName: editableFullName !== null ? editableFullName : user.fullName,
    };

    dispatch(updateUser(user._id, updatedFields));

    // Reset individual editable fields to null after submission
    setEditableAge(null);
    setEditableAddress(null);
    setEditablePhone(null);
    setEditableFullName(null);
  };

  const handleFieldChange = (field, value) => {
    switch (field) {
      case 'age':
        setEditableAge(value);
        break;
      case 'address':
        setEditableAddress(value);
        break;
      case 'phone':
        setEditablePhone(value);
        break;
      case 'fullName':
        setEditableFullName(value);
        break;
      default:
        break;
    }
  };

  const getEditableParagraph = (
    label,
    field,
    setEditableFunc,
    editableValue
  ) => (
    <Paragraph
      onClick={() => setEditableFunc(true)}
      editable={{
        editing: editableValue !== null,
        onChange: (value) => {
          setEditableFunc(false);
          handleFieldChange(field, value);
        },
      }}
    >
      {editableValue !== null ? (
        <Input
          value={editableValue}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          onPressEnter={() => {
            setEditableFunc(false);
            handleFieldChange(field, editableValue);
          }}
          onBlur={() => {
            setEditableFunc(false);
            handleFieldChange(field, editableValue);
          }}
        />
      ) : (
        user[field]
      )}
    </Paragraph>
  );

  return (
    <Card style={styles.formCard}>
      <Descriptions title={<Title>User Information</Title>} column={2}>
        <Descriptions.Item label='Email'>
          <Paragraph>{user?.email}</Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label='Username'>
          <Paragraph>{user?.username}</Paragraph>
        </Descriptions.Item>
        <Descriptions.Item label='Age'>
          {getEditableParagraph('Age', 'age', setEditableAge, editableAge)}
        </Descriptions.Item>
        <Descriptions.Item label='Full Name'>
          {getEditableParagraph(
            'Full Name',
            'fullName',
            setEditableFullName,
            editableFullName
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Address'>
          {getEditableParagraph(
            'Address',
            'address',
            setEditableAddress,
            editableAddress
          )}
        </Descriptions.Item>
        <Descriptions.Item label='Phone Number'>
          {getEditableParagraph(
            'Phone Number',
            'phone',
            setEditablePhone,
            editablePhone
          )}
        </Descriptions.Item>
      </Descriptions>
      {(editableAge !== null ||
        editableAddress !== null ||
        editablePhone !== null ||
        editableFullName !== null) && (
        <Row style={styles.buttons}>
          <Col>
            <Button
              htmlType='submit'
              typeof='primary'
              style={styles.button}
              onClick={onSubmit}
            >
              Save All Changes
            </Button>
          </Col>
          <Col>
            <Button
              htmlType='submit'
              typeof='primary'
              style={styles.button}
              onClick={() => {
                setEditableAge(null);
                setEditableAddress(null);
                setEditablePhone(null);
                setEditableFullName(null);
              }}
            >
              Discard All Changes
            </Button>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default Profile;
