const User = require('../models/auth');
const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const userData = await User.findOne({ email: email });
        if (!userData) {
            return res.status(401).json({ message: 'User not found' });
        }

        const passMatch = await bcrypt.compare(password, userData.password);
        if (passMatch) {
            const token = jwt.sign(
                { id: userData._id, email: userData.email, Name: userData.Name }, 
                config.JWT_SECRET,
                { expiresIn: '20h' }
            );
            res.json({ token, user: { id: userData._id, name: userData.Name, email: userData.email } });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
module.exports = login;