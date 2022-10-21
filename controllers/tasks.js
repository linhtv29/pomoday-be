const Task = require('../models/Task')
const asyncWrapper = require('../helpers/asyncWrapper')

const getTasks = asyncWrapper(async (req, res) => {
	const userId = req.user.userId
	const task = await Task.find({userId})
	res.status(201).json({task})
})

const updateTasks = asyncWrapper(async (req, res) => {
	const userId = req.user.userId
	const tasksUpdated = {
		...req.body,
		userId
	}
	const task = await Task.findOneAndReplace({userId}, tasksUpdated)
	res.status(200).json({task})
})

const createTasks = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body)
	res.status(200).json({task})
})
module.exports = {
	getTasks,
	updateTasks,
	createTasks
}