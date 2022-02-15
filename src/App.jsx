import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let { latitude, longitude } = position.coords;
      setCoords([latitude, longitude]);
      debugger;
      // Query API to get location
      
      // Query the Weather API to get temperature
    });
  }, []);

  return (
    <div data-cy="weather-display">
      <h4 data-cy="temp">Temperature: </h4>
      <h4 data-cy="city">City: </h4>
    </div>
  );
};

export default App;
