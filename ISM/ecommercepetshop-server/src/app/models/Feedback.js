const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Feedback = new Schema(
  {
    userInfo: {
      type: Object,
    },
    description: {
      type: String,
    },
    point: {
      type: Number,
    },
    productId: {
      type: String,
    },
    productInfo: {
      type: Object,
    },
  },
  { timestamps: true }
);

Feedback.plugin(mongoosePaginate);

module.exports = mongoose.model("Feedback", Feedback);
