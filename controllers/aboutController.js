const About = require("../models/aboutModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAbout = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(About.findOne(), req.query).limitFields();
  const about = await features.query;

  if (!about) {
    return next(new AppError("No about found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { about },
  });
});

exports.updateAbout = catchAsync(async (req, res, next) => {
  const about = await About.findOneAndUpdate({}, req.body, {
    new: true,
    runValidators: true,
  });

  if (!about) {
    return next(new AppError("No about found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { about },
  });
});
