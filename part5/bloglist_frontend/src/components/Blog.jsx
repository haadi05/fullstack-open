import { useState } from "react";

const Blog = ({ blog }) => {
  const [toggleFullView, setToggleFullView] = useState(false);
  return (
    <div style={{ margin: "8px", padding: "4px", border: "1px solid black" }}>
      {toggleFullView ? (
        <div>
          {blog.title}{" "}
          <button onClick={() => setToggleFullView(false)}>hide</button>
          <br />
          {blog.url}
          <br />
          likes {blog.likes} <button>like</button>
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
