import React, { useState } from "react";
import blogService from "../services/blogs";

const AddBlog = ({ blogs, setBlogs, setNotification, togglableRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlogHandler = async (event) => {
    event.preventDefault();
    togglableRef.current.toggleVisibility();

    try {
      const returnedBlog = await blogService.post({ title, author, url });
      setBlogs(blogs.concat(returnedBlog));

      setNotification(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setNotification("");
      }, 3000);

      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.error("error: ", error);
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlogHandler}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <br />
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
          <br />
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AddBlog;
