import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
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
    }
  };

  const togglableRef = useRef();

  const createBlog = async (newBlog) => {
    togglableRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.post(newBlog);
      setBlogs(blogs.concat(returnedBlog));
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          notification={notification}
          errorMsg={errorMsg}
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} errorMsg={errorMsg} />
          <p>
            {user.username} logged in
            <button
              onClick={() => {
                window.localStorage.removeItem("loggedInUser");
                setUser(null);
              }}
            >
              logout
            </button>
          </p>

          <Togglable reference={togglableRef}>
            <BlogForm
              setNotification={setNotification}
              createBlog={createBlog}
            />
          </Togglable>

          <br />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                handleLikeUpdate={() => handleLikeUpdate(blog)}
                handleDeleteBlog={() => handleDeleteBlog(blog)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
