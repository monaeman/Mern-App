const mongoose = require('mongoose')
// Define an async function to connect to the MongoDB database.
const connectDB = async () => {
  try {

    // Attempt to establish a connection to the MongoDB database
    const conn = await mongoose.connect(process.env.MONGO_URI)

  // If the connection is successful, log a success message

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    // If there's an error during the connection attempt, log the error
    console.log(error)

    // Exit the Node.js process with an exit code of 1 to indicate an error
    process.exit(1)
  }
}

module.exports = connectDB