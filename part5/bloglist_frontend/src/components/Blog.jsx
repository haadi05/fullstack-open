import Notification from "./Notification";

const Blog = ({
  blog,
  user,
  handleLikeUpdate,
  handleDeleteBlog,
  errorMsg,
  notification,
}) => {
  // const [toggleFullView, setToggleFullView] = useState(false);

  if (!blog) return;

  const verifyForDeletion = () => {
    if (!user) return;
    if (user.username === blog.user.username) {
      return (
        <button style={{ color: "red" }} onClick={handleDeleteBlog}>
          delete
        </button>
      );
    }
  };

  return (
    <>
      <Notification errorMsg={errorMsg} notification={notification} />
      <div style={{ margin: "8px", padding: "4px", border: "1px solid black" }}>
        <div className="fullView">
          {blog.title} by {blog.author}
          <br />
          <a target="_blank" href={`https://${blog.url}`}>
            {blog.url}
          </a>
          <br />
          likes {blog.likes} <button onClick={handleLikeUpdate}>like</button>
          <br />
          {`Added by ${blog.user.username}`}
          <br />
          {verifyForDeletion()}
        </div>
      </div>
    </>
  );
};

export default Blog;
