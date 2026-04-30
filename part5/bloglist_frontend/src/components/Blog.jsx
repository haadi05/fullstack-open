import { useState } from "react";

const Blog = ({ blog, user, handleLikeUpdate, handleDeleteBlog }) => {
  const [toggleFullView, setToggleFullView] = useState(false);

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
