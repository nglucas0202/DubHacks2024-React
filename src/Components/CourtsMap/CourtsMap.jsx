import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
//import { useLocation } from 'react-router-dom';

const CourtsMap = ({ courts, onCourtSelect }) => {
  //const location = useLocation();
  //const courts = location.state?.courts || [];
  // Optionally, center the map on the first court or use a default location
  const defaultCenter = courts.length
    ? { lat: courts[0].lat, lng: courts[0].lng }
    : { lat: 47.6062, lng: -122.3321 }; // Example: Seattle

  //const handleCourtClick = (court) => {
    // Navigate back to the caller page, passing the selected court
  //  navigate(-1, { state: { selectedCourt: court } });
  //};

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="full-page-map-container">
        <div style = {{ height: "5%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto", textAlign: "center"}}>Click on one of the basketball court to continue
        </div>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={12}
          style={{ height: "95%", width: "100%" }}
        >
          {courts.map((court, idx) => (
            <Marker
              key={idx}
              position={{ lat: court.lat, lng: court.lng }}
              title={court.name}
              onClick={() => onCourtSelect(court)}
            />
          ))}
        </Map>
      </div>
    </APIProvider>
  );
};

export default CourtsMap;

