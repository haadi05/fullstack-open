import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import { ErrorBoundary } from "react-error-boundary";

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

  const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={style}>
            blogs
          </Button>

          {user && (
            <Button color="inherit" component={Link} to="/create" sx={style}>
              new blog
            </Button>
          )}

          {user ? (
            <Button color="inherit" sx={style} onClick={handleLogout}>
              logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login" sx={style}>
              login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={<h3>Oops something went wrong</h3>}>
              <BlogList
                notification={notification}
                errorMsg={errorMsg}
                blogs={blogs}
                handleLikeUpdate={handleLikeUpdate}
                handleDeleteBlog={handleDeleteBlog}
                setNotification={setNotification}
              />
            </ErrorBoundary>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <ErrorBoundary fallback={<h3>Oops something went wrong</h3>}>
              <BlogForm
                setNotification={setNotification}
                createBlog={createBlog}
              />
            </ErrorBoundary>
          }
        >
          new blog
        </Route>
        <Route
          path="/login"
          element={
            <ErrorBoundary fallback={<h3>Oops something went wrong</h3>}>
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
            </ErrorBoundary>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <ErrorBoundary fallback={<h3>Oops something went wrong</h3>}>
              <Blog
                blog={blog}
                user={user}
                handleLikeUpdate={() => handleLikeUpdate(blog)}
                handleDeleteBlog={() => handleDeleteBlog(blog)}
              />
            </ErrorBoundary>
          }
        ></Route>
      </Routes>
    </Container>
  );
};

export default App;
