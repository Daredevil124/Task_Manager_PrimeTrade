const User = require('../models/auth');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { Name } = req.body; // Only allowing Name update as requested
        
        // Find user by ID (from token)
        let user = await User.findById(req.user.id);
        
        if (!user) {
             return res.status(404).json({ message: 'User not found' });
        }

        if (Name) user.Name = Name;

        await user.save();
        
        res.json({ message: 'Profile updated', user: { id: user._id, Name: user.Name, email: user.email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getProfile, updateProfile };