const Task = require('../models/task');

const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = getTask;