const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

//@desc Get all Users
//@route GET api/users
//@access Public
const getAllUsers = expressAsyncHandler(async (req, res) => {
  const user = await User.find({});
  res.status(200).json(user);
});

//@desc Register User
//@route POST api/users
//@access Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //If any of the fields are empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all field');
  }

  //Check if user exists already
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create the user
  const user = await User.create({ ...req.body, password: hashedPassword });

  //If user gets successfully created
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//@desc Authenticate a User
//@route POST api/users/login
//@access Public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const user = await User.findOne({ email });

  //Check for the user and Compare the password of the user with the password in the request body
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

//@desc Get user data
//@route GET api/users/me
//@access Private
const getMe = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user); //req.user is the logged-in user
});

module.exports = { registerUser, loginUser, getMe, getAllUsers };
