const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json()); //req.body

app.get("/api", async (req, res) => {
  res.json({ message: "Welcome to PERN" });
});

module.exports = app;
