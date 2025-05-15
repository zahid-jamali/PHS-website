const express = require('express');
const {
  getSaltFlavors,
  getSaltFlavorBySlug,
  getSaltFlavorsByMood,
  getSaltFlavorsByTasteProfile,
  createSaltFlavor,
  updateSaltFlavor,
  deleteSaltFlavor
} = require('../controllers/saltFlavorController.cjs');

const { protect, authorize } = require('../middlewares/auth.cjs');

const router = express.Router();

// Public routes
router.route('/')
  .get(getSaltFlavors);

router.route('/mood/:mood')
  .get(getSaltFlavorsByMood);

router.route('/taste/:tasteProfile')
  .get(getSaltFlavorsByTasteProfile);

router.route('/:slug')
  .get(getSaltFlavorBySlug);

// Admin routes
router.route('/admin')
  .post(protect, authorize('admin'), createSaltFlavor);

router.route('/admin/:id')
  .put(protect, authorize('admin'), updateSaltFlavor)
  .delete(protect, authorize('admin'), deleteSaltFlavor);

module.exports = router;