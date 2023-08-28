const express = require("express");
const router = express.Router();

const { authJwt } = require("../app/middleware");
const ProductsController = require("../app/controllers/ProductsController");

// Admin

// create products
router.post("/create", [authJwt.verifyToken], ProductsController.create);

// post list producst with pagination
router.post(
  "/listProducts",
  /*   [authJwt.verifyToken],
   */ ProductsController.getListWithPaginate
);

// get detail products
router.get(
  "/detail/:id" /* , [authJwt.verifyToken] */,
  ProductsController.getDetail
);

// update products
router.put("/update/:id", [authJwt.verifyToken], ProductsController.update);

// delete products
router.delete("/delete/:id", [authJwt.verifyToken], ProductsController.delete);

// // search product
// router.post(
//   "/search-product",
//   [authJwt.verifyToken],
//   ProductsController.searchProduct
// );

// End

module.exports = router;
