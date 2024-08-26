import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); 
    }
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

     
        const response = await fetch('https://localhost:7020/api/GameConfiguration/GetAllConfig', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message || 'An error occurred'}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Game Configurations</h1>
      <table className="config-table">
        <thead>
          <tr>
          
            <th>Construction Time</th>
            <th>Building Cost</th>
            <th>Building Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
             
              <td>{item.constructionTime}</td>
              <td>{item.buildingCost}</td>
              <td>{item.buildingType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;