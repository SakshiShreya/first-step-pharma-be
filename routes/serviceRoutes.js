const express = require("express");
const {
  createService,
  getAllServices,
  getService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

router.route("/").get(getAllServices).post(createService);
router.route("/:id").get(getService).patch(updateService).delete(deleteService);

module.exports = router;
