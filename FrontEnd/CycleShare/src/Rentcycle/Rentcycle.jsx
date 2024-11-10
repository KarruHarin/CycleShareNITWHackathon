import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CycleCard from '../Card/Card';
import { userContext } from '../Context/userContext';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/marker-icon-2x.png',
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
});

const useLocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setError(null);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setError(error.message);
                },
                { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            setError("Geolocation is not supported by your browser");
        }
    }, []);

    return { location, error };
};

// Custom markers
const bicycleIcon = new L.Icon({
    iconUrl: '/bicycle.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
});

const userIcon = new L.Icon({
    iconUrl: '/placeholder.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38]
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
    const { location, error: locationError } = useLocation();
    const { user } = useContext(userContext);
    const [college, setCollege] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [error, setError] = useState(null);
    const defaultCenter = { lat: 51.505, lng: -0.09 }; // Default to London

    useEffect(() => {
        const userId = localStorage.getItem('id');
        if (!userId) {
            setError("User ID not found");
            return;
        }

        fetch("http://localhost:8000/user/getUser", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: userId })
        })
        .then((res) => {
            if (!res.ok) throw new Error('Failed to fetch user data');
            return res.json();
        })
        .then((data) => setCollege(data.college))
        .catch((err) => setError(err.message));
    }, []);

    useEffect(() => {
        if (college) {
            console.log("college = ",college)
            fetch("http://localhost:8000/cycle/getAllCycles", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ college: college })
            })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch cycles');
                return res.json();
            })
            .then((cycles) =>{ 
                console.log(cycles)
                setMarkers(cycles)})
            .catch((err) => setError(err.message));
        }
    }, [college]);

    if (locationError) {
        return <div className="error-message">Error getting location: {locationError}</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <MapContainer
                center={location || defaultCenter}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {location && (
                    <>
                        <MapCenterControl center={location} />
                        <Marker position={[location.lat, location.lng]} icon={userIcon}>
                            <Popup>Your current location</Popup>
                        </Marker>
                    </>
                )}

                {markers.map((marker, index) => (
                    <Marker
                        key={marker.id || index}
                        position={[marker.lat, marker.lng]}
                        icon={bicycleIcon}
                    >
                        <Popup>
                            {marker.description || <CycleCard cycleData={marker} />}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Rentcycle;