const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");
const { logout } = require("../controllers/authenticate");

router.route("/").get(logout);

module.exports = router;
