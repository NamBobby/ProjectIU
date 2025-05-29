const jwt = require("jsonwebtoken");
const { User } = require("../models/associations");

const auth = async (req, res, next) => {
  // First try to authenticate the user if token is present
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        where: { userId: decoded.userId },
      });
      if (user) {
        req.user = {
          userId: user.userId,
          email: user.email,
          name: user.name,
          dateOfBirth: user.dateOfBirth,
          avatarPath: user.avatarPath,
          gender: user.gender,
        };
      }
    } catch (error) {
      // Just continue if token is invalid (don't set req.user)
    }
  }

  // Then check if route requires authentication
  const allow_lists = [
    "/",
    "/register", 
    "/user",
    "/login",
    "/sendemail",
    "/sendotp",
    "/verifyotp",
    "/chat/ask"
  ];

  if (allow_lists.find((item) => "/v1/api" + item === req.originalUrl)) {
    next();
  } else {
    // Reject if not authenticated and route requires auth
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    next();
  }
};

module.exports = auth;