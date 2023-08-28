const Feedback = require("../models/Feedback");

class FeedbackController {
  // [GET]
  async getListFeedback(req, res, next) {
    try {
      const idProduct = req.params.idProduct;
      const { page, limit } = req.query;

      const startFrom = (page - 1) * limit;
      const feedbackData = await Feedback.find({
        productId: idProduct,
      })
        .skip(startFrom)
        .limit(limit);

      res.json({
        retCode: 0,
        retText: "List feedbacks",
        retData: feedbackData,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  // [POST]
  async createFeedback(req, res, next) {
    // console.log("test", req.body);
    try {
      const feedback = new Feedback(req.body);
      const result = await feedback.save();
      res.json({
        retCode: 0,
        retText: "Create successfullly",
        retData: result,
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new FeedbackController();
