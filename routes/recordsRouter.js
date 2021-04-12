const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authenticator');

const {
  getRecord,
  getRecords,
  addRecord,
  updateRecord,
  deleteRecord,
} = require('../controllers/recordsControllers');

// /Records == base route
router.route('/').get(auth, getRecords).post(auth, addRecord);

// /Records/:id
router.route('/:id').get(auth, getRecord).put(auth, updateRecord).delete(auth, deleteRecord);

module.exports = router;
