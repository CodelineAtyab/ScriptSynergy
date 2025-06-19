const express = require('express');
const complaintRoutes = require('./routes/complaint');
const { router: userRoutes } = require('./routes/user');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 9999;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use complaint routes
app.use('/complaints', complaintRoutes);

// Use complaint routes
app.use('/users', userRoutes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on 0.0.0.0:${PORT}`);
});
