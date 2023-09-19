const express = require("express");
const router = express.Router();

const { verifySignUp } = require("../app/middleware");
const AuthController = require("../app/controllers/AuthController");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup", AuthController.signup);

router.post("/signin", AuthController.signin);

router.post("/confirmCode", AuthController.confirmActiveCode);

module.exports = router;
