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

// Get musician by id
router.get('/:id', async (req, res) => {
    try {
        const musicianId = req.params.id;
        const musician = await Musician.findByPk(musicianId);
        if (!musician) {
            return res.status(404).json({ message: 'Musician not found' });
        }
        res.json(musician);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE musician by ID
router.delete('/:id', async (req, res) => {
    try {
        const musicianId = req.params.id;
        const musician = await Musician.findByPk(musicianId);

        if (!musician) {
            return res.status(404).json({ message: 'Musician not found' });
        }

        await musician.destroy();
        res.status(204).end(); // No content response
    } catch (error) {
        res.status(500).json({ error: error.message });
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

// Update musician by ID
router.put('/:id', async (req, res) => {
    try {
        const musicianId = req.params.id;
        const updatedData = req.body; // Assuming request body contains updated data

        // Find the musician by ID
        const musician = await Musician.findByPk(musicianId);

        if (!musician) {
            return res.status(404).json({ message: 'Musician not found' });
        }

        // Update musician data
        await musician.update(updatedData);

        res.json({ message: 'Musician updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
