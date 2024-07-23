import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select, Modal } from 'antd';
import { UserOutlined, LockOutlined, HomeOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URLS from '../configs/config.js'; 
import logo from '../assets/img/logo.jpeg';
import '../assets/AppAdminStyle.css'; 
import '../assets/RegisterStyle.css';

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(API_URLS.REGISTER, values);

      if (response.status === 200) {
        message.success('Registration successful');
        navigate('/login'); // Redirect to login page
      } else {
        const errorList = response.data.errorList;
        if (errorList && errorList.length > 0) {
          errorList.forEach((error) => {
            message.error(error.message);
          });
        } else {
          message.error('Registration failed: Unknown error');
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
          message.error('Registration failed: ' + (error.response.data.message || 'Unknown error'));
        }
      } else if (error.request) {
        message.error('Registration failed: Connection error');
      } else {
        message.error('Registration failed: ' + error.message);
      }
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    form.submit(); // Submit the form after confirmation
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="register-container">
      <Card className="register-card" bordered={false}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <Form
          name="register"
          form={form}
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
            name="fullName"
            rules={[{ required: true, message: 'Please input your Full Name!' }]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="Full Name" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please input your Address!' }]}
          >
            <Input prefix={<HomeOutlined />} placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            name="role"
            rules={[{ required: true, message: 'Please select your Role!' }]}
          >
            <Select placeholder="Select a role" prefix={<UserOutlined />}>
              <Option value="ADMIN">ADMIN</Option>
              <Option value="RECEPTIONIST">RECEPTIONIST</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="button" onClick={showModal} className="register-form-button">
                Daftar
              </Button>
              <Button type="default" className="back-button" style={{ marginLeft: '10px' }} onClick={() => navigate('/login')}>
                Kembali
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="Konfirmasi"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Ya"
        cancelText="Tidak"
      >
        <p>Pastikan semua data yang anda input sudah benar semua. Apakah Anda ingin lanjut?</p>
      </Modal>
    </div>
  );
};

export default Register;
