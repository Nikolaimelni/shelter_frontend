import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CitySearch = () => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [radius, setRadius] = useState(30);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { t } = useTranslation();
  const [shouldLoadSuggestions, setShouldLoadSuggestions] = useState(true);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        if (city.length > 2 && shouldLoadSuggestions) {
          const response = await axios.get(`https://nikolaimelni.pythonanywhere.com/shelter/autocomplete`, {
            params: { input: city }
          });
          setSuggestions(response.data.predictions);
        }
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    };
  
    loadSuggestions();
  }, [city, shouldLoadSuggestions]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://nikolaimelni.pythonanywhere.com/shelter/find_places_in_city`, {
        params: { city: city, radius: radius * 1000 }
      });
      const uniqueResults = filterUniquePlaces(response.data);
      setResults(uniqueResults);
      setSearchPerformed(true)
    } catch (error) {
      console.error('Error fetching data: ', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

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


  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.description);
    setSuggestions([]);
    setShouldLoadSuggestions(false);
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
        <div className="relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {t('citySearch.enterCity')}
          </label>
          <input 
            type="text" 
            value={city} 
            onChange={(e) => {
              setCity(e.target.value);
              setShouldLoadSuggestions(true);
            }} 
            placeholder={t('citySearch.enterCity')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="absolute w-full z-10 bg-white mt-1 rounded-b">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="cursor-pointer p-2 border-t border-gray-200" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleSearch} disabled={loading} className={`w-full bg-main-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {t('citySearch.searchButton')}
        </button>
        {searchPerformed && (
          <p className="text-gray-600">
            {t('citySearch.totalShelters', { count: results.length, radius: radius, city: city })}
          </p>
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((place, index) => (
          <div key={index} className="rounded overflow-hidden shadow-lg p-4">
            {place.photo_url && (
              <img
                src={place.photo_url}
                alt={place.name}
                className='w-auto max-h-28 md:max-h-56 lg:max-h-76 mx-auto mb-2'
              />
            )}
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{place.name}</div>
              <p className="text-gray-700 text-base">
                {place.vicinity || place.formatted_address}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 visited:text-purple-600"
              >
                {t('citySearch.viewOnGoogleMaps')}              
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitySearch;
