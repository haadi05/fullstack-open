import Notification from "./Notification";

const LoginForm = ({
  notification,
  errorMsg,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
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
};

export default LoginForm;
