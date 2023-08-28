const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: Array,
    },
    price: {
      type: Number,
    },
    gender: {
      type: String,
    },
    age: {
      type: String,
    },
    weight: {
      type: String,
    },
    location: {
      type: String,
    },
    dob: {
      type: String,
    },
    // totalItem: {
    //   type: Number,
    // },
    // totalProduct: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

Product.index({ name: "text" }, { default_language: "english", minLength: 1 });
// const test = mongoose.model("Product", Product);
// test.collection.dropIndexes();
// test.syncIndexes();

Product.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", Product);
