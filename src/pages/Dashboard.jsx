import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/DashboardStyle.css';
import API_URLS from '../configs/config';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';

const Dashboard = () => {
    const [data, setData] = useState({
        approved: null,
        waiting: null,
        rejected: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [date, setDate] = useState('2024-07-01'); // Default date

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const approvedResponse = await axios.get(API_URLS.TOTAL_GUEST(date, 'APPROVE'));
                const waitingResponse = await axios.get(API_URLS.TOTAL_GUEST(date, 'WAITING FOR APPROVAL'));
                const rejectedResponse = await axios.get(API_URLS.TOTAL_GUEST(date, 'REJECT'));

                setData({
                    approved: approvedResponse.data.total || 0,
                    waiting: waitingResponse.data.total || 0,
                    rejected: rejectedResponse.data.total || 0
                });
                setLoading(false);
            } catch (err) {
                console.error('API Error:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [date]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="dashboardPage">
            <h1>Dashboard</h1>
            <input 
                type="date" 
                value={date} 
                onChange={handleDateChange} 
                className="datePicker" 
            />
            <div className="cardContainer">
                <div className="card approved">
                    <FaCheckCircle className="cardIcon" />
                    <h2>Approved</h2>
                    <p>{data.approved}</p>
                </div>
                <div className="card waiting">
                    <FaHourglassHalf className="cardIcon" />
                    <h2>Waiting for Approval</h2>
                    <p>{data.waiting}</p>
                </div>
                <div className="card rejected">
                    <FaTimesCircle className="cardIcon" />
                    <h2>Rejected</h2>
                    <p>{data.rejected}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
