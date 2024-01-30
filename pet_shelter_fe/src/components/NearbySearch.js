import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


const NearbySearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [radius, setRadius] = useState(30);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { t } = useTranslation();

  const handleSearch = async () => {
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
        setSearchPerformed(true)
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
    <div className="container mx-auto p-4">
      <div className="space-y-4 md:w-1/2 md:mx-auto">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {t('citySearch.enterSearchRadius')}
          </label>
          <input 
            type="number" 
            value={radius} 
            onChange={(e) => setRadius(e.target.value)} 
            placeholder={t('citySearch.enterSearchRadius')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button onClick={handleSearch} disabled={loading} className={`w-full bg-main-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {t('citySearch.searchButton')}
        </button>
        {searchPerformed && (
          <p className="text-gray-600">
            {t('nearbySearch.totalShelters', { count: results.length, radius: radius })}
          </p>
        )}
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
              {t('nearbySearch.viewOnGoogleMaps')}              
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbySearch;
