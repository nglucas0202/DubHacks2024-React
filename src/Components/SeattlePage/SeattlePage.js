import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeattlePage.css'; // Import the CSS file
import io from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_API_URL;

const socket = io(`${BASE_URL}`);

const SeattlePage = ({ username }) => {
    const [names, setNames] = useState([]); // State to hold names for the waitlist
    const [selectedPark, setSelectedPark] = useState(''); // Track selected park
    const [newName, setNewName] = useState(''); // State for new name input
    const [signup, setSignup] = useState(false);
    const [fetched, setFetched] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/'); // Redirect to login
        }
    }, [username, navigate]);

    useEffect(() => {
        // Fetch names when the component mounts or the selected park changes
        const fetchNames = async () => {
            if (selectedPark) {
                const response = await fetch(`${BASE_URL}/get_names/${selectedPark}`);
                const data = await response.json();
                setNames(data);
                if (data.includes(username)) {
                    setSignup(true);
                }
                setFetched(true);
            }
        };

        // Listen for real-time login updates
        socket.on('update_wait_list', (data) => {
            setNames(data.names)
        });

        fetchNames();

    }, [selectedPark]); // Only run this effect when selectedPark changes

    const handleSignup = async (e) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/waitlist_signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ location: selectedPark, name: username }), // Send updated list
        });

        setSignup(true);
    };

    const handleLeave = async (e) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/waitlist_leave`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ location: selectedPark, name: username }), // Send updated list
        });     
        
        setSignup(false);
    };


    return (
        <div className="container"> {/* Add the container class */}
            <h1>Hi {username}, Seattle Parks Waitlist</h1>
            <select onChange={(e) => setSelectedPark(e.target.value)} value={selectedPark}>
                <option value="">Select a park</option>
                <option value="Park1">Christie Park</option>
                <option value="Park2">Cowen Park</option>
                <option value="Park3">Cascade Playground</option>
            </select>
            {selectedPark && fetched && !signup && (
                <form onSubmit={handleSignup}>
                    <button type="submit" style={{ minWidth: "120px" }}>Sign Up</button>
                </form>
            )}
            {selectedPark && fetched && signup && (
                <form onSubmit={handleLeave}>
                    <button type="submit" style={{ minWidth: "120px" }}>Leave</button>
                </form>
            )}            
            {selectedPark && fetched && (
            <span>
            <h2>Waitlist</h2>
            <ul>
                {names.map((name, index) => (
                   <li key={index}>{name}</li>
                ))}
            </ul>
            </span>
            )}
        </div>
    );
};

export default SeattlePage;



