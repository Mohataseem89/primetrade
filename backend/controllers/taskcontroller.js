const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const Task = require('../models/Task');
const User = require('../models/User');


exports.getTasks = asyncHandler(async (req, res, next) => {
  let query = {};

  if (req.user.role !== 'admin') {
    query.user = req.user.id;
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  if (req.query.priority) {
    query.priority = req.query.priority;
  }

  if (req.query.user && req.user.role === 'admin') {
    query.user = req.query.user;
  }

  if (req.query.includeArchived !== 'true') {
    query.isArchived = false;
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;

  const total = await Task.countDocuments(query);
  const tasks = await Task.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(startIndex);

  const pagination = {};
  if (startIndex + limit < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  res.status(200).json({
    success: true,
    count: tasks.length,
    total,
    pagination,
    data: tasks
  });
});


exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate('user', 'name email');

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  if (task.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this task'
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
});


exports.createTask = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  req.body.user = req.user.id;

  if (req.body.assignTo && req.user.role === 'admin') {
    const assignedUser = await User.findById(req.body.assignTo);
    if (!assignedUser) {
      return res.status(404).json({
        success: false,
        message: 'User to assign task not found'
      });
    }
    req.body.user = req.body.assignTo;
    req.body.assignedBy = req.user.id;
  }

  const task = await Task.create(req.body);
  
  await task.populate('user', 'name email');

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task
  });
});


exports.updateTask = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this task'
    });
  }

  delete req.body.user;
  delete req.body.assignedBy;

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('user', 'name email');

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task
  });
});


exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

 
  if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to delete this task'
    });
  }

  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully'
  });
});


exports.archiveTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }

  
  if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to archive this task'
    });
  }

  task.isArchived = !task.isArchived;
  await task.save();

  res.status(200).json({
    success: true,
    message: `Task ${task.isArchived ? 'archived' : 'unarchived'} successfully`,
    data: task
  });
});


exports.getTaskStats = asyncHandler(async (req, res, next) => {
  let matchQuery = {};

  if (req.user.role !== 'admin') {
    matchQuery.user = req.user._id;
  }

  const stats = await Task.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalTasks = await Task.countDocuments(matchQuery);
  const overdueTasks = await Task.countDocuments({
    ...matchQuery,
    dueDate: { $lt: new Date() },
    status: { $ne: 'completed' }
  });

  const formattedStats = {
    total: totalTasks,
    overdue: overdueTasks,
    byStatus: stats.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {})
  };

  res.status(200).json({
    success: true,
    data: formattedStats
  });
});
