import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Api from '../../utils/api';
import loginImage from "../../assets/images/admin.png";
import { useAuth } from '../../context/authContext';

const LoginPage = () => {
  const { login} = useAuth()
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Api.loginAdmin, {
        username,
        password,
      });
      if (response.data.success) {
        const { token } = response.data;
        login(token);


        navigate('/');
      } else {
        alert(response.data.success)
      }

    
    } catch (error) {
      alert(error)
      setError('Invalid username or password');
    }
  };

  return (
    <div className="home-page">
      <div className="image-container">
        <img src={loginImage} alt="Login Illustration" className="login-image" />
      </div>
      <form onSubmit={handleLogin}>
        <div className="login-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
