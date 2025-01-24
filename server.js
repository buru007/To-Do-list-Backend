const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/taskRoutes');
require('dotenv').config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend's URL
}));

// Middleware to parse JSON request body
app.use(express.json());  // This ensures req.body is populated correctly

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('MongoDB connection error:', error));

  

