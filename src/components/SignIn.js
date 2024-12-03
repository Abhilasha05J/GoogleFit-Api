// src/components/SignIn.js

// import React, { useState } from "react";

// const SignIn = () => {
//   // State to manage form inputs
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add logic to process the sign-in
//     console.log("Sign-in details:", { email, password });
//   };

//   return (
//     <div className="signin-container">
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;





// src/components/SignIn.js
import "./signin.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import{ jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';

const SignIn = () => {
  // State to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-in details:", { email, password });
  };

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/"); // Navigate to home or desired route
  };

  return (
    <div className="card-form-container">
  <div className="card-form">
  <div className="back-arrow" onClick={() => navigate("/")}>
          &#8592; {/* Unicode for a left arrow */}
        </div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
       

       
        <div className="button-group">
          <button type="submit">Sign In</button>
          <p></p>
<hr></hr>
<h4>Or</h4>
            {/* this is signin with google */}
            <div className='form-group'>
      {!userData && (
        <GoogleLogin
          className="form-group"
          onSuccess={credentialResponse => {
            const details = jwtDecode(credentialResponse.credential);
            const userData = {
              picture: details.picture,
              name: details.name,
              email: details.email
            };
            setUserData(userData);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      )}
      {userData && (
        <div>
          <h3>Logged in</h3>
          <img src={userData.picture} alt="Profile" />
          <h3>Name: {userData.name}</h3>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
          {/* <button type="button" onClick={handleCancel}>
            Cancel
          </button> */}
        </div>
      </form>
    </div>
  </div>
  );
};

export default SignIn;

