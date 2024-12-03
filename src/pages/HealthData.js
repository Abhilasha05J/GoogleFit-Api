import React, { useState, useEffect } from "react";
import "./HealthData.css";

const HealthData = () => {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from healthcare API
    const fetchHealthData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users"); 
        if (!response.ok) {
          throw new Error("Failed to fetch health data");
        }
        const data = await response.json();
        setHealthData(data); // Update state with the array of users
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="health-data">
      <h2>Health Data</h2>
      <div className="data-cards">
        {healthData.map((user) => (
          <div className="data-card" key={user.id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {`${user.address.street}, ${user.address.city}`}</p>
            <p>Company: {user.company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthData;
