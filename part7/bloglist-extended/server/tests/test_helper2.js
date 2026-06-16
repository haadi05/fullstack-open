const User = require("../models/user");

const users = [
  {
    username: "testing",
    password: "121",
  },
];

const usersInDB = async () => {
  const response = await User.find({});
  return response.map((user) => user.toJSON());
};

module.exports = {
  users,
  usersInDB,
};
