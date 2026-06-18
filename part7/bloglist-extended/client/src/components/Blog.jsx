import { Box, TableContainer, Paper, Typography, Button } from "@mui/material";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";
import useBlogContext from "../hooks/useBlogContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useBlogContext();

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.del,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  if (!blog) return <NotFound />;

  const handleLikeUpdate = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlogMutation.mutate(updatedBlog);
  };

  const handleDeleteBlog = (blog) => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );
    if (confirmed) {
      deleteBlogMutation.mutate(blog.id);
      navigate("/");
    }
  };

  const verifyForDeletion = () => {
    if (!user) return;
    if (user.username === blog.user.username) {
      return (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDeleteBlog(blog)}
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
              onClick={() => handleLikeUpdate(blog)}
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
