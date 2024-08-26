import React, { useState,useEffect } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
   
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/dashboard'); 
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://80.253.246.85:5000/api/User/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        // console.log(response);
      }

      const data = await response.json();
     

      if (!response.ok) {
        alert(data.message);
      
      }
      else{

        const token = data.token;
        console.log('Token:', token);
        localStorage.setItem('authToken', token);
        navigate('/dashboard');
      }

    } 
    catch (error) {
    
      console.log(error);
    }
  };

  const handleSignup = () => {
   
    //navigate et !
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Panteon Games Demo</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label  style={{color: "white"}} htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label style={{color: "white"}} htmlFor="password">Password</label>
            <input
              
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <button onClick={handleSignup} className="signup-button"><Link className='removeLink' to="signup">Register</Link></button>
      </div>
    </div>
  );
};

export default LoginPage;
