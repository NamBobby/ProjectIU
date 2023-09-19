const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  codeActive: {
    type: Number,
  },
  statusActive: {
    type: Number,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

module.exports = mongoose.model("User", User);
