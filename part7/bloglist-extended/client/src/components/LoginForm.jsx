import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

import Notification from "./Notification";
import loginService from "../services/login";
import blogService from "../services/blogs";
import useBlogContext from "../hooks/useBlogContext";

const LoginForm = () => {
  const {
    dispatch,
    user,
    setUser,
    username,
    setUsername,
    password,
    setPassword,
  } = useBlogContext();

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
        dispatch({
          type: "SET",
          payload: {
            message: "wrong username or password",
            type: "error",
          },
        });
        setTimeout(() => {
          dispatch({ type: "CLEAR" });
        }, 3000);
      }
    }
  };

  return (
    <>
      {user ? (
        <p>{user.username} is currently logged in</p>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <Notification />
          <form onSubmit={handleLogin}>
            <div>
              <TextField
                placeholder="username"
                style={{ marginBottom: 10 }}
                size="small"
                type="text"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

              <br />

              <TextField
                placeholder="password"
                style={{ marginBottom: 10 }}
                size="small"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <Button type="submit" variant="contained" size="small">
              login
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
