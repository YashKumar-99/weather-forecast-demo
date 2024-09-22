import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(() => {
    const savedWeatherData = localStorage.getItem('weatherData');
    return savedWeatherData ? JSON.parse(savedWeatherData) : null;
  });
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState(() => {
    const savedCity = localStorage.getItem('lastCity');
    return savedCity ? savedCity : 'New York'; // Default city
  });
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);
  const apiKey = '0fc64baffea39eb668d5cc070c3d8d37';
  const fetchWeatherData = useCallback(async () => {
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
      console.log('Weather Response:', weatherResponse.data); // Log the weather response
  
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`);
      console.log('Forecast Response:', forecastResponse.data); // Log the forecast response
  
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data.list);
      setError(null);
      localStorage.setItem('lastCity', city);
      localStorage.setItem('weatherData', JSON.stringify(weatherResponse.data));
    } catch (err) {
      console.error('Error fetching weather data:', err); 
      setError('City not found or an error occurred.');
      setWeatherData(null);
      setForecastData([]);
    }
  }, [city, unit, apiKey]);
  

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const toggleUnit = () => {
    setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const refreshData = () => {
    fetchWeatherData();
  };

  const groupedForecast = {};
  forecastData.forEach(day => {
    const date = new Date(day.dt * 1000).toISOString().split('T')[0];
    if (!groupedForecast[date]) {
      groupedForecast[date] = {
        maxTemp: day.main.temp_max,
        minTemp: day.main.temp_min,
        icon: day.weather[0].icon,
        weekday: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })
      };
    } else {
      groupedForecast[date].maxTemp = Math.max(groupedForecast[date].maxTemp, day.main.temp_max);
      groupedForecast[date].minTemp = Math.min(groupedForecast[date].minTemp, day.main.temp_min);
    }
  });

  const forecastArray = Object.entries(groupedForecast).slice(0, 5).map(([date, data]) => ({
    date,
    ...data,
  }));

  return (
    <div className="app">
      <h1>Weather Forecast</h1>
      <SearchBar onSearch={setCity} />
      <button onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
      <button className="refresh-button" onClick={refreshData}>
        Refresh
      </button>
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherDisplay weatherData={weatherData} unit={unit} />}
      <div className="forecast">
        {forecastArray.map((day, index) => (
          <ForecastCard key={index} day={day} />
        ))}
      </div>
    </div>
  );
};

export default App;
