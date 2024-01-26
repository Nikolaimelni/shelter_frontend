import React, { useState } from 'react';
import axios from 'axios';
import '../../ShelterCards.css';

const CitySearch = () => {
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [radius, setRadius] = useState(30000);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pet-shelter-8e7e5463f1bc.herokuapp.com/shelter/find_places_in_city`, {
        params: { city: city, radius: radius }
      });
      const uniqueResults = filterUniquePlaces(response.data);
      setResults(uniqueResults);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResults([]);
    }
  };

  // Функция для фильтрации уникальных мест
  const filterUniquePlaces = (places) => {
    const uniquePlaces = [];
    const uniquePlaceNames = new Set();

    places.forEach(place => {
      if (!uniquePlaceNames.has(place.name)) {
        uniquePlaces.push(place);
        uniquePlaceNames.add(place.name);
      }
    });

    return uniquePlaces;
  };

  return (
    <div>
      <div className='search-container'>
        <input 
          type="number" 
          value={radius} 
          onChange={(e) => setRadius(e.target.value)} 
          placeholder="Enter radius in meters"
        />
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
        />
        <button onClick={handleSearch} className='button'>Search</button>
        <p>total {results.length} shelters in {radius / 1000} km from {city}</p>
      </div>
      <div className="shelters-container">
        {results.map((place, index) => (
          <div key={index} className="shelter-card">
            {place.photo_url && (
              <img 
                src={place.photo_url} 
                alt={place.name}
                className='shelters-photo'
              />
            )}
            <h2>{place.name}</h2>
            <p>{place.vicinity || place.formatted_address}</p>

            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitySearch;
