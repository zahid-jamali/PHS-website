const express = require('express');
const {
  getProducts,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} = require('../controllers/productController.cjs');

const { protect, authorize } = require('../middlewares/auth.cjs');

const router = express.Router();

// Public routes
router.route('/search')
  .get(searchProducts);

router.route('/featured')
  .get(getFeaturedProducts);

router.route('/category/:category')
  .get(getProductsByCategory);

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), createProduct);

router.route('/:slug')
  .get(getProductBySlug);

// Admin routes - using ID for updates/deletes
router.route('/admin/:id')
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;