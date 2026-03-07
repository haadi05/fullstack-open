import axios from "axios";
const baseUrl =
  "https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flags,cca3";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

export default getAll;
