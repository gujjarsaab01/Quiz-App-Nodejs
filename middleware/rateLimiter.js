const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowsMs: 10 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    success: false,
    message: "Too Many request, please try again later",
  },
});

module.exports = apiLimiter;
