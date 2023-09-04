import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'

// Create and configure the Redux store

export const store = configureStore({
  reducer: {
    auth: authReducer, // Configure the authentication reducer under the 'auth' key
   goals: goalReducer, // Configure the goal reducer under the 'goals' key
  },
})

