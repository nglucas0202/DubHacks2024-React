import React, { useState } from 'react';
import './RentonPage.css';
import { useNavigate } from 'react-router-dom';

const RentonPage = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // State to manage which dropdown is open
    const [openDropdown, setOpenDropdown] = useState(null);
    const [userNames, setUserNames] = useState({
        location1: Array(10).fill(''),
        location2: Array(10).fill(''),
        location3: Array(10).fill(''),
    });

    // Function to handle button clicks
    const handleDropdownToggle = (location) => {
        setOpenDropdown(openDropdown === location ? null : location);
    };

    // Function to handle input change
    const handleInputChange = (location, index, event) => {
        const updatedNames = [...userNames[location]];
        updatedNames[index] = event.target.value;
        setUserNames({ ...userNames, [location]: updatedNames });
    };

    return (
        <div className='container'>
            <div className="header">Pick a Park!</div>

            <div className="button-container">
                {/* Location 1 Button */}
                <div>
                    <button className="Location" onClick={() => handleDropdownToggle('location1')}>
                        Liberty Park
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
                        Kiwanis Park
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
                        Ron Regis Park
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
        </div>
    );
};

export default RentonPage;