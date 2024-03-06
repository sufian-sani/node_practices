// index.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const Book = require('./Book');

const app = express();
const PORT = process.env.PORT || 3000;

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync the database models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
});

// Routes
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/books', async (req, res) => {
    const { title, author } = req.body;

    try {
        const newBook = await Book.create({ title, author });
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating a new book:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const { title, author } = req.body;

    try {
        const existingBook = await Book.findByPk(bookId);

        if (!existingBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await existingBook.update({ title, author });

        res.json(existingBook);
    } catch (error) {
        console.error('Error updating book:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/books/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const deletedBook = await Book.findByPk(bookId);

        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }

        await deletedBook.destroy();

        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
