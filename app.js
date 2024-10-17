const express = require("express");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");
const limiter = require('./middleware/rateLimiter');
const dotenv = require("dotenv");
const initDB = require("./config/db");
const cronJobs = require('./services/cronJobs');
const app = express();

dotenv.config();

// Connect to database
initDB();

app.use(cors());
app.use(express.json()); // Body parser for JSON
app.use(limiter); //  rate limiting

//API routes
app.use("/api/v1", quizRoutes);

//staring cron Jobs
cronJobs();

// testing api
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Quiz app" });
});

module.exports = app;
