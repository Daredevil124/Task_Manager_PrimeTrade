const Task = require('../models/task');

const deleteTask = async (req, res) => {
    try {
        const { id } = req.body; 
        const userId = req.user.id;
        
        const result = await Task.deleteOne({ _id: id, userId: userId });
        
        if (result.deletedCount === 0) {
             return res.status(404).json({ message: "Task not found or unauthorized" });
        }
        
        res.status(200).json({ message: 'Successfully Deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}
module.exports = deleteTask;