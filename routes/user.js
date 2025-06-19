const express = require('express');
const router = express.Router();

// In-memory storage for users with initial dummy data
let users = [
  {
    email: "ahmed.balushi@example.com",
    username: "Ahmed Al-Balushi"
  },
  {
    email: "fatima.farsi@example.com",
    username: "Fatima Al-Farsi"
  },
  {
    email: "mohammed.riyami@example.com",
    username: "Mohammed Al-Riyami"
  },
  {
    email: "aisha.kharusi@example.com",
    username: "Aisha Al-Kharusi"
  },
  {
    email: "yusuf.siyabi@example.com",
    username: "Yusuf Al-Siyabi"
  }
];

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET specific user by email
router.get('/:email', (req, res) => {
  const user = users.find(u => u.email === req.params.email);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json(user);
});

// POST create a new user
router.post('/', (req, res) => {
  const { email, username } = req.body;
  
  if (!email || !username) {
    return res.status(400).json({ message: 'Email and username are required' });
  }
  
  // Check if email already exists
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }
  
  const newUser = { email, username };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update a user
router.put('/:email', (req, res) => {
  const { username } = req.body;
  
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  
  const userIndex = users.findIndex(u => u.email === req.params.email);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users[userIndex].username = username;
  
  res.json(users[userIndex]);
});

// DELETE a user
router.delete('/:email', (req, res) => {
  const initialLength = users.length;
  users = users.filter(u => u.email !== req.params.email);
  
  if (users.length === initialLength) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.status(204).send();
});

// Function to check if a user exists (exported for use in other routes)
const userExists = (email) => {
  return users.some(u => u.email === email);
};

module.exports = { router, userExists };
