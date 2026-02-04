const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require('./config');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// DB Connection

const connectDB = async () => {

    try {

        const conn = await mongoose.connect(config.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {

        console.error(`Error: ${error.message}`);

        console.error("Please check your .env file and ensure MongoDB is running.");

    }

};

connectDB();

// Routes
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// API Versioning
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/auth', authRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});