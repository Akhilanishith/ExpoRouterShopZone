import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DrawerMenu from '../Drawer/DrawerMenu';
import Api from '../../utils/api';
import UserVerifiedPage from '../Users/UserVerifiedPage'; // Import UserVerifiedPage

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(Api.getAllUsers);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <DrawerMenu />
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Logged-in Users</h1>
          
          {/* Table for Logged-in Users */}
          <div style={{ overflowX: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Arial, sans-serif' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Email</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{ borderBottom: '2px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>{user.email}</td>
                    <td style={{ padding: '12px' }}>
                      {user.phone?.country_code} {user.phone?.number}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section for Verified and Blocked Users */}
          <div style={{ marginTop: '40px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Verified and Blocked Users</h1>
            <UserVerifiedPage /> {/* Render UserVerifiedPage here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
