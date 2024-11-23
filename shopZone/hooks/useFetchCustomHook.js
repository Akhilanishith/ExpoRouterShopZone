import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchCustomHook = (endpoint, token) => { 
  const [data, setData] = useState(null); // For storing the response data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start of the request
      try {
        const headers = {
          'Content-Type': 'application/json', // Specify content type
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`; // Add Authorization header only if token is provided
        }

        const response = await axios.get(endpoint, { headers });

        setData(response.data); // Set the response data from axios
      } catch (err) {
        setError(err.message || 'An error occurred'); // Set the error message
      } finally {
        setLoading(false); // Set loading to false when the request finishes
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint, token]); // Dependencies are endpoint and token

  return { data, loading, error };
};

export default useFetchCustomHook;
