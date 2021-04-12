const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authenticator');

const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/usersControllers');

router.route('/').get(getUsers).post(addUser);

router.route('/:id').get(auth, getUser).put(auth, updateUser).delete(auth, deleteUser);
router.route('/login').post(loginUser);

module.exports = router;
