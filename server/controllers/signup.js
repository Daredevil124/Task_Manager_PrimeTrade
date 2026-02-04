const User = require('../models/auth');
const bcrypt = require('bcryptjs'); 
const saltRounds = 10;

const signup = async (req, res) => {
    try {
        const { Name, email, password } = req.body;

        if (!Name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const existing = await User.findOne({ email: email });
        if (existing) {
            return res.status(409).json({ message: "Email Already Exists" });
        } else {
            const hash = await bcrypt.hash(password, saltRounds);
            const newUser = new User({ email: email, password: hash, Name: Name });
            await newUser.save();
            res.status(201).json({ message: "New User Created!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
module.exports = signup;