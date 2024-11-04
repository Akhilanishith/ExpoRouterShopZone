import React, { useState, useEffect } from 'react';
import DrawerMenu from '../Drawer/DrawerMenu';

// Orders component
const Orders = () => {
  // State to store the orders
  const [orders, setOrders] = useState([]);

  // Fetch orders data when the component is mounted
  useEffect(() => {
    // Simulated API call to fetch order data
    const fetchOrders = async () => {
      const mockOrders = [
        {
          id: 1,
          customerName: 'John Doe',
          product: 'Smartphone',
          amount: '$500',
          status: 'Delivered',
          date: '2024-09-10',
        },
        {
          id: 2,
          customerName: 'Jane Smith',
          product: 'Laptop',
          amount: '$1200',
          status: 'Pending',
          date: '2024-09-12',
        },
        {
          id: 3,
          customerName: 'Michael Johnson',
          product: 'Headphones',
          amount: '$100',
          status: 'Shipped',
          date: '2024-09-14',
        },
        {
          id: 4,
          customerName: 'Emma Watson',
          product: 'Tablet',
          amount: '$300',
          status: 'Cancelled',
          date: '2024-09-15',
        },
        {
          id: 5,
          customerName: 'Chris Evans',
          product: 'Smartwatch',
          amount: '$250',
          status: 'Processing',
          date: '2024-09-16',
        },
      ];

      // Simulating a delay in fetching data
      setTimeout(() => {
        setOrders(mockOrders);
      }, 1000);
    };

    fetchOrders();
  }, []);

  return (
    <div>
    <div style={{ display: 'flex' }}>
       
       <DrawerMenu />
       
       <div style={{ flexGrow: 1, padding: '20px' }}>
      <h1>Orders List</h1>
      {/* Conditionally render loading message if orders are not yet fetched */}
      {orders.length === 0 ? (
        <p>Loading orders...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Order ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Customer</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.customerName}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.product}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.amount}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.status}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
      </div>
    </div>
  );
};

export default Orders;
