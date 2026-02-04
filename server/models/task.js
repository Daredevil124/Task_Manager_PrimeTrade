const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Title: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Discarded', 'In Progress'],
        default: 'Pending',
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);