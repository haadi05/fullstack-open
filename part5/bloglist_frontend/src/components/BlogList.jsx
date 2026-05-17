import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogList = ({
  notification,
  errorMsg,
  blogs,
  togglableRef,
  createBlog,
  setNotification,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} errorMsg={errorMsg} />
      <Togglable reference={togglableRef}>
        <BlogForm setNotification={setNotification} createBlog={createBlog} />
      </Togglable>

      <br />

      <ul>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link
                to={`/${blog.id}`}
              >{`${blog.title} by ${blog.author}`}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BlogList;
