const express = require('express');
const { protect, authorize } = require('../middlewares/auth.cjs');

const router = express.Router();

// Import controllers
const {
  createOrder,
  getOrders,
  getOrder,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
  getOrderTracking,
  addOrderTrackingUpdate
} = require('../controllers/orderController.cjs');

// Public routes
router.route('/')
  .post(createOrder);

// Get order tracking by order number - public
router.route('/track/:orderNumber')
  .get(getOrderTracking);

// Private routes
router.route('/myorders')
  .get(protect, getMyOrders);

// Admin routes
router.route('/admin')
  .get(protect, authorize('admin'), getOrders);

router.route('/admin/:id')
  .get(protect, authorize('admin'), getOrder)
  .put(protect, authorize('admin'), updateOrderStatus)
  .delete(protect, authorize('admin'), deleteOrder);

router.route('/admin/:orderId/tracking')
  .post(protect, authorize('admin'), addOrderTrackingUpdate);

module.exports = router;