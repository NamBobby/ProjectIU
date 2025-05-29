const express = require("express");
const {
  UserRegister,
  handleLogin,
  updateUser,
  updatePassword,
  getAccount,
  sendOtp,
  verifyOtp,
  handleAskBot,
  handleGetChatStats,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const delaymodule = require("../middleware/delay");

const { upload } = require("../config/multerConfig");
const { getHomepage } = require("../controllers/homeController");

const routerAPI = express.Router();

routerAPI.all("*", auth);
routerAPI.get("/", getHomepage);

// User routes
routerAPI.post("/register", delaymodule, UserRegister);
routerAPI.post("/login", delaymodule, handleLogin);
routerAPI.get("/account", delaymodule, getAccount);
routerAPI.post("/sendotp", delaymodule, sendOtp);
routerAPI.post("/verifyotp", delaymodule, verifyOtp);
routerAPI.patch("/profile", upload, delaymodule, updateUser);
routerAPI.patch("/password", delaymodule, updatePassword);
routerAPI.post("/chat/ask", delaymodule, handleAskBot);
routerAPI.get("/chat/stats", delaymodule, handleGetChatStats);

module.exports = routerAPI; 
