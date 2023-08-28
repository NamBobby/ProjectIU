const express = require("express");
const router = express.Router();

const SendEmailController = require("../app/controllers/SendEmailController");

router.post("/payment", SendEmailController.sendEmail);

module.exports = router;
