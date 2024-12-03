import React, { useState, useEffect } from "react";
import "./HealthData.css";

const CLIENT_ID = "545944066975-cgj14f9ud9j32s7crk60os1s42bgk3og.apps.googleusercontent.com"; 
const REDIRECT_URI = "http://localhost:3000";
const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read";

const HealthData = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [accessToken, setAccessToken] = useState("");

  // Step 1: Handle OAuth Authentication
  const authenticate = async () => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${SCOPES}`;
    window.location.href = authUrl;
  };

  // Step 2: Extract Access Token from URL
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const token = hashParams.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  // Step 3: Fetch Health Data
  useEffect(() => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchHealthData = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/fitness/v1/users/me/dataSources",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch health data");
        }

        const data = await response.json();
        setHealthData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHealthData();
  }, [accessToken]);

  if (!accessToken) {
    return (
      <div className="auth-prompt">
        <button className="auth-btn" onClick={authenticate}>
          Connect to Google Fit
        </button>
      </div>
    );
  }

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
        {healthData?.dataSource && healthData.dataSource.length > 0 ? (
          healthData.dataSource.map((source) => (
            <div className="data-card" key={source.dataStreamId}>
              <h3>{source.dataStreamName}</h3>
              <p>Type: {source.dataType.name}</p>
            </div>
          ))
        ) : (
          <p>No health data available.</p>
        )}
      </div>
    </div>
  );
};

export default HealthData;
