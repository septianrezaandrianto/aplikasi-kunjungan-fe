import React from 'react';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/AppAdminStyle.css';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:8091/admin/login', values);

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.data.accessToken); // Simpan token ke localStorage
        console.log('authToken', response.data)
        console.log('authToken', localStorage.getItem('authToken'))
        message.success('Login successful');
        navigate('/admin'); // Redirect ke /admin
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
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ maxWidth: '300px', margin: '0 auto' }}
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
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
              Log in
            </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
