import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider, theme } from 'antd';

import Home from './components/Home';
import AuthForm from './components/AuthForm';
import AppBar from './components/AppBar';
import { CopyrightOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const textColorToken = {
    color: darkMode ? 'white' : 'black',
    fontFamily: 'BlinkMacSystemFont',
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.lightAlgorithm,
        token: {
          // Seed Token
          colorPrimary: '#BBAB8C',
          borderRadius: 8,
          ...textColorToken,
        },
      }}
    >
      <BrowserRouter>
        <Layout>
          <AppBar />
          <Routes>
            <Route path='/' element={<Home toggleTheme={toggleTheme} />} />
            <Route path='/authform' element={<AuthForm />} />
          </Routes>
          <Footer
            style={{
              textAlign: 'center',
              color: 'black',
              background:
                'linear-gradient(0.25turn, #BBAB8C, #FAEED1, #DED0B6)',
                fontFamily: 'Roboto'
            }}
          >
            <CopyrightOutlined /> 
            <br/>
            2023 | Coral Avital
          </Footer>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
