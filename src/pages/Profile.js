// src/pages/Profile.js

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h2>Your Profile</h2>
        <p>Edit your details and settings here.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
