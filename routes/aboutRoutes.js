const express = require("express");
const {
  updateAbout,
  getAbout,
} = require("../controllers/aboutController");

const router = express.Router();

router.route("/").get(getAbout).patch(updateAbout);

module.exports = router;
