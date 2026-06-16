import { Link } from "react-router-dom";
import Notification from "./Notification";

const BlogList = ({ notification, errorMsg, blogs }) => {
  return (
    <div>
      <Notification notification={notification} errorMsg={errorMsg} />
      <h2 className="title">blogs</h2>
      <br />
      <ul className="list">
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
