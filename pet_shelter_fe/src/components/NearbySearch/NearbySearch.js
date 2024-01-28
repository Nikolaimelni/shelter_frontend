import React, { useState } from 'react';
import axios from 'axios';

const NearbySearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [radius, setRadius] = useState(30);

  const handleFindNearby = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(`https://pet-shelter-8e7e5463f1bc.herokuapp.com/shelter/find_places_nearby`, {
          params: { lat: latitude, lng: longitude, radius: radius * 1000 } 
        });
        const uniqueResults = filterUniquePlaces(response.data);
        setResults(uniqueResults);
      } catch (error) {
        console.error('Error fetching nearby shelters: ', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, () => {
      alert('Unable to retrieve your location');
      setLoading(false);
    });
  };

  const filterUniquePlaces = (places) => {
    const uniquePlaces = [];
    const uniquePlaceNames = new Set();

    places.forEach((place) => {
      if (!uniquePlaceNames.has(place.name)) {
        uniquePlaces.push(place);
        uniquePlaceNames.add(place.name);
      }
    });

    return uniquePlaces;
  };

  return (
    <div>
      <div className="flex flex-wrap justify-between max-w-6xl mx-auto mt-5 gap-4">
        <label className="flex flex-col mb-4" style={{ padding: '20px' }}>
          <span className="text-main-color mb-1">Enter search radius in kilometers</span>
          <input 
            type="number" 
            value={radius} 
            onChange={(e) => setRadius(e.target.value*1000)} 
            placeholder="Enter radius in kilometers"
            className="p-2 border border-gray-400 rounded border-main-color"
          />
        </label>
        <button onClick={handleFindNearby} disabled={loading} className="w-full lg:w-64 px-4 py-2 justify-center items-center rounded-lg bg-button-gradient text-white text-2xl font-semibold">
          {loading ? 'Loading...' : 'Find Shelters Nearby'}
        </button>
        <p className="mt-4">Total {results.length} shelters within {radius} km from your location</p>
      </div>
      <div className="flex flex-wrap justify-center max-w-6xl mx-auto mt-5 gap-4">
        {results.map((place, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 p-2 border border-main-color rounded text-center mb-5">
            {place.photo_url && (
              <img
                src={place.photo_url}
                alt={place.name}
                className='w-auto max-h-28 md:max-h-56 lg:max-h-76 mx-auto mb-2'
              />
            )}
            <h2 className="text-xl font-semibold">{place.name}</h2>
            <p>{place.vicinity || place.formatted_address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              View on Google Maps
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbySearch;
