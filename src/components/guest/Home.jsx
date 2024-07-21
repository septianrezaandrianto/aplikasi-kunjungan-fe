import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WebcamCapture } from './Webcam';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Col, Row, Dropdown, Space, DatePicker, Button, Menu, message } from 'antd';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Home = () => {
  const [form] = Form.useForm(); // Initialize form instance
  const [runningNumber, setRunningNumber] = useState('');
  const [admins, setAdmins] = useState([]);
  const [selectedName, setSelectedName] = useState('Pilih nama yang dituju');
  const [formData, setFormData] = useState({
    visitorIdNumber: '',
    identitasNumber: '',
    phoneNumber: '',
    fullName: '',
    officeName: '',
    email: '',
    visitDateStart: '',
    visitDateEnd: '',
    note: '',
    adminId: '',
    runningNumber: '',
    image: ''
  });
  const [resetWebcam, setResetWebcam] = useState(false);

  // Fetch running number from the service
  useEffect(() => {
    const fetchRunningNumber = async () => {
      try {
        const response = await axios.get('http://localhost:8091/queueNumber/getRunningNumber');
        setRunningNumber(response.data.data); // Adjust based on your response structure
        setFormData(prevData => ({ ...prevData, runningNumber: response.data.data }));
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
        setAdmins(response.data.data); // Adjust based on your response structure
      } catch (error) {
        message.error('Failed to fetch admin list');
      }
    };
    fetchAdminList();
  }, []);

  const handleMenuClick = (e) => {
    const selectedAdmin = admins.find(admin => admin.id === e.key);
    if (selectedAdmin) {
      setSelectedName(selectedAdmin.fullName);
      setFormData(prevData => ({ ...prevData, adminId: selectedAdmin.id }));
      form.setFieldsValue({ destinationName: selectedAdmin.id }); // Set the selected value to form
    }
  };

  const menuItems = admins.map(admin => ({
    label: admin.fullName, // Adjust based on your response structure
    key: admin.id, // Use id as the key
  }));

  const menu = (
    <Menu
      style={{ overflowY: 'auto', maxHeight: '100px' }}
      items={menuItems}
      selectable
      onClick={handleMenuClick}
      className="scrollable-menu"
    />
  );

  const handleCapture = (imageSrc) => {
    setFormData(prevData => ({ ...prevData, image: imageSrc }));
  };

  const handleSubmit = async (values) => {
    try {
      console.log('visitDateStart:', values.visitDate);
      const payload = {
        ...formData,
        visitorIdNumber: values.visitorId,
        identitasNumber: values.identitasId,
        phoneNumber: values.phoneNo,
        fullName: values.fullName,
        officeName: values.officeName,
        email: values.email,
        visitDateStart: values.visitDate[0].format('YYYY-MM-DD HH:mm'),
        visitDateEnd: values.visitDate[1].format('YYYY-MM-DD HH:mm'),
        note: values.note
      };
      console.log('payload:', payload);
      const response = await axios.post('http://localhost:8091/guest/createGuest', payload);
      message.success('Daftar kunjungan berhasil dibuat');
      console.log('Response:', response.data);
      form.resetFields();
      setSelectedName('Pilih nama yang dituju'); // Reset the selected name
      setFormData({
        visitorIdNumber: '',
        identitasNumber: '',
        phoneNumber: '',
        fullName: '',
        officeName: '',
        email: '',
        visitDateStart: '',
        visitDateEnd: '',
        note: '',
        adminId: '',
        runningNumber: '',
        image: ''
      });
      setResetWebcam(true); // Trigger webcam reset
    } catch (error) {
      message.error('Failed to create guest');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (resetWebcam) {
      setResetWebcam(false);
    }
  }, [resetWebcam]);

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Guest Apps</h1>
      <Form
        form={form}
        name="basic"
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
        autoComplete="off"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <WebcamCapture onCapture={handleCapture} reset={resetWebcam} />
            <Form.Item
              layout='vertical'
              style={{ margin: '30px 0px', color: 'black' }}
              label="Nomor Antrian"
              name="runningNumber"
            >
              <div style={{ fontSize: '40px', fontFamily: 'cursive' }}>{runningNumber}</div>
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              label="No ID Visitor"
              name="visitorId"
              rules={[{ required: true, message: 'Masukan no id visitor' }]}
            >
              <Input
                placeholder="Masukan no id visitor"
                onChange={(e) => setFormData(prevData => ({ ...prevData, visitorId: e.target.value }))}
              />
            </Form.Item>
            <Form.Item
              label="No Identitas"
              name="identitasId"
              rules={[{ required: true, message: 'Masukan no identitas' }]}
            >
              <Input
                placeholder="Masukan no identitas"
                onChange={(e) => setFormData(prevData => ({ ...prevData, identitasId: e.target.value }))}
              />
            </Form.Item>
            <Form.Item
              label="No Handphone"
              name="phoneNo"
              rules={[{ required: true, message: 'Masukan no whatsapp' }]}
            >
              <Input
                placeholder="Masukan no handphone"
                onChange={(e) => setFormData(prevData => ({ ...prevData, phoneNo: e.target.value }))}
              />
            </Form.Item>
            <Form.Item
              label="Nama Lengkap"
              name="fullName"
              rules={[{ required: true, message: 'Masukan nama lengkap' }]}
            >
              <Input
                placeholder="Masukan nama lengkap"
                onChange={(e) => setFormData(prevData => ({ ...prevData, fullName: e.target.value }))}
              />
            </Form.Item>
            <Form.Item
              label="Kantor"
              name="officeName"
              rules={[{ required: true, message: 'Masukan nama kantor' }]}
            >
              <Input
                placeholder="Masukan nama kantor"
                onChange={(e) => setFormData(prevData => ({ ...prevData, officeName: e.target.value }))}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Masukan email' }, { type: 'email', message: 'Email tidak valid' }]}
            >
              <Input
                placeholder="Masukan email"
                onChange={(e) => setFormData(prevData => ({ ...prevData, email: e.target.value }))}
              />
            </Form.Item>
            <Form.Item
              label="Nama Yang Dituju"
              name="destinationName"
              rules={[{ required: true, message: 'Pilih nama yang dituju' }]}
            >
              <Dropdown overlay={menu} trigger={['click']}>
                <Button>
                  <Space>
                    {selectedName}
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Form.Item>
            <Form.Item
              layout='vertical'
              label="Tanggal Kunjungan"
              name="visitDate"
              rules={[{ required: true, message: 'Masukan tanggal kunjungan' }]}
            >
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={(dates) => {
                  if (dates) {
                    setFormData(prevData => ({
                      ...prevData,
                      visitDateStart: dates[0].format('YYYY-MM-DD HH:mm'),
                      visitDateEnd: dates[1].format('YYYY-MM-DD HH:mm')
                    }));
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              style={{margin: '50px 0px'}}
              label="Catatan"
              name="note"
            >
              <TextArea rows={3}
                placeholder="Masukan catatan"
                onChange={(e) => setFormData(prevData => ({ ...prevData, note: e.target.value }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '-30px', justifyContent: 'center' }}>
          <Col span={24} style={{ textAlign: 'center' }} >
            <Button type="primary" htmlType="submit" style={{ width: '45%' }}>
              Kirim
            </Button>
            <Button style={{ marginLeft: '8px', width: '45%' }} onClick={() => {
              form.resetFields();
              setSelectedName('Pilih nama yang dituju'); // Reset the selected name
              setFormData({
                visitorIdNumber: '',
                identitasNumber: '',
                phoneNumber: '',
                fullName: '',
                officeName: '',
                email: '',
                visitDateStart: '',
                visitDateEnd: '',
                note: '',
                adminId: '',
                runningNumber: '',
                image: ''
              });
              setResetWebcam(true); // Trigger webcam reset
            }}>
              Batal
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Home;
