const express = require("express");
const router = express.Router();
const { getLocations } = require("../controllers/locations");

router.route("/").get(getLocations);

module.exports = router;
