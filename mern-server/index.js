// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 4000;

// middleware setup
app.use(cors());
app.use(express.json());

// import and use todo routes
const todoRoutes = require('./routes/todoroutes');
app.use('/api', todoRoutes);

// test route
app.get('/api/test', (req, res) => {
  console.log('GET /api/test endpoint was hit');
  res.send('Test endpoint is working');
});

// connect to mongoDB using mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// staring the express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
