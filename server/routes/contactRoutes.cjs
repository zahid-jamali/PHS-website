const express = require('express');
const {
  createContact,
  getContacts
} = require('../controllers/contactController.cjs');
const { protect, authorize } = require('../middlewares/auth.cjs');

const router = express.Router();

router.route('/')
  .post(createContact)
  .get(protect, authorize('admin'), getContacts);

module.exports = router;