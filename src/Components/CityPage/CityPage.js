import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CityPage.css'; // Import the CSS file
import io from 'socket.io-client';
import IconButton from '@mui/material/IconButton';
import MapIcon from '@mui/icons-material/Map';
import Dialog from '@mui/material/Dialog';
import CourtsMap  from '../CourtsMap/CourtsMap';

const BASE_URL = process.env.REACT_APP_API_URL;

const socket = io(`${BASE_URL}`);

const CityPage = ({ username }) => {
    const [names, setNames] = useState([]); // State to hold names for the waitlist
    const [cities, setCities] = useState([]);
    const [fetchedCities, setFetchedCities] = useState(false);
    const [selectedCity, setSelectedCity] = useState(''); // Track selected city
    const [fetchedParks, setFetchedParks] = useState(false);
    const [selectedPark, setSelectedPark] = useState(''); // Track selected court
    const [newName, setNewName] = useState(''); // State for new name input
    const [signup, setSignup] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [parkDict, setParkDict] = useState({})
    const [courts, setCourts] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            const response = await fetch(`${BASE_URL}/get_cities`);
            const data = await response.json();
            setCities(data);
            setFetchedCities(true);
        }

        fetchCities();
    }, []);    

    useEffect(() => {
        const fetchCourts = async () => {
            const response = await fetch(`${BASE_URL}/get_courts/`+selectedCity);
            //const response = await fetch(`${BASE_URL}/get_courts_test/`+selectedCity);
            const data = await response.json();
            setCourts(data);
            setParkDict(prevDict => ({
                ...prevDict,
                [selectedCity]: [...(prevDict[selectedCity] || []), ...data]
            }));
            setFetchedParks(true);
        }
        
        if (selectedCity) {
            setSelectedPark("");
            setNames([]);
            setSignup(false);
            if (!(selectedCity in parkDict)) {
                setFetchedParks(false);
                fetchCourts();
            }
            else {
                setCourts(parkDict[selectedCity]);
            }
        }
    }, [selectedCity]);

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

        setSignup(false);
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

    const handleOpenCourtsMap = () => {
        navigate('/courtsmap', { state: { courts } });
    }

    const handleCourtSelect = (court) => {
        setSelectedPark(court.name);
        setOpen(false); // Close the dialog after selection
    };

    return (
        <div className="container"> {/* Add the container class */}
            <h1>Hi {username},</h1>
                {!selectedCity && fetchedCities && (
                    <span> Select a city you want to play basketball</span>
                )}
                {selectedCity && fetchedCities && (
                    <span> Select a {selectedCity} basketball court then Sign Up or leave the Waitlist</span>
                )}
            <table style={{minWidth: "320px", alignItems: "center"}}><tbody>
                <tr><td>
                {fetchedCities && (
                    <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
                        <option value="">Select a city</option>
                             {cities.map((city, idx) => (
                               <option key={city} value={city}>{city}</option>
                             ))}
                    </select>
                )}
                </td><td></td></tr>
                {selectedCity && fetchedParks && parkDict[selectedCity] && (
                <tr><td>
                    <select onChange={(e) => setSelectedPark(e.target.value)} value={selectedPark}>
                        <option value="">Select a court</option>
             
                        {courts.map((court, idx) => (
                        <option key={court.name} value={court.name}>{court.name}</option>
                        ))}
                    </select>
                </td><td>
                <IconButton color="primary" size="small" onClick={handleOpen} aria-label="Open Courts Map"><MapIcon /></IconButton>
                </td></tr>
                )}
            </tbody></table>
            <Dialog open={open} onClose={handleClose} maxWidth="false">
                <CourtsMap courts={courts} onCourtSelect={handleCourtSelect} />
            </Dialog>            
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

export default CityPage;



