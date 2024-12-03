
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Ensure this is correctly imported

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <section className="hero">
        <div className="hero-text">
          <h2>Welcome to HealthCare+</h2>
          <p>Your trusted partner in health and wellness.</p>
          <Link to="/signup" className="cta-button">Get Started</Link>
       
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;

