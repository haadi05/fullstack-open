import { TextField, Button } from "@mui/material";
import useBlogContext from "../hooks/useBlogContext";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import useField from "../hooks/useField";

const BlogForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { dispatch } = useBlogContext();

  const [title, setTitle] = useField("text", "title");
  const [author, setAuthor] = useField("text", "author");
  const [url, setUrl] = useField("text", "url");

  const newBlogMutation = useMutation({
    mutationFn: blogService.post,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

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

    createBlog({ title: title.value, author: author.value, url: url.value });

    dispatch({
      type: "SET",
      payload: {
        message: `a new blog ${title.value} by ${author.value} added`,
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
          <TextField {...title} required />
          <br />
          <TextField {...author} required />
          <br />
          <TextField {...url} required />
        </div>
        <Button type="submit" variant="contained" size="small">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
