import React, { useState } from "react";
import loginService from "../services/blogs";

const AddBlog = ({ blogs, setBlogs, setNotification, togglableRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlogHandler = (event) => {
    event.preventDefault();
    togglableRef.current.toggleVisibility();
    loginService
      .post({ title, author, url })
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNotification(`a new blog ${title} by ${author} added`);
        setTimeout(() => {
          setNotification("");
        }, 3000);
        setTitle("");
        setAuthor("");
        setUrl("");
      })
      .catch((error) => console.error("error: ", error));
  };
  return (
    <>
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
    </>
  );
};

export default AddBlog;
