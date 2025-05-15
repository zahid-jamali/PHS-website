const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController.cjs');

const { protect, authorize } = require('../middlewares/auth.cjs');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);

// Private routes
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/update-details', protect, updateDetails);
router.put('/update-password', protect, updatePassword);

// Admin routes
router.route('/')
  .get(protect, authorize('admin'), getUsers)
  .post(protect, authorize('admin'), createUser);

router.route('/:id')
  .get(protect, authorize('admin'), getUser)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;