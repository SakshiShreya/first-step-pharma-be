const express = require("express");
const morgan = require("morgan");

const app = express();

// MIDDLEWARES

// 1. Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// EXPORT
module.exports = app;
