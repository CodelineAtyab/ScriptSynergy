const express = require('express');
const bodyParser = require('body-parser');
const complaintRoutes = require('./routes/complaint');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use complaint routes
app.use('/complaint', complaintRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
