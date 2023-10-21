const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
