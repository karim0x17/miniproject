import React,{useState,useEffect} from 'react';
import axios from 'axios';

function Weatherapi({ cities, onDataFetched }) {
    const [Error, setError] = useState('NULL');
  
    const weatherapi = process.env.REACT_APP_OPENWEATHERAPP_KEY;
    let limitsearch = 5;
    let unitCelsius = 'metric';
  
    useEffect(() => {
      if (!cities) return;
      const fetchDataWeather = async () => {
        try {
          const geoResponse = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
            params: {
              q: cities,
              appid: weatherapi,
              limit: limitsearch
            }
          });
  
          if (geoResponse.data.length === 0) {
            setError('City not found.');
            return;
          }
  
          const { lat, lon } = geoResponse.data[0];
          const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
              lat,
              lon,
              appid: weatherapi,
              units: unitCelsius
            }
          });
  
          const { city, list } = weatherResponse.data;
          console.log(city)
          console.log(list)
          if (onDataFetched) {
            onDataFetched(list, city); // pass both to App city(contry o name) list(data lokhra dyal weather)
          }
        } catch (err) {
          console.log(err);
          setError('Failed to fetch weather data.');
        }
      };
  
      fetchDataWeather();
    }, [cities]);
  
    return <></>;
  }
  export default Weatherapi;