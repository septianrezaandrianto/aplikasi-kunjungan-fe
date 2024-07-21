import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WebcamCapture } from './Webcam';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Col, Row, Dropdown, theme, Space, Typography, DatePicker, Button, Menu, message } from 'antd';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const onOk = (value) => {
  console.log('onOk: ', value);
};

const Home = () => {

  const [runningNumber, setRunningNumber] = useState('');
  const [admins, setAdmins] = useState([]);
  const [selectedName, setSelectedName] = useState('Pilih nama yang dituju');

  // Fetch running number from the service
  useEffect(() => {
    const fetchRunningNumber = async () => {
      try {
        const response = await axios.get('http://localhost:8091/queueNumber/getRunningNumber');
        console.log('Running Number:', response.data.data);
        setRunningNumber(response.data.data); // Adjust based on your response structure
      } catch (error) {
        message.error('Failed to fetch running number');
      }
    };
    fetchRunningNumber();
  }, []);

  // Fetch admin list from the service
  useEffect(() => {
    const fetchAdminList = async () => {
      try {
        const response = await axios.get('http://localhost:8091/admin/getAdminList');
        console.log('Admin List:', response.data.data);
        setAdmins(response.data.data); // Adjust based on your response structure
      } catch (error) {
        message.error('Failed to fetch admin list');
      }
    };
    fetchAdminList();
  }, []);

  const handleMenuClick = (e) => {
    const selectedAdmin = admins.find(admin => admin.id === e.key);
    console.log('Selected Admin:', selectedAdmin);
    if (selectedAdmin) {
      setSelectedName(selectedAdmin.fullName); // Update with the name of the selected admin
    }
    console.log('Selected Key:', e.key);
  };

  const menuItems = admins.map(admin => ({
    label: admin.fullName, // Adjust based on your response structure
    key: admin.id, // Use id as the key
  }));

  const menu = (
    <Menu style={{overflowY : 'auto', maxHeight:'100px'}}
      items={menuItems}
      selectable
      onClick={handleMenuClick}
      className="scrollable-menu"
    />
  );

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Guest Apps</h1>
      <Form
        name="basic"
        // layout="vertical"
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <WebcamCapture />
            <Form.Item
                layout='vertical'
                style={{margin:'30px 0px', color: 'black'}}
                label="Nomor Antrian"
                name="runningNumber">
              <div style={{fontSize:'48px', fontFamily:'cursive'}}>{runningNumber}</div>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              label="No ID Visitor"
              name="visitorId"
              rules={[{ required: true, message: 'Masukan no id visitor' }]}
            >
              <Input placeholder="Masukan no id visitor" onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="No Identitas"
              name="identitasId"
              rules={[{ required: true, message: 'Masukan no identitas' }]}
            >
              <Input placeholder="Masukan no identitas" onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="No Handphone"
              name="phoneNo"
              rules={[{ required: true, message: 'Masukan no whatsapp' }]}
            >
              <Input placeholder="Masukan no handphone" onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Nama Lengkap"
              name="fullName"
              rules={[{ required: true, message: 'Masukan nama lengkap' }]}
            >
              <Input placeholder="Masukan nama lengkap" onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Nama Perusahaan"
              name="officeName"
              rules={[{ required: true, message: 'Masukan nama perusahaan' }]}
            >
              <Input placeholder="Masukan nama perusahaan" onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Masukan email' }]}
            >
              <Input placeholder="Masukan email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Nama Yang Dituju"
              name="destinationName"
              rules={[{ required: true, message: 'Masukan nama yang dituju!' }]}
            >
              <Dropdown overlay={menu}>
                <Button>
                  {selectedName} <DownOutlined />
                </Button>
              </Dropdown>
            </Form.Item>
            <Form.Item
              layout='vertical'
              label="Rencana Kunjungan"
              name="visitDate"
              rules={[{ required: true, message: 'Masukan rencana kunjungan' }]}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                  }}
                  onOk={onOk}
                />
              </Space>
            </Form.Item>
            <Form.Item label="Tujuan" name="note" style={{margin: '50px 0px'}}>
              <TextArea rows={3} placeholder="Masukan tujuan dari kunjungan anda" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          <Col span={24} sm={12}>
            <Button type="primary" htmlType="submit" block>
              Kirim
            </Button>
          </Col>
          <Col span={24} sm={12}>
            <Button block onClick={() => console.log('Cancelled')}>
              Batal
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Home;
