const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const swaggerUi = require("swagger-ui-express");
const servicesRoutes = require("./routes/serviceRoutes");
const swaggerDocument = require("./docs/index");

const app = express();

// MIDDLEWARES

// 1. Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

const options = { explorer: true, swaggerOptions: { validatorUrl: null } };
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options),
);

app.use(compression());

app.use("/api/v1/services", servicesRoutes);

// EXPORT
module.exports = app;
