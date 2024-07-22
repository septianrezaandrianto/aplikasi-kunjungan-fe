import React from 'react';
import { Badge, Image, Space, Typography } from "antd";
import { BellFilled, MailOutlined, MenuOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/img/logo.jpeg';

const AppHeader = ({ onToggleSidebar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Hapus token dari localStorage
        navigate('/login'); // Arahkan ke halaman login
    };

    return (
        <div className="AppHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', background: '#fff', borderBottom: '1px solid #e8e8e8' }}>
            <Space>
                <MenuOutlined
                    style={{ fontSize: '24px', cursor: 'pointer' }}
                    onClick={onToggleSidebar} // Pass function to toggle sidebar
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image width={240} src={logo} />
                    <Typography.Title level={3} style={{ margin: 0, marginLeft: '10px' }}>
                        Admin Page
                    </Typography.Title>
                </div>
            </Space>
            <Space>
                <PoweroffOutlined
                    style={{ fontSize: '24px', cursor: 'pointer', color: '#ff4d4f' }}
                    onClick={handleLogout}
                />
            </Space>
        </div>
    );
};

export default AppHeader;
