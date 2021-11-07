const express = require("express");
const morgan = require("morgan");
const servicesRoutes = require("./routes/serviceRoutes");

const app = express();

// MIDDLEWARES

// 1. Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/services", servicesRoutes);

// EXPORT
module.exports = app;
