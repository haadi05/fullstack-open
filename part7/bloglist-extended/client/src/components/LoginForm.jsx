import { TextField, Button } from "@mui/material";
import Notification from "./Notification";

const LoginForm = ({
  user,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
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
