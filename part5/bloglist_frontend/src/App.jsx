import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddBlog from "./components/AddBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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

  const togglableRef = useRef();
  // const addBlogRef = useRef();

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} errorMsg={errorMsg} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>

            <br />

            <label>
              password
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
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
        <AddBlog
          togglableRef={togglableRef}
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
        />
      </Togglable>

      <br />
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogsArray={blogs}
          setBlogsArray={setBlogs}
        />
      ))}
    </div>
  );
};

export default App;
