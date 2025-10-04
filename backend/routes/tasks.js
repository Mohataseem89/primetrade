const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  archiveTask,
  getTaskStats
} = require('../controllers/taskController');

const { protect, authorize } = require('../middleware/auth');
const { validateTask, validateTaskUpdate } = require('../middleware/validation');

const router = express.Router();

router.use(protect);

router.get('/stats', getTaskStats);

router
  .route('/')
  .get(getTasks)
  .post(validateTask, createTask);

router
  .route('/:id')
  .get(getTask)
  .put(validateTaskUpdate, updateTask)
  .delete(deleteTask);

router.patch('/:id/archive', archiveTask);

module.exports = router;
