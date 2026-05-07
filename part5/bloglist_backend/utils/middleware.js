const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const getUserFrom = async (request) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken) {
    return response.status(401).json({ error: "token invalid" });
  }

  const userObj = await User.findById(decodedToken.id);
  return userObj;
};

const userExtractor = async (request, response, next) => {
  request.user = await getUserFrom(request);
  await next();
};

module.exports = {
  userExtractor,
};
