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
    };

    blogService.update(updatedBlog);

    const newBlogsArray = blogsArray.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog,
    );

    setBlogsArray(newBlogsArray);
  };

  const handleDeleteBlog = (event) => {
    event.preventDefault();

    const confirmed = window.confirm("delete this blog?");
    if (confirmed) {
      blogService.del(blog.id);
    }

    const blogsArrayAfterDel = blogsArray.filter((b) => b.id !== blog.id);

    setBlogsArray(blogsArrayAfterDel);
  };

  return (
    <div style={{ margin: "8px", padding: "4px", border: "1px solid black" }}>
      {toggleFullView ? (
        <div>
          {blog.title}{" "}
          <button onClick={() => setToggleFullView(false)}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button onClick={handleLikeUpdate}>like</button>
          <br />
          {blog.author}
          <br />
          {user.username === blog.user.username ? (
            <button style={{ color: "red" }} onClick={handleDeleteBlog}>
              delete
            </button>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>
          {blog.title}{" "}
          <button onClick={() => setToggleFullView(true)}>show</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
