const Task = require('../models/task');

const addTask = async (req, res) => {
    try {
        const { title, date, description, status } = req.body; 
        const userId = req.user.id; 

        if (!title || !date || !status) {
             return res.status(400).json({ message: "Title, Date and Status are required" });
        }

        const newTask = new Task({
            userId: userId,
            Title: title,
            dueDate: date,
            description: description,
            status: status
        });
        
        await newTask.save();
        res.status(201).json({ message: 'Task added Successfully', task: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
module.exports = addTask;