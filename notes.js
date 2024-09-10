const express = require('express');
const Note = require('../models/Note');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to authenticate
const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Invalid token');
        req.userId = decoded.userId;
        next();
    });
};

// Create Note
router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = new Note({
            user: req.userId,
            title,
            content,
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get Notes
router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.userId });
        res.json(notes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update Note
router.put('/:id', auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!note) return res.status(404).send('Note not found');
        res.json(note);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete Note
router.delete('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).send('Note not found');
        res.send('Note deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
