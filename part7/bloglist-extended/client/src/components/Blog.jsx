import { Box, TableContainer, Paper, Typography, Button } from "@mui/material";
import NotFound from "./NotFound";

const Blog = ({ blog, user, handleLikeUpdate, handleDeleteBlog }) => {
  if (!blog) return <NotFound />;

  const verifyForDeletion = () => {
    if (!user) return;
    if (user.username === blog.user.username) {
      return (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleDeleteBlog}
        >
          delete
        </Button>
      );
    }
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 10, padding: 10 }}>
      <div className="fullView">
        <Typography variant="h5">{blog.title}</Typography>

        <Typography
          variant="body1"
          color="textDisabled"
          sx={{ mb: 1 }}
        >{`by ${blog.author}`}</Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <a target="_blank" href={`https://${blog.url}`}>
            {blog.url}
          </a>
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          {`Added by ${blog.user.username}`}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mr: 1 }}
          >{`likes ${blog.likes}`}</Typography>

          {user && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleLikeUpdate}
              sx={{ mr: 1 }}
            >
              like
            </Button>
          )}

          {verifyForDeletion()}
        </Box>
      </div>
    </TableContainer>
  );
};

export default Blog;
