import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import io from 'socket.io-client';
import L, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Rentcycle.css'
import CycleCard from '../Card/Card';



// Custom hook for location updatesgit
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




// Custom markers
const bicycleIcon = new Icon({
    iconUrl: '/bicycle.png', // Make sure to add these images to your public folder
    iconSize: [38, 38]
});

const userIcon = new Icon({
    iconUrl: '/placeholder.png', // Make sure to add these images to your public folder
    iconSize: [38, 38]
});

// Map center update component
const MapCenterControl = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, 15);
        }
    }, [center, map]);
    return null;
};

  
function Rentcycle() {
    const userLocation = useLocation();
    const markers = [
        {
            position: [17.987004, 79.533027],
            type: 'cycle',
            popup: "hello this is user popup"
        },
        {
            position: [17.979697, 79.532569],
            type: 'cycle',
            popup:<CycleCard  /> 
        }
    ];


    if (!userLocation) {
        return <div>Loading location...</div>;
    }

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <MapContainer
                center={userLocation}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© OpenStreetMap contributors'
                />
                <MapCenterControl center={userLocation} />
                
                {/* Current user location marker */}
                <Marker
                    position={[userLocation.lat, userLocation.lng]}
                    icon={userIcon}
                >
                    <Popup>Your current location</Popup>
                </Marker>

                {/* Other markers */}
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        icon={marker.type === 'cycle' ? bicycleIcon : userIcon}
                    >
                        <Popup>{marker.popup}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Rentcycle    ;