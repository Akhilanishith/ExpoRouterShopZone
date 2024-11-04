import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Api from '../../utils/api';

const UserVerifiedPage = () => {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    // Fetch verified users
    axios.get(Api.getVerifiedUsers)
      .then(response => {
        setVerifiedUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching verified users:', error);
      });

    // Fetch blocked users
    axios.get(Api.getBlockedUsers)
      .then(response => {
        setBlockedUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching blocked users:', error);
      });
  };

  // Function to block a user
  const blockUser = (userId) => {
    axios.patch(`${Api.updateUserStatus}/${userId}`, { status: 'not_approved' })
      .then(response => {
        console.log('User blocked:', response.data);
        fetchUsers(); // Refresh user lists after update
      })
      .catch(error => {
        console.error('Error blocking user:', error);
      });
  };

  // Function to unblock a user
  const unblockUser = (userId) => {
    axios.patch(`${Api.updateUserStatus}/${userId}`, { status: 'approved' })
      .then(response => {
        console.log('User unblocked:', response.data);
        fetchUsers(); // Refresh user lists after update
      })
      .catch(error => {
        console.error('Error unblocking user:', error);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Verified Users Section */}
      <h2 style={styles.headerText}>Verified Users:</h2>
      <div>
        {verifiedUsers.map(user => (
          <div key={user._id} style={styles.userContainer}>
            <p>{user.email}</p>
            <button style={styles.button} onClick={() => blockUser(user._id)}>Block</button>
          </div>
        ))}
      </div>

      {/* Blocked Users Section */}
      <h2 style={styles.headerText}>Blocked Users:</h2>
      <div>
        {blockedUsers.map(user => (
          <div key={user._id} style={styles.userContainer}>
            <p>{user.email}</p>
            <button style={styles.button} onClick={() => unblockUser(user._id)}>Unblock</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  headerText: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  userContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px'
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default UserVerifiedPage;
