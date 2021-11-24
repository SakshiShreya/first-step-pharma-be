const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  address: {
    type: [String],
    required: [true, "Address is required"],
  },
});

const About = mongoose.model("About", aboutSchema);

module.exports = About;
