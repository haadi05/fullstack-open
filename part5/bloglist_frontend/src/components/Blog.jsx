import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, blogsArray, setBlogsArray }) => {
  const [toggleFullView, setToggleFullView] = useState(false);

  const handleLikeUpdate = (event) => {
    event.preventDefault();

    const updatedBlog = {
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user,
    };

    blogService.update(updatedBlog);

    const newBlogsArray = blogsArray.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog,
    );

    setBlogsArray(newBlogsArray);
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );

    if (confirmed) {
      blogService.del(blog.id);
    }

    const blogsArrayAfterDel = blogsArray.filter((b) => b.id !== blog.id);
    setBlogsArray(blogsArrayAfterDel);
  };

  const verifyForDeletion = () => {
    if (user.username === blog.user.username) {
      return (
        <button style={{ color: "red" }} onClick={handleDeleteBlog}>
          delete
        </button>
      );
    }
  };

  return (
    <div style={{ margin: "8px", padding: "4px", border: "1px solid black" }}>
      {toggleFullView ? (
        <div className="fullView">
          {blog.title} by {blog.author}
          <button onClick={() => setToggleFullView(false)}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={handleLikeUpdate}>like</button>
          <br />
          {blog.user.username}
          <br />
          {verifyForDeletion()}
        </div>
      ) : (
        <div className="partialView">
          {blog.title} by {blog.author}
          <button onClick={() => setToggleFullView(true)}>show</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
