const { beforeEach, test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("bloglist returned correct amount of blog posts", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("unique identifier property of blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual("id" in response.body[0], true);
});

test("a blog post can be added", async () => {
  const newBlog = {
    id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 3,
  };

  await api.post("/api/blogs").send(newBlog);

  const blogsAfterPost = await helper.blogsFromDb();
  assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1);
});

after(async () => {
  await mongoose.connection.close();
});
