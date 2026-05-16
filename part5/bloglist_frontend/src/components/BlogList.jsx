import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Notification from "./Notification";
import Togglable from "./Togglable";

const BlogList = ({
  notification,
  errorMsg,
  user,
  blogs,
  togglableRef,
  createBlog,
  handleLikeUpdate,
  handleDeleteBlog,
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
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            handleLikeUpdate={() => handleLikeUpdate(blog)}
            handleDeleteBlog={() => handleDeleteBlog(blog)}
          />
        ))}
    </div>
  );
};

export default BlogList;
