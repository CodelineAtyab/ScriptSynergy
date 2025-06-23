const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { userExists } = require('./user');

// In-memory storage for complaints with initial dummy data
let complaints = [
  {
    uuid: "7f9e7b5c-9d1a-4b8c-8d3e-6f5e4d3c2b1a",
    title: "jQuery Training Issue",
    time_in_epoch: 1662547200000, // Sept 7, 2022
    content: "The jQuery training lacks practical examples for handling complex AJAX requests with error handling.",
    by_user: "ahmed.balushi@example.com"
  },
  {
    uuid: "6a5b4c3d-2e1f-0g9h-8i7j-6k5l4m3n2o1p",
    title: "Outdated CSS Materials",
    time_in_epoch: 1675382400000, // Feb 3, 2023
    content: "Training materials on responsive design are outdated and don't cover modern CSS Grid techniques.",
    by_user: "fatima.farsi@example.com"
  },
  {
    uuid: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    title: "React Hooks Workshop Pacing",
    time_in_epoch: 1680307200000, // Apr 1, 2023
    content: "The React workshop moved too quickly through Hooks concepts without sufficient practice time.",
    by_user: "anonymous"
  },
  {
    uuid: "9z8y7x6w-5v4u-3t2s-1r0q-9p8o7n6m5l4k",
    title: "Node.js Code Example Issues",
    time_in_epoch: 1684886400000, // May 24, 2023
    content: "Code examples in the Node.js training have inconsistent formatting and some contain deprecated methods.",
    by_user: "anonymous"
  },
  {
    uuid: "2q3w4e5r-6t7y-8u9i-0o9p-1a2s3d4f5g6h",
    title: "API Security Concerns",
    time_in_epoch: 1691712000000, // Aug 11, 2023
    content: "The API development module doesn't include enough information about security best practices and authentication.",
    by_user: "mohammed.riyami@example.com"
  }
];

// GET all complaints
router.get('/', (req, res) => {
  res.json(complaints);
});

// GET specific complaint by UUID
router.get('/:uuid', (req, res) => {
  const complaint = complaints.find(c => c.uuid === req.params.uuid);
  
  if (!complaint) {
    return res.status(404).json({ message: 'Complaint not found' });
  }
  
  res.json(complaint);
});

// POST create a new complaint
router.post('/', (req, res) => {
  const { title, content, by_user = "anonymous" } = req.body;
  
  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }
  
  // Validate the by_user field
  if (by_user !== "anonymous" && !userExists(by_user)) {
    return res.status(400).json({ message: 'Invalid user email. Use "anonymous" or a valid user email.' });
  }
  
  const newComplaint = {
    uuid: uuidv4(),
    title: title || "Complaint " + new Date().toLocaleDateString(),
    time_in_epoch: Date.now(),
    content,
    by_user
  };
  
  complaints.push(newComplaint);
  res.status(201).json(newComplaint);
});

// PUT update a complaint
router.put('/:uuid', (req, res) => {
  const { title, content, by_user } = req.body;
  
  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }
  
  const complaintIndex = complaints.findIndex(c => c.uuid === req.params.uuid);
  
  if (complaintIndex === -1) {
    return res.status(404).json({ message: 'Complaint not found' });
  }
  
  // If by_user is provided, validate it
  if (by_user !== undefined) {
    if (by_user !== "anonymous" && !userExists(by_user)) {
      return res.status(400).json({ message: 'Invalid user email. Use "anonymous" or a valid user email.' });
    }
    complaints[complaintIndex].by_user = by_user;
  }
  
  complaints[complaintIndex].content = content;
  
  // Update title if provided
  if (title !== undefined) {
    complaints[complaintIndex].title = title;
  }
  
  res.json(complaints[complaintIndex]);
});

// DELETE a complaint
router.delete('/:uuid', (req, res) => {
  const initialLength = complaints.length;
  complaints = complaints.filter(c => c.uuid !== req.params.uuid);
  
  if (complaints.length === initialLength) {
    return res.status(404).json({ message: 'Complaint not found' });
  }
  
  res.status(204).send();
});

module.exports = router;
