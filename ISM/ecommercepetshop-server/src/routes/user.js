const express = require("express");
const router = express.Router();

const { authJwt } = require("../app/middleware");
const UserController = require("../app/controllers/UserController");

// update products
router.put("/update/:id", [authJwt.verifyToken], UserController.updateInfoUser);

module.exports = router;
