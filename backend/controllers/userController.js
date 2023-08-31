const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //hash our passwords
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc  register new user

const registerUser = asyncHandler(async (req, res) => {
  //send body data
  const { name, email, password } = req.body;
  //if there is no name . email or pw
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  //res.json({message: ' Register User'})
});

//@desc     Authenticate a user
//@route      post/ api/ users/ login
//@acess       public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check for user email
  const user = await User.findOne({ email });
  //compare the plain text ps
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  //res.json({message: ' Login User'})
});

//@desc    get user data
//@route Get/api/ me
//@acess       private

/*const getMe = asyncHandler(async (req, res) => {
  //const{_id, name, email} = await User.findById(req.user.id)
  res.status(200).json({
    id: _id,
  
    email,
    token: generateToken(user._id),
  });

  //res.json({message: ' User Data display'})
});
*/
const getMe = asyncHandler(async(req, res) => {
    const{_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
      name,
        email,
    })
})

// generate JWT
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
