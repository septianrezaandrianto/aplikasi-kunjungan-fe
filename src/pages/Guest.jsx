import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // Import for redirection
import '../assets/GuestStyle.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${
        (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const Guest = () => {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10); // State for page size
    const [totalPages, setTotalPages] = useState(0); // State for total number of pages
    const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
    const [actionType, setActionType] = useState(''); // Action type for the modal (approve/reject)
    const [selectedGuestId, setSelectedGuestId] = useState(null); // State for selected guest ID
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for success popup
    const [showSessionExpiredModal, setShowSessionExpiredModal] = useState(false); // State for session expired modal

    const navigate = useNavigate(); // Hook for navigation

    const fetchGuests = async (query = '', page = 0, size = 10) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Silakan login kembali.');
                return;
            }

            const response = await fetch(`http://localhost:8091/guest/getPage?pageNumber=${page}&pageSize=${size}&filter=${query}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                setShowSessionExpiredModal(true);
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 2000); // Delay to show modal before redirecting
                return;
            }

            if (!response.ok) {
                throw new Error('Terjadi kesalahan pada server, cobalah beberapa saat lagi');
            }

            const data = await response.json();
            setGuests(data.data);
            setTotalPages(data.totalPages); // Set total pages from response
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuests(searchQuery, pageNumber, pageSize);
    }, [searchQuery, pageNumber, pageSize]);

    const handleAction = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('Silakan login kembali.');
                return;
            }

            const actionUrl = `http://localhost:8091/guest/doAction/${selectedGuestId}/${actionType}`;
            const response = await fetch(actionUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                setShowSessionExpiredModal(true);
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 2000); // Delay to show modal before redirecting
                return;
            }

            if (!response.ok) {
                throw new Error(`Terjadi kesalahan saat ${actionType === 'APPROVE' ? 'menyetujui' : 'menolak'} tamu, cobalah beberapa saat lagi`);
            }

            setShowConfirmModal(false);
            setShowSuccessPopup(true);
            // Refetch guests after approval/rejection
            fetchGuests(searchQuery, pageNumber, pageSize);
        } catch (error) {
            setError(error.message);
            setShowConfirmModal(false);
        }
    };

    const openConfirmModal = (id, type) => {
        setSelectedGuestId(id);
        setActionType(type);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
    };

    const closeSessionExpiredModal = () => {
        setShowSessionExpiredModal(false);
    };

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    return (
        <div className="dashboardPage">
            <h1>Daftar Tamu</h1>
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
                            <th>No. ID Visitor </th>
                            <th>No. Antrian</th>
                            <th>Nama Tamu</th>
                            <th>Email</th>
                            <th>No HP</th>
                            <th>Waktu Kunjungan Dimulai</th>
                            <th>Waktu Kunjungan Berakhir</th>
                            <th>Status</th>
                            <th>Kantor</th> {/* New column */}
                            <th>No. Identitas</th> {/* New column */}
                            <th>Nama Yang Di Tuju</th> {/* New column */}
                            <th>Keperluan Kunjungan</th>
                            <th>Foto</th>
                            <th>Aksi</th> {/* New column for actions */}
                        </tr>
                    </thead>
                    <tbody>
                        {guests.length > 0 ? (
                            guests.map((guest, index) => (
                                <tr key={guest.id}>
                                    <td>{index + 1 + pageNumber * pageSize}</td>
                                    <td>{guest.visitorIdNumber}</td>
                                    <td>{guest.runningNumber}</td>
                                    <td>{guest.fullName}</td>
                                    <td>{guest.email}</td>
                                    <td>{guest.phoneNumber}</td>
                                    <td>{formatDate(guest.visitDateStart)}</td>
                                    <td>{formatDate(guest.visitDateEnd)}</td>
                                    <td>{guest.status}</td>
                                    <td>{guest.officeName}</td> {/* Display office name */}
                                    <td>{guest.identitasNumber}</td> {/* Display identitas number */}
                                    <td>{guest.admin.fullName}</td> {/* Display admin name */}
                                    <td>{guest.note}</td>
                                    <td>
                                        {guest.image ? (
                                            <img
                                                src={`data:image/jpeg;base64,${guest.image}`}
                                                alt={`${guest.fullName}'s avatar`}
                                            />
                                        ) : (
                                            <div>No Image</div>
                                        )}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            {guest.status === 'WAITING FOR APPROVAL' && (
                                                <>
                                                    <button onClick={() => openConfirmModal(guest.runningNumber, 'REJECT')}>
                                                        <FaTimes size={20} color="red" title="Reject" />
                                                    </button>
                                                    <button onClick={() => openConfirmModal(guest.runningNumber, 'APPROVE')}>
                                                        <FaCheck size={20} color="green" title="Approve" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13">No guests available</td>
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
                    disabled={pageNumber >= totalPages - 1 || guests.length === 0}
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
            {showConfirmModal && (
                <div className="confirm-popup">
                    <div className="confirm-message">
                        <p>Apakah Anda yakin ingin {actionType === 'APPROVE' ? 'mengesahkan' : 'menolak'} tamu ini?</p>
                        <button onClick={handleAction}>Ya</button>
                        <button onClick={closeConfirmModal}>Tidak</button>
                    </div>
                </div>
            )}
            {showSuccessPopup && (
                <div className="success-popup">
                    <div className="success-message">
                        <p>{actionType === 'APPROVE' ? 'Approve' : 'Reject'} berhasil!</p>
                        <button onClick={closeSuccessPopup}>Tutup</button>
                    </div>
                </div>
            )}
            {showSessionExpiredModal && (
                <div className="error-popup">
                    <div className="error-message">
                        <p>Waktu anda sudah habis, Silakan login kembali</p>
                        <button onClick={() => navigate('/login')}>Go to Login</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Guest;
