const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const New = new Schema(
  {
    title: {
      type: String,
    },
    linkImage: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

New.plugin(mongoosePaginate);

module.exports = mongoose.model("New", New);
