const express = require("express");
const router = express.Router();

const { authJwt } = require("../app/middleware");
const VoucherController = require("../app/controllers/VoucherController");

// Create vouchers
router.post("/create", [authJwt.verifyToken], VoucherController.createVoucher);

// Get list vouchers
router.post(
  "/listClient",
  [authJwt.verifyToken],
  VoucherController.getListVoucher
);

// Update voucher
router.put(
  "/update/:id",
  [authJwt.verifyToken],
  VoucherController.updateVoucher
);

// Delete voucher
router.delete(
  "/delete/:id",
  [authJwt.verifyToken],
  VoucherController.deleteVoucher
);

// Get detail
router.get(
  "/detail/:id",
  [authJwt.verifyToken],
  VoucherController.getDetailVoucher
);

module.exports = router;
