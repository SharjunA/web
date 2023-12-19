// MapComponent.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ onLocationSelect }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (e) => {
    setSelectedLocation(e.latlng);
    onLocationSelect(e.latlng);
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100px', width: 'full' }} onClick={handleMapClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedLocation && (
        <Marker position={selectedLocation}>
          <Popup>
            Selected Location: <br /> Lat: {selectedLocation.lat}, Lng: {selectedLocation.lng}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
