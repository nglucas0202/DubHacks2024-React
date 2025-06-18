import React, { useState } from 'react';
import './BellevuePage.css'; // Make sure this file exists
import { useNavigate } from 'react-router-dom';

const BellevuePage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // State to manage which dropdown is open
    const [openDropdown, setOpenDropdown] = useState(null);
    const [userNames, setUserNames] = useState({
        location1: Array(10).fill(''),
        location2: Array(10).fill(''),
        location3: Array(10).fill(''),
    });

    // Function to handle button clicks for dropdowns
    const handleDropdownToggle = (location) => {
        setOpenDropdown(openDropdown === location ? null : location);
    };

    // Function to handle input change
    const handleInputChange = (location, index, event) => {
        const updatedNames = [...userNames[location]];
        updatedNames[index] = event.target.value;
        setUserNames({ ...userNames, [location]: updatedNames });
    };

    // Function to handle logout
    const handleLogout = () => {
        // Perform any logout operations (e.g., clearing tokens)
        // Redirect to LoginSignup page
        navigate('/'); // Redirects to the login/signup page
    };

    return (
        <div className='container'>
            <div className="header">Pick a Park!</div>

            <div className="button-container">
                {/* Location 1 Button */}
                <div>
                    <button className="Location" onClick={() => handleDropdownToggle('location1')}>
                        Norwood Village Park
                    </button>
                    {openDropdown === 'location1' && (
                        <div className="dropdown">
                            {userNames.location1.map((name, index) => (
                                <input 
                                    key={index}
                                    type="text" 
                                    placeholder={`Enter name ${index + 1}`} 
                                    value={name} 
                                    onChange={(e) => handleInputChange('location1', index, e)} 
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Location 2 Button */}
                <div>
                    <button className="Location" onClick={() => handleDropdownToggle('location2')}>
                        Crossroads Park
                    </button>
                    {openDropdown === 'location2' && (
                        <div className="dropdown">
                            {userNames.location2.map((name, index) => (
                                <input 
                                    key={index}
                                    type="text" 
                                    placeholder={`Enter name ${index + 1}`} 
                                    value={name} 
                                    onChange={(e) => handleInputChange('location2', index, e)} 
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Location 3 Button */}
                <div>
                    <button className="Location" onClick={() => handleDropdownToggle('location3')}>
                        Killarney Glen Park
                    </button>
                    {openDropdown === 'location3' && (
                        <div className="dropdown">
                            {userNames.location3.map((name, index) => (
                                <input 
                                    key={index}
                                    type="text" 
                                    placeholder={`Enter name ${index + 1}`} 
                                    value={name} 
                                    onChange={(e) => handleInputChange('location3', index, e)} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Logout Button */}
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default BellevuePage;
