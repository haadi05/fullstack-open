import { TextField, Button } from "@mui/material";
import { useState } from "react";
import useBlogContext from "../hooks/useBlogContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const BlogForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { dispatch } = useBlogContext();

  const newBlogMutation = useMutation({
    mutationFn: blogService.post,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = async (newBlog) => {
    try {
      newBlogMutation.mutate(newBlog);
      navigate("/");
    } catch (error) {
      console.error("error: ", error);
    }
  };

  const addBlogHandler = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });

    dispatch({
      type: "SET",
      payload: {
        message: `a new blog ${title} by ${author} added`,
        type: "success",
      },
    });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 3000);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlogHandler}>
        <div>
          <TextField
            style={{ marginBottom: 10 }}
            size="small"
            placeholder="title"
            required
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          <TextField
            style={{ marginBottom: 10 }}
            size="small"
            placeholder="author"
            required
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <br />
          <TextField
            placeholder="url"
            style={{ marginBottom: 10 }}
            size="small"
            required
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <Button type="submit" variant="contained" size="small">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
