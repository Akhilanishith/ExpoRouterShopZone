import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../../utils/api';
import DrawerMenu from '../Drawer/DrawerMenu';

const VerifiedSellersPage = () => {
    const [verifiedSellers, setVerifiedSellers] = useState([]);

    // Fetch verified sellers from the backend
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await axios.get(Api.getPendingSellers);
                setVerifiedSellers(response.data.verifiedSellers); // Assuming your API returns verified sellers
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };

        fetchSellers();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'flex' }}>
                <DrawerMenu />
                <div style={{ flexGrow: 1, padding: '20px' }}>
                    <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Verified Sellers</h1>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6' }}>
                                <th style={tableHeaderStyle}>BusinessName</th>
                                <th style={tableHeaderStyle}>Email</th>
                                <th style={tableHeaderStyle}>Type</th>
                                <th style={tableHeaderStyle}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {verifiedSellers.map((seller) => (
                                <tr key={seller.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={tableCellStyle}>{seller.name}</td>
                                    <td style={tableCellStyle}>{seller.email}</td>
                                    <td style={tableCellStyle}>{seller.type}</td>
                                    <td style={tableCellStyle}>
                                        <span style={getStatusStyle(seller.status)}>{seller.status}</span>
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

const getStatusStyle = (status) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: status === 'verified' ? 'green' : status === 'rejected' ? 'red' : 'orange',
    backgroundColor: status === 'verified' ? '#e6ffe6' : status === 'rejected' ? '#ffe6e6' : '#fff0e6',
});

export default VerifiedSellersPage;
