const express = require('express');
const router = express.Router();

let notes = [];

// Get all notes
router.get('/', (req, res) => {
  res.json(notes);
});

// Add a note
router.post('/', (req, res) => {
  const note = {
    id: Date.now(),
    text: req.body.text
  };
  notes.push(note);
  res.json(note);
});

// Delete a note
router.delete('/:id', (req, res) => {
  notes = notes.filter(n => n.id != req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
