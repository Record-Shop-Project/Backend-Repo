const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");

const { authUser } = require("../controllers/usersControllers");

// route  /me
router.route("/").post(auth, authUser);
module.exports = router;
