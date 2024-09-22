import React from 'react';

const ForecastCard = ({ day }) => {
  return (
    <div className="forecast-card">
      <h3>{day.weekday}</h3>
      <p>High: {Math.round(day.maxTemp)}°</p>
      <p>Low: {Math.round(day.minTemp)}°</p>
      <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} alt="weather icon" />
    </div>
  );
};

export default ForecastCard;
