import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.jpeg'; // Import the logo image
import '../assets/AppAdminStyle.css'; // Import CSS file
import API_URLS from '../configs/config.js';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(API_URLS.LOGIN, values); // Use the URL from config

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.data.accessToken); // Save token to localStorage
        message.success('Login successful');
        navigate('/admin'); // Redirect to /admin
      } else {
        const errorList = response.data.errorList;
        if (errorList && errorList.length > 0) {
          errorList.forEach((error) => {
            message.error(error.message);
          });
        } else {
          message.error('Login failed: Unknown error');
        }
      }
    } catch (error) {
      if (error.response) {
        const errorList = error.response.data.errorList;
        if (errorList && errorList.length > 0) {
          errorList.forEach((error) => {
            message.error(error.message);
          });
        } else {
          message.error('Login failed: ' + (error.response.data.message || 'Unknown error'));
        }
      } else if (error.request) {
        message.error('Login failed: Connection error');
      } else {
        message.error('Login failed: ' + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Logo" style={{ maxWidth: '150px' }} />
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <a href="/register">Daftar Sekarang!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
