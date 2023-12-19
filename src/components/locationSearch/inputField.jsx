// LocationInput.js
import React, { useState } from 'react';

const LocationInput = ({ onLocationSelect }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectLocation = () => {
    // Parse the input value (assuming it's in the format "lat, lng")
    const [lat, lng] = inputValue.split(',').map((coord) => parseFloat(coord.trim()));

    if (!isNaN(lat) && !isNaN(lng)) {
      onLocationSelect({ lat, lng });
    } else {
      alert('Invalid location format. Please use "lat, lng".');
    }
  };

  return (
    <div>
      <label>
        Enter Location (lat, lng):
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button onClick={handleSelectLocation}>Select Location</button>
    </div>
  );
};

export default LocationInput;
