const mongoose = require("mongoose");

const UserRatingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  content_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("user_rating", UserRatingSchema);
