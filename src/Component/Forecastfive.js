import React from 'react';

function Forecastfive({ listData, cities }) {
  if (!listData || listData.length === 0) return null;

  const dailyForecast = [];
  const seenDates = new Set();

  listData.forEach(item => {
    const [date] = item.dt_txt.split(' ');
    if (!seenDates.has(date)) {
      seenDates.add(date);
      dailyForecast.push(item);
    }
  });

  return (
    <div className="forecastfive-container">
      <div className="city-header">
        <h5>{cities.name}, {cities.country}</h5>
      </div>

      <div className="forecastfive-cards">
        {dailyForecast.slice(0, 5).map((item, idx) => {
          const [date, time] = item.dt_txt.split(' ');
          const iconCode = item.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          return (
            <div key={idx} className="forecastfive-card">
              <div className="forecastfive-date">{date}</div>
              <div className="forecastfive-time">{time}</div>
              <img
                src={iconUrl}
                alt={item.weather[0].description}
                className="forecastfive-icon"
              />
              <div className="forecastfive-description">
                {item.weather[0].description}
              </div>
              <div className="forecastfive-temp">
                🌡️ {Math.round(item.main.temp)}°C
              </div>
              <div className="forecastfive-humidity">
                💧  {item.main.humidity}%
              </div>
              <div className="forecastfive-wind">
                🌬️ {item.wind.speed} m/s
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecastfive;
