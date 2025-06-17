const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for complaints
let complaints = [];

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
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }
  
  const newComplaint = {
    uuid: uuidv4(),
    time_in_epoch: Date.now(),
    content
  };
  
  complaints.push(newComplaint);
  res.status(201).json(newComplaint);
});

// PUT update a complaint
router.put('/:uuid', (req, res) => {
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }
  
  const complaintIndex = complaints.findIndex(c => c.uuid === req.params.uuid);
  
  if (complaintIndex === -1) {
    return res.status(404).json({ message: 'Complaint not found' });
  }
  
  complaints[complaintIndex].content = content;
  
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
