const AboutMe = require("../models/aboutMeModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAboutMe = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(AboutMe.findOne(), req.query).limitFields();
  const aboutMe = await features.query;

  if (!aboutMe) {
    return next(new AppError("No about me found", 404));
  }

  res.status(200).json({
    status: "success",
    data: aboutMe,
  });
});

exports.updateAboutMe = catchAsync(async (req, res, next) => {
  const aboutMe = await AboutMe.findOneAndUpdate({}, req.body, {
    new: true,
    runValidators: true,
  });

  if (!aboutMe) {
    return next(new AppError("No about me found", 404));
  }

  res.status(200).json({
    status: "success",
    data: aboutMe,
  });
});
