import React, { useState } from 'react';
import { Button, Typography, Form, DatePicker, Select } from 'antd';
import 'antd/dist/reset.css'; // Make sure to import Ant Design styles
import dayjs from 'dayjs';
import API_URLS from '../configs/config.js';

const { Title } = Typography;
const { Option } = Select;

const Report = () => {
    const [date, setDate] = useState(null);
    const [status, setStatus] = useState('ALL'); // Default status
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        if (!date) {
            alert('Please select a date.');
            return;
        }

        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const token = localStorage.getItem('authToken'); // Get token from localStorage

        if (!token) {
            alert('No token found. Please login again.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(API_URLS.DOWNLOAD_REPORT(formattedDate, status), {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const filename = `Report-${formattedDate}.xlsx`; // Specify the filename
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('There was an error!', error);
        } finally {
            setLoading(false);
            setDate(null); // Reset date picker
            setStatus('ALL'); // Reset status to default
        }
    };

    return (
        <div className="reportPage" style={styles.container}>
            <div style={styles.formContainer}>
                <Title level={2} style={{ textAlign: 'center' }}>Laporan</Title>
                <Form layout="vertical">
                    <Form.Item label="Pilih Tanggal" required>
                        <DatePicker
                            format="YYYY-MM-DD"
                            onChange={(date) => setDate(date)}
                            value={date ? dayjs(date) : null} // Controlled DatePicker
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                    <Form.Item label="Pilih Status" required>
                        <Select
                            value={status}
                            style={{ width: '100%' }}
                            onChange={(value) => setStatus(value)}
                        >
                            <Option value="ALL">ALL</Option>
                            <Option value="APPROVE">APPROVE</Option>
                            <Option value="REJECT">REJECT</Option>
                            <Option value="WAITING FOR APPROVAL">WAITING FOR APPROVAL</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type="primary" 
                            size="large" 
                            onClick={handleDownload}
                            loading={loading}
                            style={{ width: '100%' }}
                        >
                            Download
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

// Inline CSS styles for centering the form
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh', // Full viewport height
        backgroundColor: '#f0f2f5', // Light background color
    },
    formContainer: {
        maxWidth: '400px',
        width: '100%',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: '#fff', // White background for the form
    }
};

export default Report;
