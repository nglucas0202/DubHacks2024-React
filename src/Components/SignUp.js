// src/Components/SignUp.js
import React, { useState } from 'react';

const SignUp = () => {
    const [name, setName] = useState('');
    const [waitingList, setWaitingList] = useState([]);

    const handleSignUp = () => {
        if (waitingList.length < 10) {
            setWaitingList([...waitingList, name]);
            setName(''); // Clear input field after sign up
        } else {
            alert('All spots are filled!');
        }
    };

    return (
        <div>
            <h2>Sign Up for 5-on-5 Basketball</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <button onClick={handleSignUp}>Sign Up</button>

            <h3>Waiting List:</h3>
            <ul>
                {waitingList.map((player, index) => (
                    <li key={index}>{player}</li>
                ))}
            </ul>
        </div>
    );
};

export default SignUp;
