const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require('./config');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (err) => { console.error("Error connecting to database:", err) });
db.once('open', () => { console.log("Connected to Database!") });

// Routes
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// API Versioning
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/auth', authRoutes); // This will handle /api/v1/auth/signup, /login, /me

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});