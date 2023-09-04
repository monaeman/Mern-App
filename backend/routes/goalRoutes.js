const express = require('express')
const router = express.Router()
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

// Define routes for managing goals using the goalController and authentication middleware

// GET and POST requests for managing goals at the root path '/'

router.route('/').get(protect, getGoals).post(protect, setGoal)

// DELETE and PUT requests for managing goals with dynamic 'id' parameter
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

// Export the router for use in the main Express application

module.exports = router