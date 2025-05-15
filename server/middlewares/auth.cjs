const jwt = require('jsonwebtoken');
const { asyncHandler } = require('../utils/errorHandler.cjs');
const { ErrorResponse } = require('../utils/errorHandler.cjs');
const User = require('../models/User.cjs');

/**
 * Protect routes - Verify user is authenticated
 */
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    // Get token from cookie
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set user to req.user
    req.user = await User.findById(decoded.id);
    
    // Set isAuthenticated method to match Express.js expectation
    req.isAuthenticated = () => true;
    
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

/**
 * Authorize by role - Grant access to specific roles
 */
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new ErrorResponse('Not authorized to access this route', 401));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
    }
    
    next();
  };
};