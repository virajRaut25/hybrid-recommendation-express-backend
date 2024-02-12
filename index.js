const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/history", require("./routes/history"));

app.get("/", (req, res) => {
  res.json({ check: "HRS Backend" });
});

app.listen(port, () => {
  console.log(`HRS backend listenign on port http://localhost:${port}`);
});
