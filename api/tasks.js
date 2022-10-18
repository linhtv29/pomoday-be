const express = require('express')
const router = express.Router()
const {getTasks, updateTasks, createTasks} = require('../controllers/tasks')

router.route('/').get(getTasks).put(updateTasks).post(createTasks)

module.exports = router