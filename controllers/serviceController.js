const Service = require("../models/serviceModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllServices = catchAsync(async (req, res) => {
  const services = await Service.find();

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: services.length,
    data: services,
  });
});

exports.getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new AppError("No service found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: service,
  });
});

exports.createService = catchAsync(async (req, res) => {
  const newService = await Service.create(req.body);

  res.status(201).json({
    status: "success",
    data: newService,
  });
});

exports.updateService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    return next(new AppError("No service found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: service,
  });
});

exports.deleteService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    return next(new AppError("No service found with this id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
