import axios from "axios";

const api_key = import.meta.env.VITE_SOME_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?appid=${api_key}&units=metric&q=`;

const getWeather = (city) => {
  return axios.get(`${url}${city}`).then((response) => {
    return response.data;
  });
};

export default getWeather;
