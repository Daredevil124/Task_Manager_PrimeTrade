import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState({ Title: '', description: '', status: 'Pending', dueDate: '' });
    const [showForm, setShowForm] = useState(false);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            const data = await res.json();
            if (res.ok) {
                setTasks(data.taskData);
            }
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            
            
            const res = await api.delete('/tasks', { id });
            if (res.ok) {
                setTasks(tasks.filter(t => t._id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditClick = (task) => {
        setIsEditing(true);
        setCurrentTask({ ...task, dueDate: task.dueDate ? task.dueDate.split('T')[0] : '' });
        setShowForm(true);
    };

    const handleAddNewClick = () => {
        setIsEditing(false);
        setCurrentTask({ Title: '', description: '', status: 'Pending', dueDate: '' });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (isEditing) {
                // Backend editTask expects: { id, status, description, dueDate, Title }
                res = await api.put('/tasks', { 
                    id: currentTask._id,
                    Title: currentTask.Title,
                    description: currentTask.description,
                    status: currentTask.status,
                    dueDate: currentTask.dueDate
                });
            } else {
                // Backend addTask expects: { title, date, description, status }
                res = await api.post('/tasks', {
                    title: currentTask.Title,
                    date: currentTask.dueDate,
                    description: currentTask.description,
                    status: currentTask.status
                });
            }

            if (res.ok) {
                setShowForm(false);
                fetchTasks(); // Refresh list
            } else {
                const data = await res.json();
                alert(data.message || "Operation failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600 hidden sm:inline">Welcome, {user?.Name}</span>
                    <Link to="/profile" className="text-blue-500 hover:text-blue-700">Profile</Link>
                    <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
                </div>
            </nav>

            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">My Tasks</h2>
                    <button 
                        onClick={handleAddNewClick}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 shadow"
                    >
                        + Add Task
                    </button>
                </div>

                {/* Form Modal/Section */}
                {showForm && (
                    <div className="bg-white p-6 rounded shadow-lg mb-6 border border-gray-200">
                        <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Task' : 'New Task'}</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold mb-1">Title</label>
                                <input 
                                    className="w-full border p-2 rounded" 
                                    value={currentTask.Title} 
                                    onChange={e => setCurrentTask({...currentTask, Title: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold mb-1">Description</label>
                                <textarea 
                                    className="w-full border p-2 rounded" 
                                    value={currentTask.description} 
                                    onChange={e => setCurrentTask({...currentTask, description: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Due Date</label>
                                <input 
                                    type="date" 
                                    className="w-full border p-2 rounded" 
                                    value={currentTask.dueDate} 
                                    onChange={e => setCurrentTask({...currentTask, dueDate: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Status</label>
                                <select 
                                    className="w-full border p-2 rounded" 
                                    value={currentTask.status} 
                                    onChange={e => setCurrentTask({...currentTask, status: e.target.value})}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Discarded">Discarded</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tasks.length === 0 && <p className="text-gray-500">No tasks found. Create one!</p>}
                    {tasks.map(task => (
                        <div key={task._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-lg mb-2">{task.Title}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
                            </div>
                            <div>
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                    <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No Date'}</span>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {task.status}
                                    </span>
                                </div>
                                <div className="flex justify-end gap-2 pt-2 border-t">
                                    <button onClick={() => handleEditClick(task)} className="text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
                                    <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;