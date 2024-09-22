import React from 'react';

const WeatherDisplay = ({ weatherData, unit }) => {
  if (!weatherData) {
    return null; 
  }

  return (
    <div className="weather-display">
      <h2>{weatherData.name}</h2>
      <p>{Math.round(weatherData.main.temp)}° {unit === 'metric' ? 'C' : 'F'}</p>
      <p>{weatherData.weather[0].description}</p>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
    </div>
  );
};

export default WeatherDisplay;
