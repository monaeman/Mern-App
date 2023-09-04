const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


// Middleware to protect routes by verifying JWT tokens
const protect = asyncHandler(async (req, res, next) => {
  let token;

// Check if the request headers contain an authorization token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      // Call the next middleware or route handler
      next();
    } catch (error) {
      // Handle token verification or database lookup errors
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
