const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  getAllUsers,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/all', getAllUsers);

module.exports = router;
