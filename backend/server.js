const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT|| 5000
const {errorHandler} =require('./middleware/errorMiddleware')
const colors = require('colors') //not required
const app = express()
const connectDB = require('./config/db')

connectDB();
//Middleware
//this middleware used to get the body data
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//use goalRoutes to handle any endpoints that end with / api/goals

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
//user resource
//comments resources
//....

app.listen(port, () => console.log(`Server started on port ${port}`))