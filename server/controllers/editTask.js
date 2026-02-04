const Task = require('../models/task');

const editTask = async (req, res) => {
    try {
        const { id, status, description, dueDate, Title } = req.body; // Expecting task ID in body or params? Ideally params.
        // Let's support ID in body for now as per previous logic, but strictly checking ownership.
        
        const userId = req.user.id;
        
        // Find task by ID and ensure it belongs to the user
        const taskData = await Task.findOne({ _id: id, userId: userId });

        if (!taskData) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (status !== undefined) taskData.status = status;
        if (description !== undefined) taskData.description = description;
        if (dueDate !== undefined) taskData.dueDate = dueDate;
        if (Title !== undefined) taskData.Title = Title;

        await taskData.save();
        res.status(200).json({ message: "Task Updated Successfully", task: taskData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
module.exports = editTask;