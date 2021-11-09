const mongoose = require("mongoose");

const subServiceSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required for a subService"] },
  order: { type: Number, required: [true, "Order is required for a subService"] },
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required for a service"],
    unique: true,
  },
  subServices: [subServiceSchema],
  order: { type: Number, required: [true, "Order is required for a service"] },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
