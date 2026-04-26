import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const post = (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

const update = (updatedBlog) => {
  const request = axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
  return request.then((response) => response.data);
};

const del = (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${blogId}`, config);
  return request.then((response) => response.data);
};

export default { getAll, post, update, del, setToken };
