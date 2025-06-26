// src/Components/SeattlePage/SeattlePage.js
import React from 'react';
import SignUp from '../SignUp'; // Adjust the path based on your directory structure
import './SeattlePage.css'; // Import the CSS file

const SeattlePage = () => {
    return (
        <div className="container"> {/* Apply the container class */}
            <h1>Seattle Page</h1>
            {/* Add any additional content specific to Seattle here */}
            <SignUp />
        </div>
    );
};

export default SeattlePage;
