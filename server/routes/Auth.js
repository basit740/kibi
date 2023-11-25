const express = require("express");
const router = express.Router();
const {
  getAuthUri,
  authenticateUser,
  register,
} = require("../controllers/auth");

router.route("/get-intuite-auth-uri").get(getAuthUri);
router.route("/authenticate").post(authenticateUser);
router.route("/register").post(register);

module.exports = router;
