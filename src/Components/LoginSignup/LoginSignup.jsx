import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

import user_icon from '../Assets/user_icon.png';
import password_icon from '../Assets/password_icon.png';
import man from '../Assets/man.png';

const BASE_URL = process.env.REACT_APP_API_URL;

const LoginSignup = ({ setAppUserName }) => {
    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // State to track messages
    const navigate = useNavigate();

    const handleSubmit = async (actionType) => {
        if (username.trim() === '' || password.trim() === '') return;

        try {
            const endpoint = actionType === "Sign Up" ? '/create_user' : '/login';
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Network response was not ok");
            }

            // Handle successful response
            setMessage(data.message); // Show success message
            if (actionType === "Login") {
                setAppUserName(username);
                navigate('/home');
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            setMessage(`Error: ${error.message}`); // Show error message
        }
    };

    return (
        <div className='container'>
            <img src={man} alt="Man" className="man-image" /> {/* Added image here */}
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <img src={user_icon} alt="" />
                    <input 
                        type="text" 
                        placeholder='Username' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </div>
            {message && <div className="message">{message}</div>} {/* Display message */}
            {action === "Sign Up" ? null : (
                <div className="forgot-password">
                    Lost Password? <span>Click Here!</span>
                </div>
            )}
            <div className="submit-container">
                <div 
                    className={action === "Sign Up" ? "submit gray" : "submit"} 
                    onClick={() => { 
                        if (action !== "Sign Up") {
                            setAction("Sign Up");
                            setMessage(''); // Clear message
                        } else {
                            handleSubmit("Sign Up"); // Trigger sign-up logic
                        }
                    }}
                >
                    Sign Up
                </div>
                <div 
                    className={action === "Login" ? "submit gray" : "submit"} 
                    onClick={() => { 
                        if (action !== "Login") {
                            setAction("Login");
                            setMessage(''); // Clear message
                        } else {
                            handleSubmit("Login"); // Trigger login logic
                        }
                    }}
                >
                    Login
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;


