import React, { useState, useEffect } from 'react';
import DrawerMenu from '../Drawer/DrawerMenu';

// Carts component
const Carts = () => {
  // State to store cart data
  const [carts, setCarts] = useState([]);

  // Fetch carts data when the component is mounted
  useEffect(() => {
    // Simulated API call to fetch cart data
    const fetchCarts = async () => {
      const mockCarts = [
        {
          cartId: 1,
          customerName: 'John Doe',
          items: [
            { productName: 'Smartphone', quantity: 1, price: '$500' },
            { productName: 'Headphones', quantity: 2, price: '$50' },
          ],
          total: '$600',
          date: '2024-09-10',
        },
        {
          cartId: 2,
          customerName: 'Jane Smith',
          items: [
            { productName: 'Laptop', quantity: 1, price: '$1200' },
          ],
          total: '$1200',
          date: '2024-09-12',
        },
        {
          cartId: 3,
          customerName: 'Michael Johnson',
          items: [
            { productName: 'Tablet', quantity: 2, price: '$300' },
            { productName: 'Smartwatch', quantity: 1, price: '$200' },
          ],
          total: '$800',
          date: '2024-09-14',
        },
      ];

      // Simulating a delay in fetching data
      setTimeout(() => {
        setCarts(mockCarts);
      }, 1000);
    };

    fetchCarts();
  }, []);

  return (
    <div>
    <div style={{ display: 'flex' }}>
       
       <DrawerMenu />
       
       <div style={{ flexGrow: 1, padding: '20px' }}>
      <h1>Cart List</h1>
      {/* Conditionally render loading message if carts are not yet fetched */}
      {carts.length === 0 ? (
        <p>Loading carts...</p>
      ) : (
        <div>
          {carts.map((cart) => (
            <div key={cart.cartId} style={{ marginBottom: '20px' }}>
              <h3>Cart ID: {cart.cartId}</h3>
              <p>Customer: {cart.customerName}</p>
              <p>Date: {cart.date}</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.productName}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.quantity}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4 style={{ marginTop: '10px' }}>Total: {cart.total}</h4>
            </div>
          ))}
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Carts;
