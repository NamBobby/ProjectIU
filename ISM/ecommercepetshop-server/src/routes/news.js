const express = require("express");
const router = express.Router();
const { authJwt } = require("../app/middleware");
const NewsController = require("../app/controllers/NewsController");

// Create new
router.post("/create-news", [authJwt.verifyToken], NewsController.createNews);

// Get list new
router.post(
  "/get-list-new" /* , [authJwt.verifyToken] */,
  NewsController.getListNews
);

// Get detail new
router.get(
  "/get-detail-new/:id",
  /*   [authJwt.verifyToken],
   */ NewsController.getDetailNews
);

// Delete detail new
router.delete(
  "/delete-detail-new/:id",
  [authJwt.verifyToken],
  NewsController.deleteDetailNews
);

// Update detail new
router.put(
  "/update-detail-new/:id",
  [authJwt.verifyToken],
  NewsController.updateDetailNews
);

module.exports = router;
