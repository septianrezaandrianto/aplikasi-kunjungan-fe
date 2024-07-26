import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { notification, Form, Input, Button, Select, Spin, Typography, Divider } from 'antd';
import '../assets/AdminStyle.css'; // Ensure this file includes the necessary styles
import API_URLS from '../configs/config.js';

const { Option } = Select;
const { Title } = Typography;

const AdminEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Extract `admin` from location.state
    const { admin } = location.state || {};
    
    // Check if `admin` is available
    if (!admin) {
        notification.error({ message: 'Admin data not found.' });
        navigate('/admin');
        return null;
    }

    const [formData, setFormData] = useState({
        username: admin.username || '',
        phoneNumber: admin.phoneNumber || '',
        address: admin.address || '',
        role: admin.role || '',
        fullName: admin.fullName || ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (changedValues) => {
        setFormData(prevData => ({ ...prevData, ...changedValues }));
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                notification.error({ message: 'Silakan login kembali.' });
                navigate('/login');
                return;
            }

            const response = await fetch(API_URLS.UPDATE_ADMIN(admin.id), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(values)
            });

            if (response.status === 401) {
                navigate('/login');
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorList);
            }

            notification.success({
                message: 'Sukses!',
                description: 'Data admin berhasil diperbarui.',
                placement: 'topRight',
            });

            navigate('/admin/admin');
        } catch (error) {
            notification.error({ message: 'Error', description: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-edit-page">
            <div className="admin-edit-container">
                <Title level={2}>Edit Admin</Title>
                <Divider />
                
                <Spin spinning={loading} tip="Menyimpan...">
                    <Form
                        initialValues={formData}
                        onFinish={handleSubmit}
                        layout="vertical"
                        className="admin-edit-form"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Username is required' }]}
                        >
                            <Input disabled />
                        </Form.Item>
                        
                        <Form.Item
                            label="Nama Lengkap"
                            name="fullName"
                            rules={[{ required: true, message: 'Nama Lengkap is required' }]}
                        >
                            <Input />
                        </Form.Item>
                        
                        <Form.Item
                            label="No HP"
                            name="phoneNumber"
                            rules={[{ required: true, message: 'No HP is required' }]}
                        >
                            <Input />
                        </Form.Item>
                        
                        <Form.Item
                            label="Alamat"
                            name="address"
                            rules={[{ required: true, message: 'Alamat is required' }]}
                        >
                            <Input />
                        </Form.Item>
                        
                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: 'Role is required' }]}
                        >
                            <Select>
                                <Option value="ADMIN">ADMIN</Option>
                                <Option value="RECEPTIONIST">RECEPTIONIST</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={loading}
                                >
                                    Simpan
                                </Button>
                                <Button 
                                    type="default" 
                                    onClick={() => navigate('/admin/admin')}
                                >
                                    Kembali
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        </div>
    );
};

export default AdminEdit;