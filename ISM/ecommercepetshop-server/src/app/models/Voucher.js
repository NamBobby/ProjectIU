const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Voucher = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

Voucher.plugin(mongoosePaginate);

module.exports = mongoose.model("Voucher", Voucher);
