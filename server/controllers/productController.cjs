const Product = require('../models/Product.cjs');
const { asyncHandler, ErrorResponse } = require('../utils/errorHandler.cjs');

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = asyncHandler(async (req, res) => {
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude from filtering
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  let query = Product.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const products = await query;

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
    count: products.length,
    pagination,
    data: products
  });
});

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
exports.getFeaturedProducts = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 6;
  
  const products = await Product.find({ featured: true })
    .sort('-createdAt')
    .limit(limit);

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

/**
 * @desc    Get products by category
 * @route   GET /api/products/category/:category
 * @access  Public
 */
exports.getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments({ category });

  // Sort
  let sort = '-createdAt';
  if (req.query.sort) {
    sort = req.query.sort.split(',').join(' ');
  }

  // Find products
  const products = await Product.find({ category })
    .sort(sort)
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
    count: products.length,
    pagination,
    data: products
  });
});

/**
 * @desc    Get single product by slug
 * @route   GET /api/products/:slug
 * @access  Public
 */
exports.getProductBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug })
    .populate('reviews');

  if (!product) {
    return next(new ErrorResponse(`Product not found with slug of ${slug}`, 404));
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
exports.createProduct = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

/**
 * @desc    Search products
 * @route   GET /api/products/search
 * @access  Public
 */
exports.searchProducts = asyncHandler(async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a search query'
    });
  }

  // Create text search
  const products = await Product.find({ 
    $text: { $search: query } 
  }).sort({
    score: { $meta: 'textScore' }
  });

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});