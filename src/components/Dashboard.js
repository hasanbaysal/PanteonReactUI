import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [constructionTime, setConstructionTime] = useState('');
  const [buildingCost, setBuildingCost] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        if (!storedToken) {
          navigate('/'); 
          return;
        }
        setToken(storedToken);

        const response = await fetch('http://80.253.246.85:5000/api/GameConfiguration/GetAllConfig', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/'); 
          throw new Error('Unauthorized. Redirecting to login.');
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message || 'An error occurred'}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleAddClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setConstructionTime('');
    setBuildingCost('');
    setBuildingType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://80.253.246.85:5000/api/GameConfiguration/CreateConfig', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ constructionTime, buildingCost, buildingType }),
      });

      if (response.status === 401) {
        localStorage.removeItem('authToken');
        navigate('/'); 
        throw new Error('Unauthorized. Redirecting to login.');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || 'An error occurred'}`);
      }

      handleClosePopup(); // Popup'ı kapat
      // Verileri güncellemek için yeniden çağırabilirsiniz
      const storedToken = localStorage.getItem('authToken');
      const fetchData = async () => {
        const result = await fetch('http://80.253.246.85:5000/api/GameConfiguration/GetAllConfig', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          },
        }).then(res => res.json());

        setData(result);
      };
      fetchData();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Game Configurations</h1>
      <button className="add-button" onClick={handleAddClick}>Ekle</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-btn" onClick={handleClosePopup}>&times;</span>
            <h2>Yeni Konfigürasyon Ekle</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="constructionTime">Construction Time</label>
                <input
                  type="number"
                  id="constructionTime"
                  value={constructionTime}
                  onChange={(e) => setConstructionTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="buildingCost">Building Cost</label>
                <input
                  type="number"
                  id="buildingCost"
                  value={buildingCost}
                  onChange={(e) => setBuildingCost(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="buildingType">Building Type</label>
                <select
                  id="buildingType"
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Farm">Farm</option>
                  <option value="Academy">Academy</option>
                  <option value="LumberMill">LumberMill</option>
                  <option value="Barracks">Barracks</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Add Configuration</button>
            </form>
          </div>
        </div>
      )}
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
