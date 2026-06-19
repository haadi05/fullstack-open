const User = ({ blogUser }) => {
  return (
    <div>
      <h2 className="title">{blogUser.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
