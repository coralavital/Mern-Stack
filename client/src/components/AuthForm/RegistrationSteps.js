import React from 'react';
import { Form, Input, Button } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  NumberOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
} from '@ant-design/icons';

export const StepOne = ({ formStepOne, submitStepOne, toggleMode }) => {
  return (
    <Form
      name='authform'
      form={formStepOne}
      style={{ marginTop: '2rem' }}
      size='large'
      wrapperCol={{ span: 20, offset: 2 }}
      onFinish={submitStepOne}
    >
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Please enter your username',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder='Username' />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[
          {
            required: true,
            message: 'Please enter valid email address',
          },
        ]}
      >
        <Input
          type='email'
          prefix={<MailOutlined />}
          placeholder='Email address'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please enter your password',
          },
        ]}
      >
        <Input.Password
          type='password'
          prefix={<LockOutlined />}
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item
        name='confirmPassword'
        rules={[
          {
            required: true,
            message: 'Please repeat your password',
          },
        ]}
      >
        <Input.Password
          type='password'
          prefix={<LockOutlined />}
          placeholder='Confirm Password'
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType='submit'>Next</Button>
        <Button type='link' onClick={toggleMode}>
               have an account?
              </Button>
      </Form.Item>
    </Form>
  );
};

export const StepTwo = ({ formStepTwo, prevStep, submitStepTwo }) => {
  return (
    <Form
      name='authform'
      style={{ marginTop: '2rem' }}
      size='large'
      wrapperCol={{ span: 20, offset: 2 }}
      form={formStepTwo}
      onFinish={submitStepTwo}
    >
      <Form.Item
        name='fullName'
        rules={[
          {
            required: true,
            message: 'Please enter your Full name',
          },
        ]}
      >
        <Input prefix={<EditOutlined />} placeholder='Full name' />
      </Form.Item>
      <Form.Item
        name='age'
        rules={[
          {
            required: false,
            message: 'Please enter your age',
          },
        ]}
      >
        <Input prefix={<NumberOutlined />} placeholder='Age' />
      </Form.Item>
      <Form.Item
        name='address'
        rules={[
          {
            required: false,
            message: 'Please enter your address',
          },
        ]}
      >
        <Input prefix={<HomeOutlined />} placeholder='Address' />
      </Form.Item>
      <Form.Item
        name='phone'
        rules={[
          {
            required: false,
            message: 'Please enter your phone number',
          },
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder='Phone number' />
      </Form.Item>
      <Form.Item>
        <Button onClick={prevStep}>Back</Button>
        <Button htmlType='submit'>Signup</Button>
      </Form.Item>
    </Form>
  );
};
