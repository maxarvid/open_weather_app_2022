import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [temp, setTemp] = useState([]);
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      setCoords(position.coords);
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e0d0090eefe430f7b4c290e6d89e54d6
        `
      );
      setTemp(weatherResponse.data.main.temp);
      const locationResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=6863bb1917ca41a794074a0d4ab129b8`
      );
      setCity(locationResponse.data.results[0].components.city);
    });
  }, []);

  return (
    <div data-cy="weather-display">
      <h4 data-cy="temp" data-testid="temp">
        Temperature: {temp}°C
      </h4>
      <h4 data-cy="city" data-testid="city">
        City: {city}{" "}
      </h4>
      <p data-cy="coords" data-testid="coords">
        You are at latitude {coords.latitude} and longitude {coords.longitude}
      </p>
    </div>
  );
};

export default App;
