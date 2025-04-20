import './App.css';
import Weatherapi from './Component/Weatherapi';
import 'bootstrap/dist/css/bootstrap.min.css'
import Searchbar from './Component/Searchbar';
import { useState } from 'react';
import useWallpaper from './Component/useWallpaper';
import Forecastfive from './Component/Forecastfive';
import Weathercard from './Component/Weathercard';
import Chart from './Component/Chart';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState([]); 
  const [cityData, setCityData] = useState(null);     
  const BackGroundimage = useWallpaper(selectedCity);

  const handleInputCity = (city) => {
    setSelectedCity(city);
  };

  const handleWeatherUpdate = (weatherResult, cityInfo) => {
    setWeatherData(weatherResult);
    setCityData(cityInfo);
  };

  
  const currentData = weatherData.length > 0 ? weatherData[0] : null;

  return (
    <div className='app-wrapper'>
      <div
        className='app-background'
        style={{ backgroundImage: `url(${BackGroundimage})` }}
      >
        <div className="app-content row">
          <div className='order-0 col-md-4 charts'>
            <h4>charts</h4>
            {cityData && weatherData.length > 0 ? (
              <Chart
                listData={weatherData}
                cities = {cityData}
              />
            ) : (
              <p className="text-light">No Data yet!</p>
            )}
            
          </div>

          <div className='order-1 col-md-4 inputcity'>
            <Searchbar onSearch={handleInputCity} />

            {cityData && currentData ? (
              <Weathercard
                cities={cityData}
                currentData={currentData}
              />
            ) : (
              <p className="text-light">No Data yet!</p>
            )}
          </div>

          <div className='order-2 col-md-4 forecast'>
            <h4>forecast of next 5 days</h4>
            {cityData && weatherData.length > 0 ? (
              <Forecastfive
                listData={weatherData}
                cities={cityData}
              />
            ) : (
              <p className="text-light">No Data yet!</p>
            )}
          </div>

          <Weatherapi
            cities={selectedCity}
            onDataFetched={handleWeatherUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
