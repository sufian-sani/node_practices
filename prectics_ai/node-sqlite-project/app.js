const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SQLite database setup
const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create a table (if not exists) to store data
db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
  )
`);

// Routes
app.get('/api/books', (req, res) => {
    // Retrieve all books from the SQLite database
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            console.error('Error fetching books from SQLite:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

app.post('/api/books', (req, res) => {
    // Insert a new book into the SQLite database
    const { title, author } = req.body;

    db.run('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], function (err) {
        if (err) {
            console.error('Error inserting a new book into SQLite:', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ id: this.lastID, title, author });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
