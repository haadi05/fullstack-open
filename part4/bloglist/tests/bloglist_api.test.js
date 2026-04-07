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

test.only("likes defaults to 0 if its missing", async () => {
  const newBlog = {
    id: "3a422bc61b54a676234d17fr",
    title: "Documentation",
    author: "Lee Robinson",
    url: "https://leerob.com/docs",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  assert.strictEqual("likes" in response.body, true);
  assert.strictEqual(response.body.likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
