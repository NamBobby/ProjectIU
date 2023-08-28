const express = require("express");
const router = express.Router();

const { authJwt } = require("../app/middleware");
const CartController = require("../app/controllers/CartController");

// Create list item in cart
router.post("/create-cart", [authJwt.verifyToken], CartController.createCart);

// Get item in cart
router.post("/get-cart", [authJwt.verifyToken], CartController.getCart);

// Delete item in cart
router.post(
  "/delete-item",
  [authJwt.verifyToken],
  CartController.deleteItemCart
);

// Check cart exist
router.post(
  "/check-cart-exist",
  [authJwt.verifyToken],
  CartController.checkCartExist
);

module.exports = router;
