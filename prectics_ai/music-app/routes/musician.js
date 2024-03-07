// routes/musician.js

const express = require('express');
const router = express.Router();
const { Musician } = require('../models');

// Get all musicians
router.get('/', async (req, res) => {
    try {
        const musicians = await Musician.findAll();
        res.json(musicians);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new musician
router.post('/', async (req, res) => {
    const { name, instrument } = req.body;
    try {
        const newMusician = await Musician.create({ name, instrument });
        res.status(201).json(newMusician);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
