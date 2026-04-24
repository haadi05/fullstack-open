import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogsArray, setBlogsArray }) => {
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

    const newBlogsArray = blogsArray.map((blog) => {
      if (blog.id === updatedBlog.id) {
        return updatedBlog;
      } else {
        return blog;
      }
    });

    setBlogsArray(newBlogsArray);
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
