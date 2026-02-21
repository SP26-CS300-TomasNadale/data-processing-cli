import axios from "axios";

export const getWeatherData = async (city) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    console.log("Loaded API key:", apiKey);

    if (!apiKey) {
      throw new Error("Weather API key is missing in .env file");
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    return {
      city: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      weather: response.data.weather[0].description,
    };

  } catch (error) {
    if (error.response) {
      throw new Error(
        `Weather API Error: ${error.response.status} - ${error.response.statusText}`
      );
    }

    throw new Error("Network error while fetching weather data");
  }
};