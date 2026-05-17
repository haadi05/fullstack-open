import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const getBlogs = async () => {
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      if (error.toString().includes("401")) {
        setErrorMsg("wrong username or password");
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
    }
  };

  const handleLikeUpdate = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    blogService.update(updatedBlog);
    const newBlogsArray = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog,
    );

    setBlogs(newBlogsArray);
  };

  const handleDeleteBlog = (blog) => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );

    if (confirmed) {
      blogService.del(blog.id);
      const blogsArrayAfterDel = blogs.filter((b) => b.id !== blog.id);
      setBlogs(blogsArrayAfterDel);
      navigate("/");
    }
  };

  const createBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.post(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      navigate("/");
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/");
  };

  const match = useMatch("/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const padding = { padding: 5 };

  return (
    <>
      <Link style={padding} to="/">
        blogs
      </Link>

      {user && (
        <Link style={padding} to="/create">
          new blog
        </Link>
      )}

      {user ? (
        <button onClick={handleLogout}>logout</button>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              notification={notification}
              errorMsg={errorMsg}
              blogs={blogs}
              handleLikeUpdate={handleLikeUpdate}
              handleDeleteBlog={handleDeleteBlog}
              setNotification={setNotification}
            />
          }
        ></Route>
        <Route
          path="/create"
          element={
            <BlogForm
              setNotification={setNotification}
              createBlog={createBlog}
            />
          }
        >
          new blog
        </Route>
        <Route
          path="/login"
          element={
            <LoginForm
              user={user}
              notification={notification}
              errorMsg={errorMsg}
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
            />
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <Blog
              blog={blog}
              user={user}
              handleLikeUpdate={() => handleLikeUpdate(blog)}
              handleDeleteBlog={() => handleDeleteBlog(blog)}
            />
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
