const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Cart = new Schema(
  {
    userId: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    totalProduct: {
      type: Number,
    },
    listCart: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", Cart);
