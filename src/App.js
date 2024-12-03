import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import HealthData from "./pages/HealthData";
import GoogleFit from "./pages/GoogleFit";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> 
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/healthdata" element={<HealthData />} />
        <Route path="/googlefit" element={<GoogleFit />} />

        
        
      </Routes>
    </Router>
  );
}

export default App;
