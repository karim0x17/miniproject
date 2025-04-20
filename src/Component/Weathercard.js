import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Weathercard({ cities, currentData }) {
  if (!cities || !currentData) return null;

  // City info
  const {
    name,
    country,
    coord: { lat, lon },
    sunrise,
    sunset
  } = cities;

 
  const {
    dt_txt,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    weather,
    wind: { speed, deg },
    clouds: { all: cloudiness },
    visibility
  } = currentData;

  const iconCode = weather[0].icon;
  const description = weather[0].description;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const formatTime = ts =>
    new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatDateTime = dt => {
    const [date, time] = dt.split(' ');
    return `${date} ${time.slice(0,5)}`;
  };

  return (
    <div className="card weather-widget text-light ">
      <div className="widget-header text-center py-2">
        <h5 className="mb-1">{name}, {country}</h5>
        <small className="text-muted">{formatDateTime(dt_txt)}</small>
      </div>

      <div className="card-body p-3">
        <div className="row align-items-center">
          <div className="col-4 text-center">
            <img src={iconUrl} alt={description} className="weather-icon mb-2" />
            <div className="text-capitalize description">{description}</div>
          </div>
          <div className="col-8">
            <div className="metrics">
              <div className="metric-row">
                <strong>🌡️ Temp:</strong> {Math.round(temp)}°C 
                <small> (min {Math.round(temp_min)}° / max {Math.round(temp_max)}°)</small>
              </div>
              <div className="metric-row">
                <strong>🤗 Feels like:</strong> {Math.round(feels_like)}°C
              </div>
              <div className="metric-row">
                <strong>💧 Humidity:</strong> {humidity}%
              </div>
              <div className="metric-row">
                <strong>💨 Wind:</strong> {speed} m/s @ {deg}°
              </div>
              <div className="metric-row">
                <strong>☁️ Clouds:</strong> {cloudiness}%
              </div>
              <div className="metric-row">
                <strong>🔭 Visibility:</strong> {visibility} m
              </div>
              <div className="metric-row">
                <strong>📍 Coordinates:</strong> {lat.toFixed(2)}, {lon.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <hr className="bg-secondary" />

        <div className="row text-center">
          <div className="col">
            <strong>🌅 Sunrise:</strong> {formatTime(sunrise)}
          </div>
          <div className="col">
            <strong>🌇 Sunset:</strong> {formatTime(sunset)}
          </div>
        </div>
      </div>
    </div>
  );
}
