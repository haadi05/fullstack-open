import { useEffect, useState } from "react";
import getWeather from "../services/weather";

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getWeather(city).then((returned) => {
      setWeather(returned);
      setloading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </>
  );
};

export default Weather;
