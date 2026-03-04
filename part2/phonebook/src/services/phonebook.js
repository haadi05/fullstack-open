import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (newobject) => {
  const request = axios.post(baseUrl, newobject);
  return request.then((res) => res.data);
};

const update = (id, changedObj) => {
  const request = axios.put(`${baseUrl}/${id}`, changedObj);
  return request.then((res) => res.data);
};

const del = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};

export default {
  getAll,
  create,
  update,
  del,
};
