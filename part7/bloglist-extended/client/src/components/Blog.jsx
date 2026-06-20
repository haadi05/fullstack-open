import {
  Box,
  TableContainer,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";
import useBlogContext from "../hooks/useBlogContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useState } from "react";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useBlogContext();
  const [comment, setComment] = useState("");

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.del,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const addCommentMutation = useMutation({
    mutationFn: blogService.addComment,
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

  const handleAddComment = (event, blog) => {
    event.preventDefault();
    addCommentMutation.mutate({ comment, id: blog.id });
    setComment("");
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
        <Typography variant="h4">{blog.title}</Typography>

        <Typography
          variant="h6"
          color="textDisabled"
          sx={{ mb: 1 }}
        >{`by ${blog.author}`}</Typography>

        <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
          <a target="_blank" href={`https://${blog.url}`}>
            {blog.url}
          </a>
        </Typography>

        <Typography variant="body1" color="textDisabled" sx={{ mb: 1 }}>
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

        <br />

        <Typography variant="h6" color="textPrimary" sx={{ mb: 1 }}>
          comments
        </Typography>

        <form onSubmit={() => handleAddComment(event, blog)}>
          <TextField
            required
            placeholder="add a comment"
            style={{ marginBottom: 10, marginRight: 6 }}
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button type="submit" variant="contained" size="medium">
            Add Comment
          </Button>
        </form>

        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      </div>
    </TableContainer>
  );
};

export default Blog;
