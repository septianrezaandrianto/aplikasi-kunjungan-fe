import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../assets/GuestStyle.css'; // Assuming you want to use the same CSS
import API_URLS from '../configs/config.js';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${
        (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const Admin = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    const fetchAdmins = async (query = '', page = 0, size = 10) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Silakan login kembali.');
                return;
            }

            const url = API_URLS.GET_ADMIN_LIST(page, size, query);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error('Terjadi kesalahan pada server, cobalah beberapa saat lagi');
            }

            const data = await response.json();
            setAdmins(data.data);
            setTotalPages(data.totalPage);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins(searchQuery, pageNumber, pageSize);
    }, [searchQuery, pageNumber, pageSize]);

    const handleEdit = (id) => {
        console.log(`Edit admin with ID: ${id}`);
        // Implement edit functionality
    };

    const handleDelete = (id) => {
        console.log(`Delete admin with ID: ${id}`);
        // Implement delete functionality
    };

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="dashboardPage">
            <h1>Daftar Admin</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Cari berdasarkan nama lengkap..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="page-size-container">
                <label htmlFor="page-size">Data perhalaman:</label>
                <select
                    id="page-size"
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Username</th>
                            <th>Nama Lengkap</th>
                            <th>No HP</th>
                            <th>Alamat</th>
                            <th>Role</th>
                            <th>Dibuat Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.length > 0 ? (
                            admins.map((admin, index) => (
                                <tr key={admin.id}>
                                    <td>{index + 1 + pageNumber * pageSize}</td>
                                    <td>{admin.username}</td>
                                    <td>{admin.fullName}</td>
                                    <td>{admin.phoneNumber}</td>
                                    <td>{admin.address}</td>
                                    <td>{admin.role}</td>
                                    <td>{formatDate(admin.createdDate)}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button onClick={() => handleEdit(admin.id)} className="edit-button">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => handleDelete(admin.id)} className="delete-button">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">No admins available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button
                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 0))}
                    disabled={pageNumber === 0}
                >
                    Previous
                </button>
                <span>Page {pageNumber + 1} of {totalPages}</span>
                <button
                    onClick={() => setPageNumber(prev => prev + 1)}
                    disabled={pageNumber >= totalPages - 1 || admins.length === 0}
                >
                    Next
                </button>
            </div>
            {error && (
                <div className="error-popup">
                    <div className="error-message">
                        <p>Error: {error}</p>
                        <button onClick={() => setError(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
