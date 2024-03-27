// routes/album.js

const express = require('express');
const router = express.Router();
const { Album, Musician } = require('../models');

// Get all albums
router.get('/', async (req, res) => {
    try {
        const albums = await Album.findAll({
            include: [
                {
                    model: Musician,
                    as: 'musician'
                }
            ]
        });
        res.json(albums);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get album by id
router.get('/:id', async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findByPk(albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE musician by ID
router.delete('/:id', async (req, res) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findByPk(albumId);

        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }

        await album.destroy();
        res.status(204).end(); // No content response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new album
router.post('/', async (req, res) => {
    const { title, releaseYear, musicianId } = req.body; // Make sure musicianId is provided
    try {
        // Check if the musicianId exists in the Musicians table
        const existingMusician = await Musician.findByPk(musicianId);
        if (!existingMusician) {
            return res.status(404).json({ error: 'Musician not found' });
        }

        const newAlbum = await Album.create({ title, releaseYear, musicianId });
        res.status(201).json(newAlbum);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update musician by ID
router.put('/:id', async (req, res) => {
    try {
        const albumId = req.params.id;
        const updatedData = req.body; // Assuming request body contains updated data

        // Find the musician by ID
        const album = await Album.findByPk(albumId);

        if (!album) {
            return res.status(404).json({ message: 'Musician not found' });
        }

        // Update musician data
        await album.update(updatedData);

        res.json({ message: 'Album updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
