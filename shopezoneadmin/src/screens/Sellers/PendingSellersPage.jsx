import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import Api from '../../utils/api';
import DrawerMenu from '../Drawer/DrawerMenu';

const PendingSellersPage = () => {
    const [pendingSellers, setPendingSellers] = useState([]);

    // Fetch pending sellers from the backend
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await axios.get(Api.getPendingSellers);
                setPendingSellers(response.data.pendingSellers); // Assuming your API returns pending sellers
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };

        fetchSellers();
    }, []);

    const handleVerification = async (id, newStatus, sellerType, uid, email) => {
        try {
            const response = await axios.put(Api.updateSellerStatus, {
                sellerId: id,
                newStatus,
                sellerType,
                uid,
                email, // Pass the email as part of the request payload
            });

            // Update the seller status locally in the UI
            setPendingSellers(pendingSellers.filter((seller) => seller.id !== id));

            alert(response.data.message); // Notify user of success
        } catch (error) {
            console.error('Error updating seller status:', error.response?.data || error.message);
            alert(`Error updating seller status: ${error.response?.data.message || error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex' }}>
                <DrawerMenu />
                <div style={{ flexGrow: 1, padding: '20px' }}>
                    <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Pending Sellers</h1>

                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6' }}>
                                <th style={tableHeaderStyle}>BusinessName</th>
                                <th style={tableHeaderStyle}>Email</th>
                                <th style={tableHeaderStyle}>Type</th>
                                <th style={tableHeaderStyle}>Status</th>
                                <th style={tableHeaderStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingSellers.map((seller) => (
                                <tr key={seller.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={tableCellStyle}>{seller.name}</td>
                                    <td style={tableCellStyle}>{seller.email}</td>
                                    <td style={tableCellStyle}>{seller.type}</td>
                                    <td style={tableCellStyle}>
                                        <span style={getStatusStyle(seller.status)}>{seller.status}</span>
                                    </td>
                                    <td style={tableCellStyle}>
                                        {seller.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleVerification(seller.id, 'verified', seller.type, seller.uid, seller.email)}
                                                    style={buttonStyle}
                                                    title="Approve"
                                                >
                                                    <CheckCircle color="green" size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleVerification(seller.id, 'rejected', seller.type, seller.uid, seller.email)}
                                                    style={buttonStyle}
                                                    title="Reject"
                                                >
                                                    <XCircle color="red" size={20} />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Styles
const tableHeaderStyle = {
    textAlign: 'left',
    padding: '12px',
    fontWeight: 'bold',
};

const tableCellStyle = {
    padding: '12px',
};

const buttonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginRight: '8px',
};

const getStatusStyle = (status) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: status === 'verified' ? 'green' : status === 'rejected' ? 'red' : 'orange',
    backgroundColor: status === 'verified' ? '#e6ffe6' : status === 'rejected' ? '#ffe6e6' : '#fff0e6',
});

export default PendingSellersPage;
