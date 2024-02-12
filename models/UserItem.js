const mongoose = require("mongoose");

const UserItemSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  search_history: {
    type: [String],
  },
  liked: {
    type: [String],
  },
  weekday: {
    type: {
      Sun: {
        type: Map,
        of: Number,
      },
      Mon: {
        type: Map,
        of: Number,
      },
      Tue: {
        type: Map,
        of: Number,
      },
      Wed: {
        type: Map,
        of: Number,
      },
      Thu: {
        type: Map,
        of: Number,
      },
      Fri: {
        type: Map,
        of: Number,
      },
      Sat: {
        type: Map,
        of: Number,
      },
    },
  },
});

module.exports = mongoose.model("user_item", UserItemSchema);
