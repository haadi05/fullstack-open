const Blog = require("../models/blog");
const User = require("../models/user");
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { userExtractor } = require("../utils/middleware");

//read
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

//create
blogsRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const user = request.user;

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

    const populatedBlog = await savedBlog.populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });

    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();

    response.status(201).json(populatedBlog);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "token invalid" });
    }
  }
});

//delete
blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  try {
    const user = request.user;

    const BlogfromUrl = await Blog.findById(request.params.id);
    const BlogCreatorId = BlogfromUrl.user.toString();

    if (BlogCreatorId !== user.id) {
      return response.status(401).json({ error: "unauthorized user" });
    }

    await Blog.findByIdAndDelete(BlogfromUrl.id);
    response.status(204).end();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "token invalid" });
    }
  }
});

//update
blogsRouter.put("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  blog.title = request.body.title;
  blog.author = request.body.author;
  blog.url = request.body.url;
  blog.likes = request.body.likes;
  blog.user = request.body.user.id;

  const updatedBlog = await blog.save();
  response.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
