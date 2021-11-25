const express = require("express");
const {
  updateAboutMe,
  getAboutMe,
} = require("../controllers/aboutMeController");

const router = express.Router();

router.route("/").get(getAboutMe).patch(updateAboutMe);

module.exports = router;
