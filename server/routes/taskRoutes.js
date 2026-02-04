const express = require('express');
const router = express.Router();
const protect = require('../Middleware/auth');
const addTask = require('../controllers/addTask');
const editTask = require('../controllers/editTask');
const showTask = require('../controllers/showTask');
const deleteTask = require('../controllers/deleteTask');
const getTask = require('../controllers/getTask');



router.get('/', protect, showTask); 
router.post('/', protect, addTask); 
router.put('/', protect, editTask); 
router.delete('/', protect, deleteTask); 
router.get('/:id', protect, getTask); 

module.exports = router;