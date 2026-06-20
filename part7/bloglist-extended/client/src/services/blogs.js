import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const post = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog);
  return response.data;
};

const del = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

const getUser = async () => {
  const response = await axios.get("/api/users");
  return response.data;
};

const addComment = async ({ comment, id }) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment });
  return response.data;
};

export default { getAll, post, update, del, setToken, getUser, addComment };
