const User = require("../models/User");
const Task = require("../models/Task");
const asyncWrapper = require("../helpers/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const HttpErrors = require('../helpers/HttpErrors')

const register = asyncWrapper(async (req, res) => {
  const isDuplicateName = await User.findOne({ userName: req.body.userName });
  if (isDuplicateName) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "This user name already existed!" });
  }
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  await Task.create({
    userId: user._id,
    userName: user.userName,
    authToken: token,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ userId: user._id });
});

const login = asyncWrapper(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Please provide email and password" });
  }
  const user = await User.findOne({ userName });
  if (!user) {
    throw new HttpErrors( "invalid user name or password", StatusCodes.BAD_REQUEST)
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new HttpErrors( "invalid user name or password", StatusCodes.BAD_REQUEST)
  }
  const token = user.createJWT();
	const data = await Task.findOne({userId: user._id})
  res.status(StatusCodes.OK).json({ userName: user.userName, authToken: token, tasks: data.tasks });
});

module.exports = {
  register,
  login,
};
