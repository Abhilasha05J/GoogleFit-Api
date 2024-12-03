
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import both Link and useNavigate
import "./signin.css";

const SignUp = () => {
  // State to manage form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setuserName] = useState("");

  // Navigate hook for redirection
  const navigate = useNavigate();

  // Handle cancel button click
  const handleCancel = () => {
    navigate("/"); // Navigate to the home route or desired route
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to process sign-up
    console.log("Sign-up details:", { email, password });
    navigate("/dashboard"); // Redirect to dashboard or desired page after successful sign-up
  };

  return (
    <div className="card-form-container">
      <div className="card-form">
         {/* Back Arrow */}
         <div className="back-arrow" onClick={() => navigate("/")}>
          &#8592; {/* Unicode for a left arrow */}
        </div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>

        <div className="form-group">
            <label htmlFor="userName">User Name:</label>
            <input
              type="userName"
              id="userName"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
          </div>
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



          <button type="submit">Sign Up</button>
        </form>

        {/* Link to Sign-In page */}
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>

      </div>
    </div>
  );
};

export default SignUp;
