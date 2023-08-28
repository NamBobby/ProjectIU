const express = require("express");
const router = express.Router();
const { authJwt } = require("../app/middleware");
const OrderController = require("../app/controllers/OrderController");

// Get list order client
router.post(
  "/get-list-order-client",
  [authJwt.verifyToken],
  OrderController.getListOrderClient
);

// Create order
router.post(
  "/create-order",
  [authJwt.verifyToken],
  OrderController.createOrder
);

// Get list order
router.post(
  "/get-list-order",
  [authJwt.verifyToken],
  OrderController.getListOrder
);

// Get detail order
router.get(
  "/get-detail-order/:id",
  [authJwt.verifyToken],
  OrderController.getDetailOrder
);

// Delete detail order
router.delete(
  "/delete-detail-order/:id",
  [authJwt.verifyToken],
  OrderController.deleteDetailOrder
);

// Update detail order
router.put(
  "/update-detail-order/:id",
  [authJwt.verifyToken],
  OrderController.updateOrder
);

module.exports = router;
