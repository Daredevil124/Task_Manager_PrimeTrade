const Task = require('../models/task');

const showTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const taskData = await Task.find({ userId: userId });
        res.status(200).json({ taskData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
module.exports = showTask;