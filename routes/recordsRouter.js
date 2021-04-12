const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");

const {
  getRecord,
  getRecords,
  addRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordsControllers");

router.route("/").get(auth, getRecords).post(addRecord);

router.route("/:id").get(getRecord).put(updateRecord).delete(deleteRecord);

module.exports = router;
