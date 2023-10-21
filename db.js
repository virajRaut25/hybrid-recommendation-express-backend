const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGODB_URI;

const connectToMongo = () => {
  mongoose.connect(mongoURI).catch((error) => console.log(error));
};

module.exports = connectToMongo;
