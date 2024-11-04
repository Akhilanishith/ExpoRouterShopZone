import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import Api from '../../utils/api';
import DrawerMenu from '../Drawer/DrawerMenu';
import './AllSellersPage.css'; // Import external CSS file

const AllSellersPage = () => {
    const [pendingSellers, setPendingSellers] = useState([]);
    const [verifiedSellers, setVerifiedSellers] = useState([]);

    // Fetch sellers from the backend
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await axios.get(Api.getPendingSellers);
                const { pendingSellers, verifiedSellers } = response.data; // Assuming your API returns both pending and verified sellers
                setPendingSellers(pendingSellers); // Set pending sellers
                setVerifiedSellers(verifiedSellers); // Set verified sellers
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
            if (newStatus === 'verified') {
                setVerifiedSellers([...verifiedSellers, { ...response.data.seller, status: newStatus }]);
            }

            alert(response.data.message); // Notify user of success
        } catch (error) {
            console.error('Error updating seller status:', error.response?.data || error.message);
            alert(`Error updating seller status: ${error.response?.data.message || error.message}`);
        }
    };

    return (
        <div className="container">
            <DrawerMenu />
            <div className="content">
                <h1>Seller Verification</h1>

                {/* Pending Sellers Table */}
                <h2>Pending Sellers</h2>
                <table className="sellers-table">
                    <thead>
                        <tr>
                            <th>Business Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingSellers.map(seller => (
                            <tr key={seller.id}>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.type}</td>
                                <td>
                                    <span className={getStatusClass(seller.status)}>{seller.status}</span>
                                </td>
                                <td>
                                    {seller.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleVerification(seller.id, 'verified', seller.type, seller.uid, seller.email)}
                                                className="action-button approve"
                                                title="Approve"
                                            >
                                                <CheckCircle size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleVerification(seller.id, 'rejected', seller.type, seller.uid, seller.email)}
                                                className="action-button reject"
                                                title="Reject"
                                            >
                                                <XCircle size={20} />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Verified Sellers Table */}
                <h2>Verified Sellers</h2>
                <table className="sellers-table">
                    <thead>
                        <tr>
                            <th>Business Name</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {verifiedSellers.map(seller => (
                            <tr key={seller.id}>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.type}</td>
                                <td>
                                    <span className={getStatusClass(seller.status)}>{seller.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Get status class based on the status
const getStatusClass = (status) => `status-${status}`;

// Export component
export default AllSellersPage;
