import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CycleCard from '../Card/Card';
import { userContext } from '../Context/userContext';

const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
};

const containerStyles = {
    position: 'relative',
    height: '100vh',
    width: '100vw'
};

const useLocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setLocation(newLocation);
                },
                (error) => console.error('Error getting location:', error),
                {
                    enableHighAccuracy: true,
                    maximumAge: 30000,
                    timeout: 27000
                }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, []);
    return location;
};

const bicycleIcon = new Icon({
    iconUrl: '/bicycle.png', // Ensure this image is in your public folder
    iconSize: [38, 38]
});

const userIcon = new Icon({
    iconUrl: '/placeholder.png', // Ensure this image is in your public folder
    iconSize: [38, 38]
});

const MapCenterControl = ({ center }) => {
    const map = useMap();

    useEffect(() => {
        if (center && map) {
            map.setView(center, 15);
        }
    }, [center, map]);

    return null;
};

function Rentcycle() {
    const userLocation = useLocation();
    const [location, setLocation] = useState(null);
    const { user } = useContext(userContext);
    const [college, setCollege] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState('');
    const defaultCenter = { lat: 20.5937, lng: 78.9629 };

    // Fetch user data and college
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('id');
                setDebugInfo(prev => prev + `\nUser ID from localStorage: ${userId}`);
                
                if (!userId) {
                    throw new Error("User ID not found in localStorage");
                }

                setDebugInfo(prev => prev + '\nFetching user data...');
                
                const response = await fetch("http://localhost:8000/user/getUser", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: userId })
                });

                setDebugInfo(prev => prev + `\nUser API Response status: ${response.status}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setDebugInfo(prev => prev + `\nUser data received: ${JSON.stringify(data)}`);
                
                if (!data.data.college) {
                    throw new Error("No college found in user data");
                }

                setCollege(data.data.college);
                setDebugInfo(prev => prev + `\nCollege set to: ${data.data.college}`);

            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(`User data error: ${err.message}`);
                setDebugInfo(prev => prev + `\nError in user fetch: ${err.message}`);
            }
        };

        fetchUserData();
    }, []);

    // Fetch cycles based on college
    useEffect(() => {
        const fetchCycles = async () => {
            if (!college) {
                setDebugInfo(prev => prev + '\nNo college set, skipping cycle fetch');
                return;
            }

            try {
                setDebugInfo(prev => prev + `\nFetching cycles for college: ${college}`);
                
                const response = await fetch("http://localhost:8000/cycle/getAllCycles", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ college: college })
                });

                setDebugInfo(prev => prev + `\nCycles API Response status: ${response.status}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const cycles = await response.json();
                setDebugInfo(prev => prev + `\nCycles received: ${JSON.stringify(cycles)}`);

                if (!Array.isArray(cycles.data)) {
                    throw new Error('Received data is not an array');
                }

                setMarkers(cycles.data);

            } catch (err) {
                console.error("Error fetching cycles:", err);
            }
        };

        fetchCycles();
    }, [college]);

    // Handle cycle coordinate update
    const handleUpdateCoordinates = (cycleId, newCoordinates) => {
        setMarkers((prevMarkers) =>
            prevMarkers.map((marker) =>
                marker._id === cycleId ? { ...marker, map: { ...marker.map, coordinates: newCoordinates } } : marker
            )
        );
    };

    return (
        <div style={containerStyles}>
            <MapContainer
                center={userLocation || defaultCenter}
                zoom={15}
                style={mapStyles}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap contributors'
                />
                <MapCenterControl center={userLocation || defaultCenter} />

                {/* Current user location marker */}
                {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                        <Popup>Your current location</Popup>
                    </Marker>
                )}

                {/* Render markers for cycles */}
                {markers.map((marker, index) => {
                    const hasValidCoordinates = marker.map.coordinates[0] && marker.map.coordinates[1];
                    console.log("Rendering marker:", marker.map?.coordinates?.[0]);

                    return hasValidCoordinates ? (
                        <Marker
                            key={index}
                            position={[marker.map.coordinates[1],marker.map.coordinates[0] ]}
                            icon={bicycleIcon}
                        >
                            <Popup>
                                <CycleCard cycle={marker} />
                                {/* Button to update cycle coordinates */}
                                <button
                                    onClick={() =>
                                        handleUpdateCoordinates(marker._id, { lat: marker.map.coordinates[0] + 0.001, lng: marker.map.coordinates[1] + 0.001 })
                                    }
                                >
                                    Update Coordinates
                                </button>
                            </Popup>
                        </Marker>
                    ) : null;
                })}
            </MapContainer>
        </div>
    );
}

export default Rentcycle;
