import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Card,
  Layout,
  Typography,
  message,
  Steps,
} from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../actions/authentication';
import styles from './styles';

import { StepOne, StepTwo } from './RegistrationSteps';

const { Title } = Typography;
const { Step } = Steps;

function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formStepOne] = Form.useForm();
  const [formStepTwo] = Form.useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setCurrentStep(0);
  };

  const submitLogin = (values) => {
    dispatch(login(values, navigate, message.error));
  };

  const submitStepOne = (values) => {
    nextStep();
  };

  const submitStepTwo = (values) => {
    
    const formValues = { ...formStepOne.getFieldValue(), ...values };
    console.log(formValues);
    dispatch(
      signup(
        formValues,
        navigate,
        message.error
      )
    );
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Layout style={styles.container}>
      <Card style={styles.card}>
        <Title level={6} style={{color: 'grey'}}>{isLogin ? 'Login' : 'Signup'}</Title>
        {isLogin ? (
          <Form
            name='authform'
            form={formStepOne}
            size='large'
            wrapperCol={{ span: 20, offset: 2 }}
            onFinish={submitLogin}
          >
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
            <Form.Item>
              <Button htmlType='submit' typeof='primary'>
                Login
              </Button>
              <Button type='link' onClick={toggleMode}>
                Register now
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <>
            <Steps current={currentStep}>
              <Step title='Step 1' />
              <Step title='Step 2' />
            </Steps>
            {currentStep === 0
            
              ? <StepOne formStepOne={formStepOne} submitStepOne={submitStepOne} toggleMode={toggleMode} />
              : <StepTwo formStepTwo={formStepTwo} prevStep={prevStep} submitStepTwo={submitStepTwo} />}
             
          </>
        )}
      </Card>
    </Layout>
  );
}

export default AuthForm;
