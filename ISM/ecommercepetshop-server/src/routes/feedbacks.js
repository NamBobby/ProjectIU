const express = require("express");
const router = express.Router();

const FeedbackController = require("../app/controllers/FeedbackController");

// GET LIST FEEDBACKS
router.get(
  "/listFeedbackProduct/:idProduct",
  FeedbackController.getListFeedback
);

// POST FEEDBACKS
router.post("/createFeedback", FeedbackController.createFeedback);

module.exports = router;
