const express = require('express');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  getUsers,
  updateUserRole
} = require('../controllers/authController');

const { protect, authorize } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validatePasswordChange
} = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, validateProfileUpdate, updateProfile);
router.put('/password', protect, validatePasswordChange, changePassword);

// Admin only routes
router.get('/users', protect, authorize('admin'), getUsers);
router.put('/users/:id/role', protect, authorize('admin'), updateUserRole);

module.exports = router;
