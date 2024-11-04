import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DrawerMenu from '../Drawer/DrawerMenu';

// Mock data (replace with actual data in a real application)
const mockData = {
  totalUsers: 1000,
  totalSellers: 250,
  verifiedUsers: 750,
  verifiedSellers: 200
};

const chartData = [
  { name: 'Users', total: mockData.totalUsers, verified: mockData.verifiedUsers },
  { name: 'Sellers', total: mockData.totalSellers, verified: mockData.verifiedSellers },
];

const Card = ({ title, total, verified }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }}>
    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>{title}</h2>
    <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>{total}</p>
    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
      {verified} verified ({(verified / total * 100).toFixed(1)}%)
    </p>
  </div>
);

const Dashboard = () => {
    // const navigate = useNavigate()
  return (
    <div style={{ padding: '16px' }}>
     <div style={{ display: 'flex' }}>
        {/* Sidebar Drawer */}
        <DrawerMenu />
        
        {/* Main Content */}
        <div style={{ flexGrow: 1, padding: '20px' }}>
    {/* <button onClick={()=> navigate("/SellerVerificationPage")}>pending verification</button> */}
      <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <Card title="Users" total={mockData.totalUsers} verified={mockData.verifiedUsers} />
        <Card title="Sellers" total={mockData.totalSellers} verified={mockData.verifiedSellers} />
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>User and Seller Verification Status</h2>
        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Total" />
              <Bar dataKey="verified" fill="#82ca9d" name="Verified" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;