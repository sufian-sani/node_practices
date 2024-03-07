// routes/album.js

const express = require('express');
const router = express.Router();
const { Album, Musician } = require('../models');

// Get all albums
router.get('/', async (req, res) => {
    try {
        const albums = await Album.findAll();
        res.json(albums);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new album
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

module.exports = router;
