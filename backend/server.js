const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;


// Connect to the database using the connectDB function
connectDB();

const app = express();

app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded requests

// Define routes for goals and users using the respective route files

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve the frontend if running in production
if (process.env.NODE_ENV === 'production') {

  // Serve static files from the frontend build directory
  app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve the frontend's HTML file for all routes (client-side routing)

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {

  // In non-production environments, respond with a message to set to production
  app.get('/', (req, res) => res.send('Please set to production'));
}
// Use the errorHandler middleware to handle errors

app.use(errorHandler);


// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server started on port ${port}`));