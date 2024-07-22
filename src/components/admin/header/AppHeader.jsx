import React from 'react';
import { Badge, Image, Space, Typography } from "antd";
import { BellFilled, MailOutlined, MenuOutlined, PoweroffOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
                <Image width={40} src="https://www.iconfinder.com/icons/7123025/logo_google_g_icon" />
                <Typography.Title level={3} style={{ margin: 0 }}>
                    Admin Dashboard
                </Typography.Title>
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
