const AppError = require("../utils/appError");

const sendErrorForDev = (err, res) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });

const sendErrorForProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming error, don't leak error details
  // 1. Log Error
  // eslint-disable-next-line no-console
  console.error("Error:", err);

  // 2. Send Generic Message
  res.status(500).json({
    status: "error",
    message: "Something went very wrong",
  });
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value ${err.keyValue.name}. Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => new AppError(err.message, 400);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (err.name === "ValidationError") {
      error = handleValidationErrorDB(err);
    }

    sendErrorForProd(error, res);
  }
};
