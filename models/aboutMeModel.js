const mongoose = require("mongoose");

const aboutMeSchema = new mongoose.Schema({
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

const AboutMe = mongoose.model("AboutMe", aboutMeSchema);

module.exports = AboutMe;
