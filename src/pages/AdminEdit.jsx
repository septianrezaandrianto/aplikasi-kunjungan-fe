import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import '../assets/AdminStyle.css';

const AdminEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Extract `admin` from location.state
    const { admin } = location.state || {};
    
    // Check if `admin` is available
    if (!admin) {
        console.log('admin', admin)
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                notification.error({ message: 'Silakan login kembali.' });
                navigate('/login');
                return;
            }

            const response = await fetch(`http://localhost:8091/admin/update/${admin.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 401) {
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error('Terjadi kesalahan pada server, cobalah beberapa saat lagi');
            }

            notification.success({
                message: 'Sukses!',
                description: 'Data admin berhasil diperbarui.',
                placement: 'topRight',
            });

            navigate('/admin');
        } catch (error) {
            notification.error({ message: 'Error', description: error.message });
        }
    };

    return (
        <div className="admin-edit-page">
            <h1>Edit Admin</h1>
            <form onSubmit={handleSubmit} className="admin-edit-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Nama Lengkap:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">No HP:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Alamat:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </div>
                <button type="submit">Simpan Perubahan</button>
            </form>
        </div>
    );
};

export default AdminEdit;
