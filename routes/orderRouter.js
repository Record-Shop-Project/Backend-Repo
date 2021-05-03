const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");

const { getOrder, addOrder } = require("../controllers/orderController");

router.route("/").get(getOrder).post(addOrder);

module.exports = router;
