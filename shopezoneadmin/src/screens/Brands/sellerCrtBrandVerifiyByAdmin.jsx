import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Api, { server } from '../../utils/api';

const SellerBrandVerification = () => {
  const [pendingBrands, setPendingBrands] = useState([]);
  const [verifiedBrands, setVerifiedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  

  useEffect(() => {
    const fetchPendingBrands = async () => {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      if (!token) {
        setError('No token provided');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(Api.getSellerCreatedPendingBrands, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
        });
        const pending = response.data.brands.filter(brand => brand.status === 'pending');
        const verified = response.data.brands.filter(brand => brand.status === 'verified');
        setPendingBrands(pending);
        setVerifiedBrands(verified);
        setLoading(false);
      } catch (err) {
        setError('Error fetching brands');
        setLoading(false);
      }
    };
    fetchPendingBrands();
  }, []);

  const handleVerify = async (brandId, status) => {
    const token = localStorage.getItem('token'); // Ensure the token is available for the PUT request
    if (!token) {
      setError('No token provided');
      return;
    }

    try {
      await axios.put(
        `${Api.verifySellerBrandByAdmin}/${brandId}`, // Use correct URL path
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
        }
      );

      // Update both pending and verified brands
      setPendingBrands(prevBrands =>
        prevBrands.filter(brand => brand._id !== brandId)
      );

      if (status === 'verified') {
        const verifiedBrand = pendingBrands.find(brand => brand._id === brandId);
        setVerifiedBrands(prevVerified => [...prevVerified, { ...verifiedBrand, status: 'verified' }]);
      }
    } catch (err) {
      setError('Error verifying brand');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Pending Seller Brand Verifications</h1>
      {pendingBrands.length === 0 ? (
        <p>No pending brands</p>
      ) : (
        <div>
          {pendingBrands.map(brand => (
            <div
              key={brand._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                borderBottom: '1px solid #ddd',
                paddingBottom: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`${server}${brand.logo}`}
                  alt={brand.name}
                  style={{ width: '50px', height: '50px', marginRight: '20px' }}
                />
                <div>
                  <h3 style={{ margin: '0' }}>{brand.name}</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#888' }}>
                    Status: {brand.status}
                  </p>
                </div>
              </div>
              <div>
                <button
                  style={{
                    marginRight: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleVerify(brand._id, 'verified')}
                >
                  Verify
                </button>
                <button
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleVerify(brand._id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h1>Verified Brands</h1>
      {verifiedBrands.length === 0 ? (
        <p>No verified brands</p>
      ) : (
        <div>
          {verifiedBrands.map(brand => (
            <div
              key={brand._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                borderBottom: '1px solid #ddd',
                paddingBottom: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`${server}${brand.logo}`}
                  alt={brand.name}
                  style={{ width: '50px', height: '50px', marginRight: '20px' }}
                />
                <div>
                  <h3 style={{ margin: '0' }}>{brand.name}</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#888' }}>
                    Status: {brand.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerBrandVerification;
