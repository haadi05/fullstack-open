import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom";

import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import NotFound from "./components/NotFound";
import blogService from "./services/blogs";
import useBlogContext from "./hooks/useBlogContext";
import { getUser, removeUser } from "./services/persistentUser";

const App = () => {
  const navigate = useNavigate();
  const match = useMatch("/:id");
  const { user, setUser } = useBlogContext();

  useEffect(() => {
    const loggedInUserJson = getUser();
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (result.isPending) {
    return <div>Loading data...</div>;
  }
  const blogs = result.data;
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  const handleLogout = () => {
    removeUser();
    setUser(null);
    navigate("/");
  };

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
              <BlogList blogs={blogs} />
            </ErrorBoundary>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <ErrorBoundary fallback={<h3>Oops something went wrong</h3>}>
              <BlogForm />
            </ErrorBoundary>
          }
        >
          new blog
        </Route>
        <Route
          path="/login"
          element={
            <ErrorBoundary fallback={<h3>Oops something went wrong</h3>}>
              <LoginForm />
            </ErrorBoundary>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <ErrorBoundary fallback={<h3>Oops something went wrong</h3>}>
              <Blog blog={blog} />
            </ErrorBoundary>
          }
        ></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </Container>
  );
};

export default App;
