const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// Define routes for user-related operations using the userController and authentication middleware

// POST request for user registration at the root path '/'

router.post('/', registerUser)
// POST request for user login at '/login'
router.post('/login', loginUser)
// GET request for getting the currently authenticated user at '/me'
router.get('/me', protect, getMe)

module.exports = router