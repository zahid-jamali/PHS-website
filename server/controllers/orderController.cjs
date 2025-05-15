const Order = require('../models/Order.cjs');
const OrderTracking = require('../models/OrderTracking.cjs');
const { asyncHandler, ErrorResponse } = require('../utils/errorHandler.cjs');

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Public
 */
exports.createOrder = asyncHandler(async (req, res) => {
  // If user is logged in, add user ID to order
  if (req.user) {
    req.body.user = req.user.id;
  }

  const order = await Order.create(req.body);

  // Create initial order tracking
  await OrderTracking.create({
    order: order._id,
    status: 'pending',
    description: 'Order received',
    location: 'Processing Center'
  });

  res.status(201).json({
    success: true,
    data: order
  });
});

/**
 * @desc    Get all orders
 * @route   GET /api/orders/admin
 * @access  Private/Admin
 */
exports.getOrders = asyncHandler(async (req, res) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  // Filtering
  const queryObj = {};
  
  // Filter by status if provided
  if (req.query.status) {
    queryObj.status = req.query.status;
  }
  
  // Filter by date range if provided
  if (req.query.startDate && req.query.endDate) {
    queryObj.createdAt = {
      $gte: new Date(req.query.startDate),
      $lte: new Date(req.query.endDate)
    };
  }
  
  const total = await Order.countDocuments(queryObj);
  
  // Sorting
  let sortBy = { createdAt: -1 }; // Default to newest first
  if (req.query.sort) {
    const sortField = req.query.sort;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    sortBy = { [sortField]: sortDirection };
  }

  const orders = await Order.find(queryObj)
    .populate('user', 'firstName lastName email')
    .sort(sortBy)
    .skip(startIndex)
    .limit(limit);

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: orders.length,
    pagination,
    data: orders
  });
});

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/admin/:id
 * @access  Private/Admin
 */
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'firstName lastName email')
    .populate({
      path: 'orderItems.product',
      select: 'name images'
    });

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: order
  });
});

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
});

/**
 * @desc    Update order status
 * @route   PUT /api/orders/admin/:id
 * @access  Private/Admin
 */
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return next(new ErrorResponse('Please provide a status', 400));
  }

  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }

  // Update different timestamps based on status
  const updateData = { status };
  
  if (status === 'processing') {
    // No additional fields needed
  } else if (status === 'shipped') {
    updateData.isShipped = true;
    updateData.shippedAt = Date.now();
  } else if (status === 'delivered') {
    updateData.isDelivered = true;
    updateData.deliveredAt = Date.now();
  }

  order = await Order.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  // Create tracking update
  await OrderTracking.create({
    order: order._id,
    status,
    description: req.body.description || `Order ${status}`,
    location: req.body.location
  });

  res.status(200).json({
    success: true,
    data: order
  });
});

/**
 * @desc    Delete order
 * @route   DELETE /api/orders/admin/:id
 * @access  Private/Admin
 */
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
  }

  await order.remove();

  // Delete associated tracking entries
  await OrderTracking.deleteMany({ order: req.params.id });

  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * @desc    Get order tracking
 * @route   GET /api/orders/track/:orderNumber
 * @access  Public
 */
exports.getOrderTracking = asyncHandler(async (req, res, next) => {
  const { orderNumber } = req.params;

  const order = await Order.findOne({ orderNumber });

  if (!order) {
    return next(new ErrorResponse(`Order not found with order number ${orderNumber}`, 404));
  }

  const tracking = await OrderTracking.find({ order: order._id })
    .sort('createdAt');

  res.status(200).json({
    success: true,
    data: {
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        createdAt: order.createdAt
      },
      tracking
    }
  });
});

/**
 * @desc    Add order tracking update
 * @route   POST /api/orders/admin/:orderId/tracking
 * @access  Private/Admin
 */
exports.addOrderTrackingUpdate = asyncHandler(async (req, res, next) => {
  const { orderId } = req.params;
  const { status, description, location } = req.body;

  // Check if order exists
  const order = await Order.findById(orderId);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${orderId}`, 404));
  }

  // Create tracking entry
  const tracking = await OrderTracking.create({
    order: orderId,
    status,
    description,
    location
  });

  // Update order status as well
  await Order.findByIdAndUpdate(orderId, { status }, {
    runValidators: true
  });

  res.status(201).json({
    success: true,
    data: tracking
  });
});