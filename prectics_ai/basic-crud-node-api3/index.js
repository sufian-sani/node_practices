const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
];

// Routes
app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const book = getBookById(parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
});

app.post('/api/books', (req, res) => {
    const newBook = req.body;
    newBook.id = generateNewId();
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = getBookIndexById(bookId);
    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    books[index] = { ...books[index], ...updatedBook };
    res.json(books[index]);
});

app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = getBookIndexById(bookId);

    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
});

// Helper functions
function generateNewId() {
    return books.length > 0 ? Math.max(...books.map((book) => book.id)) + 1 : 1;
}

function getBookById(id) {
    return books.find((book) => book.id === id);
}

function getBookIndexById(id) {
    return books.findIndex((book) => book.id === id);
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
