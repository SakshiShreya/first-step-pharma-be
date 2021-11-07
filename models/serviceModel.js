const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required for a service"] },
  subServices: [String],
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
