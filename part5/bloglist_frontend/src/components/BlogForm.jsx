import { useState } from "react";

const BlogForm = ({ setNotification, createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlogHandler = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });

    setNotification(`a new blog ${title} by ${author} added`);
    setTimeout(() => {
      setNotification("");
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
          <label>
            title
            <input
              required
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <br />
          <label>
            author
            <input
              required
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
          <br />
          <label>
            url
            <input
              required
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

export default BlogForm;
