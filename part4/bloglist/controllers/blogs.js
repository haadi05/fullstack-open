const Blog = require("../models/blog");
const User = require("../models/user");
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken) {
      return response.status(401).json({ error: "token invalid" });
    }

    //using userID from return obj by jwt.verify
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return response.status(400).json({ error: "user missing or invalid" });
    } else {
      blog["user"] = user.id;
    }

    if (!blog.likes) {
      blog["likes"] = 0;
    }

    if (!blog.title || !blog.url) {
      response.status(400).end();
    }

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "token invalid" });
    }
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken) {
      return response.status(401).json({ error: "token invalid" });
    }

    const result = await Blog.findById(request.params.id);
    const UserIdFromBlog = result.user._id.toString();

    if (UserIdFromBlog !== decodedToken.id) {
      return response.status(401).json({ error: "unauthorized user" });
    }

    await Blog.findByIdAndDelete(result.id);
    response.status(204).end();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "token invalid" });
    }
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  blog.likes = request.body.likes;

  const updatedBlog = await blog.save();
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
