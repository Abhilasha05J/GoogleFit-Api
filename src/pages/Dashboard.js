// import React, { useState } from "react";
// import "./Dashboard.css";
// import { Link } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
//   };

//   const handleCardClick = (category) => {
//     console.log(`${category} card clicked`); // Handle dynamic data fetching
//     // Add API calls or navigation logic here if required
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <aside className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
//         <button className="toggle-sidebar" onClick={toggleSidebar}>
//           {sidebarOpen ? "❮" : "❯"}
//         </button>
//         <div className="sidebar-content">
//           <br />
//           <h2>HealthCare+</h2>
//           <ul className="menu">
//             <li>Overview</li>
//             <li><Link to="/healthdata">Connect</Link></li>
//             <li><Link to="/GoogleFit">Connect with Google Fit</Link></li>
//           </ul>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Header */}
//         <header className="dashboard-header">
//           <div className="profile-container">
//             <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
//             {/* Dropdown Menu for Profile */}
//             {dropdownOpen && (
//               <div className="dropdown-menu">
//                 <button className="dropdown-item">Edit Profile</button>
//                 <button className="dropdown-item">Log Out</button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Dynamic Dashboard Cards */}
//         <section className="dashboard-grid">
//           <div className="summary-card" onClick={() => handleCardClick("activity")}>
//             <i className="fas fa-running"></i>
//             <h3>Activity Summary</h3>
//           </div>
//           <div className="summary-card" onClick={() => handleCardClick("health")}>
//             <i className="fas fa-heartbeat"></i>
//             <h3>Health Metrics</h3>
//           </div>
//           <div className="summary-card" onClick={() => handleCardClick("sleep")}>
//             <i className="fas fa-bed"></i>
//             <h3>Sleep Data</h3>
//           </div>
//           <div className="summary-card" onClick={() => handleCardClick("stress")}>
//             <i className="fas fa-brain"></i>
//             <h3>Stress Levels</h3>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState } from "react";
// import "./Dashboard.css";
// import { Link } from "react-router-dom";
// import { FaUserCircle } from "react-icons/fa";
// import { jwtDecode } from "jwt-decode";

// import { GoogleLogin, googleLogout } from "@react-oauth/google";


// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [userData, setUserData] = useState(null); // State for Google user data
//   const [fitnessData, setFitnessData] = useState(null); // State for fitness data
//   const [loading, setLoading] = useState(false); // Tracks API call status

