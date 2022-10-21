const User = require("../models/User");
const Task = require("../models/Task");
const asyncWrapper = require("../helpers/asyncWrapper");
const { StatusCodes } = require("http-status-codes");

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
    .json({ userId: user._id});
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
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "invalid user name or password" });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "invalid user name or password" });
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ userName: user.userName, authToken: token });
});

module.exports = {
  register,
  login,
};
