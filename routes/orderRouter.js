const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authenticator');

const {
  getOrder,
  addOrder
} = require('../controllers/orderController');

router.route('/')
    .get(auth, getOrder)
    .post(auth, addOrder)

module.exports = router;