//   const CLIENT_ID = "545944066975-cgj14f9ud9j32s7crk60os1s42bgk3og.apps.googleusercontent.com"; // Replace with your Google Client ID
//   const SCOPE = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read";

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   const handleGoogleLoginSuccess = (credentialResponse) => {
//     try {
//       const details = jwtDecode(credentialResponse.credential);
//       const user = {
//         token: credentialResponse.credential,
//         picture: details.picture,
//         name: details.name,
//         email: details.email,
//       };
//       setUserData(user);
//       fetchGoogleFitData(credentialResponse.credential); // Fetch data after login
//     } catch (error) {
//       console.error("Error decoding JWT:", error);
//     }
//   };



//   const fetchGoogleFitData = async (token) => {
//     setLoading(true); // Start loading indicator
//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             aggregateBy: [
//               {
//                 dataTypeName: "com.google.step_count.delta",
//               },
//             ],
//             bucketByTime: { durationMillis: 86400000 }, // Group by daily buckets
//             startTimeMillis: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
//             endTimeMillis: Date.now(),
//           }),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setFitnessData(data.bucket || []); // Store buckets if available
//       } else {
//         console.error("Error fetching Google Fit data:", response.status);
//         setFitnessData([]); // Set empty array if error occurs
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setFitnessData([]); // Set empty array if fetch fails
//     } finally {
//       setLoading(false); // Stop loading indicator
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <aside className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
//         <button className="toggle-sidebar" onClick={toggleSidebar}>
//           {sidebarOpen ? "❮" : "❯"}
//         </button>
//         <div className="sidebar-content">
//           <br />
//           <h2>HealthCare+</h2>
//           <ul className="menu">
//             <li>Overview</li>
//             <li><Link to="/healthdata">Connect</Link></li>
//             <li>
//               {/* Connect with Google Fit */}
//               {!userData ? (
//                 <GoogleLogin
//                   onSuccess={handleGoogleLoginSuccess}
//                   onError={() => console.log("Login Failed")}
//                   useOneTap
//                 />
//               ) : (
//                 <button
//                   onClick={() => {
//                     googleLogout(() => setUserData(null));
//                     setFitnessData(null);
//                   }}
//                 >
//                   Disconnect Google Fit
//                 </button>
//               )}
//             </li>
//           </ul>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Header */}
//         <header className="dashboard-header">
//           <div className="profile-container">
//             <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
//             {/* Dropdown Menu for Profile */}
//             {dropdownOpen && (
//               <div className="dropdown-menu">
//                 <button className="dropdown-item">Edit Profile</button>
//                 <button className="dropdown-item">Log Out</button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Dynamic Dashboard Cards */}
//         <section className="dashboard-grid">
//           <div className="summary-card" onClick={() => console.log("Activity Summary Clicked")}>
//             <i className="fas fa-running"></i>
//             <h3>Activity Summary</h3>
//           </div>
//           <div className="summary-card" onClick={() => console.log("Health Metrics Clicked")}>
//             <i className="fas fa-heartbeat"></i>
//             <h3>Health Metrics</h3>
//           </div>
//           <div className="summary-card" onClick={() => console.log("Sleep Data Clicked")}>
//             <i className="fas fa-bed"></i>
//             <h3>Sleep Data</h3>
//           </div>
//           <div className="summary-card" onClick={() => console.log("Stress Levels Clicked")}>
//             <i className="fas fa-brain"></i>
//             <h3>Stress Levels</h3>
//           </div>
//         </section>

//         {/* Google Fit Data Display */}
//         {fitnessData && (
//           <section>
//             <div>
//       <h2>Google Fit Integration</h2>
//       {!userData ? (
//         <GoogleLogin
//           onSuccess={handleGoogleLoginSuccess}
//           onError={() => console.log("Login Failed")}
//         />
//       ) : (
//         <div>
//           <h3>Welcome, {userData.name}</h3>
//           <img src={userData.picture} alt="Profile" />
//           <p>Email: {userData.email}</p>
//           <button
//             onClick={() => {
//               googleLogout(() => setUserData(null));
//               setFitnessData(null);
//             }}
//           >
//             Logout
//           </button>
//           <div>
//             <h3>Fitness Data Summary</h3>
//             {loading ? (
//               <p>Loading data...</p>
//             ) : fitnessData && fitnessData.length > 0 ? (
//               <ul>
//                 {fitnessData.map((bucket, index) => (
//                   <li key={index}>
//                     Steps:{" "}
//                     {bucket.dataset[0]?.point[0]?.value[0]?.intVal || 0} steps
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No data available</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>

//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null); // State for Google user data
  const [fitnessData, setFitnessData] = useState(null); // State for fitness data
  const [loading, setLoading] = useState(false); // Tracks API call status

  const CLIENT_ID = "527732711881-4g6ohgfijn5p4pgeejn28rtfe8pt462u.apps.googleusercontent.com"; 
  const SCOPE = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read";

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      const details = jwtDecode(credentialResponse.credential);
      const user = {
        token: credentialResponse.credential,
        picture: details.picture,
        name: details.name,
        email: details.email,
      };
      setUserData(user);
      fetchGoogleFitData(credentialResponse.credential); // Fetch data after login
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  };

  const fetchGoogleFitData = async (token) => {
    setLoading(true); // Start loading indicator
    try {
      const response = await fetch(
        "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            aggregateBy: [
              {
                dataTypeName: "com.google.step_count.delta",
              },
            ],
            bucketByTime: { durationMillis: 86400000 }, // Group by daily buckets
            startTimeMillis: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
            endTimeMillis: Date.now(),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFitnessData(data.bucket || []); // Store buckets if available
      } else {
        console.error("Error fetching Google Fit data:", response.status);
        setFitnessData([]); // Set empty array if error occurs
      }
    } catch (error) {
      console.error("Error:", error);
      setFitnessData([]); // Set empty array if fetch fails
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          {sidebarOpen ? "❮" : "❯"}
        </button>
        <div className="sidebar-content">
          <br />
          <h2>HealthCare+</h2>
          <ul className="menu">
            <li>Overview</li>
            <li><Link to="/healthdata">Connect</Link></li>
            <li>
              {/* Connect with Google Fit */}
              {!userData ? (
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => console.log("Login Failed")}
                  useOneTap
                />
              ) : (
                <button
                  onClick={() => {
                    googleLogout(() => setUserData(null));
                    setFitnessData(null);
                  }}
                >
                  Disconnect Google Fit
                </button>
              )}
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="profile-container">
            {userData ? (
              <div className="profile-info">
                <div className="profile-image">
                  <img
                    src={userData.picture}
                    alt="Profile"
                    className="profile-picture"
                  />
                </div>
                <div className="profile-details">
                  <h3>{userData.name}</h3>
                  <p>{userData.email}</p>
                  <button
                    onClick={() => {
                      googleLogout(() => setUserData(null));
                      setFitnessData(null);
                    }}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
            )}
            {/* Dropdown Menu for Profile */}
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Edit Profile</button>
                <button className="dropdown-item">Log Out</button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Dashboard Cards */}
        <section className="dashboard-grid">
          <div className="summary-card" onClick={() => console.log("Activity Summary Clicked")}>
            <i className="fas fa-running"></i>
            <h3>Activity Summary</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p>{fitnessData?.length > 0 ? `${fitnessData[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0} steps` : "No data available"}</p>
            )}
          </div>

          <div className="summary-card" onClick={() => console.log("Health Metrics Clicked")}>
            <i className="fas fa-heartbeat"></i>
            <h3>Health Metrics</h3>
            {/* Add similar logic for other metrics */}
          </div>

          <div className="summary-card" onClick={() => console.log("Sleep Data Clicked")}>
            <i className="fas fa-bed"></i>
            <h3>Sleep Data</h3>
            {/* Add logic for sleep data */}
          </div>

          <div className="summary-card" onClick={() => console.log("Stress Levels Clicked")}>
            <i className="fas fa-brain"></i>
            <h3>Stress Levels</h3>
            {/* Add logic for stress levels */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;




