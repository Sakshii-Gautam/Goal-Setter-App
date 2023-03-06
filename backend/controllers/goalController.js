const expressAsyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

//@desc Get Goals
//@route GET api/goals
//@access Private
const getGoals = expressAsyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }); //req.user is from the protect middleware
  res.status(200).json(goals);
});

//@desc Create Goals
//@route POST api/goals
//@access Private
const setGoal = expressAsyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(404);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({ text: req.body.text, user: req.user.id }); //req.user is from the protect middleware
  res.status(201).json(goal);
});

//@desc update Goals
//@route PUT api/goals/:id
//@access Private
const updateGoal = expressAsyncHandler(async (req, res) => {
  //Find the goal that needs to be updated
  const goal = await Goal.findById(req.params.id);

  //If no goal found
  if (!goal) {
    res.status(404);
    throw new Error('Goal not found!');
  }

  //Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc Delete Goals
//@route DELETE api/goals/:id
//@access Private
const deleteGoal = expressAsyncHandler(async (req, res) => {
  //Find the goal that needs to be deleted
  const goal = await Goal.findById(req.params.id);

  //If no goal found
  if (!goal) {
    res.status(404);
    throw new Error('Goal not found!');
  }

  //Get the logged-in user
  const user = await User.findById(req.user.id);

  //Check for the user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
