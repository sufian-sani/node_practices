// routes/author.js

const express = require('express');
const router = express.Router();
const Author = require('./Author');

// Get all authors
router.get('/', async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a specific author by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.json(author);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new author
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newAuthor = await Author.create({ name });
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an existing author by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const [updatedRowsCount] = await Author.update({ name }, { where: { id } });
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.json({ message: 'Author updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an author by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowCount = await Author.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
