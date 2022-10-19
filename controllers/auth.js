const User = require("../models/User");
const Task = require("../models/Task");
const asyncWrapper = require("../helpers/asyncWrapper");
const { StatusCodes } = require("http-status-codes");

const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
	const task = await Task.create({
		'userId': user._id,
		'userName': user.userName,
		'authToken': token
	})
  res.status(StatusCodes.CREATED).json({ user: { userName: user.userName }, token });
});

const login = asyncWrapper(async (req, res) => {
	const {userName, password} = req.body
	
	if (!userName || !password) {
		throw new Error('Please provide email and password')
	}
	const user = await User.findOne({userName})
	if (!user){
		throw new Error('invalid user name or password')
	}
	const isPasswordCorrect = await user.comparePassword(password)
	if (!isPasswordCorrect) {
		throw new Error('invalid user name or password')
	}
  const token = user.createJWT();
	res.status(StatusCodes.OK).json({ user: { userName: user.usesName }, token })
})

module.exports = {
	register, login
}