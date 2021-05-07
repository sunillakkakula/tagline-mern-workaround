import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  console.log(
    "Exec login API User Name : " + userName + ", password: " + password
  );
  const users = await User.find();
  console.log("User Count" + users.length);
  const authUser = users.filter(
    (eu) => eu.userName === userName && eu.password === password
  );

  console.log("Auth User : " + authUser);

  if (authUser) {
    res.json(authUser);
  } else {
    res.status(401);
    throw new Error("Invalid Credentails");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const create = asyncHandler(async (req, res) => {
  console.log("Req Body :--> " + req.body);
  const {
    name,
    userName,
    password,
    email,
    contactNo,
    isAdmin,
    role,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    userName,
    email,
    password,
    role,
    isAdmin,
    contactNo,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAll = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const remove = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const update = asyncHandler(async (req, res) => {
  const {
    name,
    userName,
    password,
    email,
    contactNo,
    isAdmin,
    role,
  } = req.body;
  console.log("req.params.id : " + req.params.id);
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name;
    user.userName = userName;
    user.password = password;
    user.email = email;
    user.contactNo = contactNo;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  login,
  create,
  getProfile,
  updateProfile,
  getAll,
  remove,
  getById,
  update,
};
