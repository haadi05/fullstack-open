const { beforeEach, test, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper2");
const app = require("../app");

const api = supertest(app);

describe("when there is only one user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash("secret", saltRounds);

    const user = new User({
      username: "user",
      passwordHash,
    });

    await user.save();
  });

  test("user have a username and password", async () => {
    await api.post("/api/users").send(helper.users[0]).expect(201);

    const users = await helper.usersInDB();
    assert.strictEqual(users.length, helper.users.length + 1);
  });

  test("invalid add user operation returns a status code & error message", async () => {
    const invalidUser = {
      username: "us",
      password: "1234",
    };
    const response = await api.post("/api/users").send(invalidUser);

    assert.strictEqual(response.status, 400);
    assert.strictEqual(
      response.text,
      '{"error":"minimum password & username length is 3"}',
    );
  });
});

after(async () => {
  mongoose.connection.close();
});
