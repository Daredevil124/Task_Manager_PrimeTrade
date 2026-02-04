const express = require('express');
const router = express.Router();
const protect = require('../Middleware/auth');
const addTask = require('../controllers/addTask');
const editTask = require('../controllers/editTask');
const showTask = require('../controllers/showTask');
const deleteTask = require('../controllers/deleteTask');
const getTask = require('../controllers/getTask');

// Routes mapped to controllers
// Note: We use restful conventions where possible, but mapping to existing controller logic

router.get('/', protect, showTask); // Get all tasks
router.post('/', protect, addTask); // Add task
router.put('/', protect, editTask); // Edit task (ID in body)
router.delete('/', protect, deleteTask); // Delete task (ID in body)

// Single Entity Route (New)
router.get('/:id', protect, getTask); 

module.exports = router;