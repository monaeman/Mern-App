// Middleware to handle errors and send error responses

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500  // Get the response status code
  

    // Set the response status code
    res.status(statusCode)
  
     // Send a JSON response containing the error message and stack trace (in development)
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
  }
  // Export the errorHandler middleware for use in other parts of the application
  module.exports = {
    errorHandler,
  }