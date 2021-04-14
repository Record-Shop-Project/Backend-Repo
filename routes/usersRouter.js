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
  logoutUser
} = require('../controllers/usersControllers');

router.route('/').get(getUsers).post(addUser);
router.route('/logout').post(auth, logoutUser); 
router.route('/login').post( loginUser);

router.route('/:id').get(auth, getUser).put(auth, updateUser).delete(auth, deleteUser);

module.exports = router;
