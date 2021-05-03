const express = require("express");
const router = express.Router();
const { validateSchema } = require("../middleware/validation");
const verif = require("../middleware/emailVerification");

const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  verifyUserAccount,
  loginUserGoogle,
} = require("../controllers/usersControllers");

router.route("/").get(getUsers).post(validateSchema, addUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

// Taking care of the Google login
router.route("/googleLogin").post(loginUserGoogle);

// Route for verifying the user account
router.route("/verify").post(verif, verifyUserAccount);

// Taking care of the Google login
//router.route('/googleLogin').post(loginUserGoogle);

module.exports = router;
