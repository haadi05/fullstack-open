const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    author: 1,
    title: 1,
    id: 1,
  });
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  try {
    const { username, name, password } = request.body;

    if (!password || !username) {
      return response
        .status(400)
        .json({ error: "password or username is missing" });
    }

    if (password.length < 3 || username.length < 3) {
      return response
        .status(400)
        .json({ error: "minimum password & username length is 3" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    if (
      error.name === "MongoServerError" &&
      error.message.includes("E11000 duplicate key error")
    ) {
      return response.status(400).json({ error: "username must be unique" });
    }
  }
});

module.exports = userRouter;
