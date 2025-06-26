import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityPage from './Components/CityPage/CityPage'; 
import LoginSignup from './Components/LoginSignup/LoginSignup';


function App() {
  const [username, setUserName] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup setAppUserName={setUserName} />} /> {/* Renders the LoginSignup component */}
        <Route path="/home" element={<CityPage username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;


