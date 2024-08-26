import React, { useState } from 'react';
import './SignupPage.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7020/api/User/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password, email }),
      });

     
      if (!response.ok) {
        const data = await response.json();
        // Hataları işleyin ve state'e atayın
      var str =" ";
        if (data.errors) {
          data.errors.forEach(error => {
           str+=error.erorrMessage+"\n";
          });
          alert(str);
        }
      
        return;
      }
      else{
        alert("account created successfully")
        navigate('/');
      }
      const data = await response.json();

      
      
    
    } catch (error) {
      console.error('Signup error:', error);

      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;