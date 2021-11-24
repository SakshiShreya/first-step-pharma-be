const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const swaggerUi = require("swagger-ui-express");
const servicesRoutes = require("./routes/serviceRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const swaggerDocument = require("./docs/index");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// MIDDLEWARES

// 1. Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// 2. Get body
app.use(express.json());

// 3. Swagger
const options = { explorer: true, swaggerOptions: { validatorUrl: null } };
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options),
);

// 4. Compress api response
app.use(compression());

// 5. Routes
app.use("/api/v1/services", servicesRoutes);
app.use("/api/v1/aboutme", aboutRoutes);

// 6. Error handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

// EXPORT
module.exports = app;
