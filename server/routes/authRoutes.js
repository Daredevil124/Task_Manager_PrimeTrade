const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup = require('../controllers/signup');
const { getProfile, updateProfile } = require('../controllers/profile');
const protect = require('../Middleware/auth');

router.post('/signup', signup);
router.post('/login', login);

router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);

module.exports = router;