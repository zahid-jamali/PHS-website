const SaltFlavor = require('../models/SaltFlavor.cjs');
const { asyncHandler, ErrorResponse } = require('../utils/errorHandler.cjs');

/**
 * @desc    Get all salt flavors
 * @route   GET /api/salt-flavors
 * @access  Public
 */
exports.getSaltFlavors = asyncHandler(async (req, res) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  // Filtering
  const queryObj = {};
  
  // Filter by fields if provided
  const filterFields = ['isOrganic', 'isVegan', 'isGlutenFree', 'featured'];
  filterFields.forEach(field => {
    if (req.query[field] !== undefined) {
      queryObj[field] = req.query[field] === 'true';
    }
  });
  
  // Filter by spice level range if provided
  if (req.query.minSpiceLevel || req.query.maxSpiceLevel) {
    queryObj.spiceLevel = {};
    if (req.query.minSpiceLevel) {
      queryObj.spiceLevel.$gte = parseInt(req.query.minSpiceLevel);
    }
    if (req.query.maxSpiceLevel) {
      queryObj.spiceLevel.$lte = parseInt(req.query.maxSpiceLevel);
    }
  }
  
  const total = await SaltFlavor.countDocuments(queryObj);
  
  // Sorting
  let sort = '-createdAt'; // Default to newest first
  if (req.query.sort) {
    sort = req.query.sort.split(',').join(' ');
  }

  // Query execution
  const saltFlavors = await SaltFlavor.find(queryObj)
    .select(req.query.select)
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
    count: saltFlavors.length,
    pagination,
    data: saltFlavors
  });
});

/**
 * @desc    Get salt flavor by slug
 * @route   GET /api/salt-flavors/:slug
 * @access  Public
 */
exports.getSaltFlavorBySlug = asyncHandler(async (req, res, next) => {
  const flavor = await SaltFlavor.findOne({ slug: req.params.slug });

  if (!flavor) {
    return next(
      new ErrorResponse(`Salt flavor not found with slug of ${req.params.slug}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: flavor
  });
});

/**
 * @desc    Get salt flavors by mood
 * @route   GET /api/salt-flavors/mood/:mood
 * @access  Public
 */
exports.getSaltFlavorsByMood = asyncHandler(async (req, res) => {
  const { mood } = req.params;
  
  // Find flavors with matching mood and sort by strength level
  const flavors = await SaltFlavor.find({
    'moodAssociations.mood': mood
  })
  .sort({ 'moodAssociations.strengthLevel': -1 });

  res.status(200).json({
    success: true,
    count: flavors.length,
    data: flavors
  });
});

/**
 * @desc    Get salt flavors by taste profile
 * @route   GET /api/salt-flavors/taste/:tasteProfile
 * @access  Public
 */
exports.getSaltFlavorsByTasteProfile = asyncHandler(async (req, res) => {
  const { tasteProfile } = req.params;
  
  // Find flavors with matching taste profile
  const flavors = await SaltFlavor.find({
    tasteProfile: tasteProfile
  });

  res.status(200).json({
    success: true,
    count: flavors.length,
    data: flavors
  });
});

/**
 * @desc    Create new salt flavor
 * @route   POST /api/salt-flavors/admin
 * @access  Private/Admin
 */
exports.createSaltFlavor = asyncHandler(async (req, res) => {
  const flavor = await SaltFlavor.create(req.body);

  res.status(201).json({
    success: true,
    data: flavor
  });
});

/**
 * @desc    Update salt flavor
 * @route   PUT /api/salt-flavors/admin/:id
 * @access  Private/Admin
 */
exports.updateSaltFlavor = asyncHandler(async (req, res, next) => {
  let flavor = await SaltFlavor.findById(req.params.id);

  if (!flavor) {
    return next(
      new ErrorResponse(`Salt flavor not found with id of ${req.params.id}`, 404)
    );
  }

  flavor = await SaltFlavor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: flavor
  });
});

/**
 * @desc    Delete salt flavor
 * @route   DELETE /api/salt-flavors/admin/:id
 * @access  Private/Admin
 */
exports.deleteSaltFlavor = asyncHandler(async (req, res, next) => {
  const flavor = await SaltFlavor.findById(req.params.id);

  if (!flavor) {
    return next(
      new ErrorResponse(`Salt flavor not found with id of ${req.params.id}`, 404)
    );
  }

  await flavor.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});