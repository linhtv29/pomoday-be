const Task = require('../models/Task')
const asyncWrapper = require('../helpers/asyncWrapper')

const getTasks = asyncWrapper(async (req, res) => {
	const task = await Task.find({})
	res.status(201).json({task})
})

const updateTasks = asyncWrapper(async (req, res) => {
	const task = await Task.findOneAndReplace({}, req.body)
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