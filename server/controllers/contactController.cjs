const Contact = require('../models/Contact.cjs');
const { asyncHandler, ErrorResponse } = require('../utils/errorHandler.cjs');

/**
 * @desc    Create new contact submission
 * @route   POST /api/contact
 * @access  Public
 */
exports.createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    success: true,
    data: contact
  });
});

/**
 * @desc    Get all contact submissions
 * @route   GET /api/contact
 * @access  Private/Admin
 */
exports.getContacts = asyncHandler(async (req, res) => {
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Contact.countDocuments();

  // Filter by status
  const filterOptions = {};
  if (req.query.status) {
    filterOptions.status = req.query.status;
  }

  // Sort options
  const sort = {};
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    sort[sortBy] = req.query.order === 'asc' ? 1 : -1;
  } else {
    sort.createdAt = -1; // Default sort by newest
  }

  const contacts = await Contact.find(filterOptions)
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
    count: contacts.length,
    pagination,
    data: contacts
  });
});

/**
 * @desc    Get single contact
 * @route   GET /api/contact/:id
 * @access  Private/Admin
 */
exports.getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: contact
  });
});

/**
 * @desc    Update contact
 * @route   PUT /api/contact/:id
 * @access  Private/Admin
 */
exports.updateContact = asyncHandler(async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  }

  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: contact
  });
});

/**
 * @desc    Delete contact
 * @route   DELETE /api/contact/:id
 * @access  Private/Admin
 */
exports.deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(
      new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
    );
  }

  await contact.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});