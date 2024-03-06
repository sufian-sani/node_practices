const http = require('http');
const url = require('url');
const querystring = require('querystring');

let books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/api/books') {
        // Get all books
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
    } else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/api/books/')) {
        // Get a specific book
        const bookId = parseInt(parsedUrl.pathname.split('/')[3]);
        const book = books.find((book) => book.id === bookId);
        if (book) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(book));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
    } else if (req.method === 'POST' && parsedUrl.pathname === '/api/books') {
        // Create a new book
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });

        req.on('end', () => {
            const newBook = JSON.parse(data);
            newBook.id = books.length + 1;
            books.push(newBook);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newBook));
        });
    } else if (req.method === 'PUT' && parsedUrl.pathname.startsWith('/api/books/')) {
        // Update a book
        const bookId = parseInt(parsedUrl.pathname.split('/')[3]);
        const bookIndex = books.findIndex((book) => book.id === bookId);

        if (bookIndex !== -1) {
            let data = '';
            req.on('data', (chunk) => {
                data += chunk;
            });

            req.on('end', () => {
                const updatedBook = JSON.parse(data);
                books[bookIndex] = { ...books[bookIndex], ...updatedBook };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(books[bookIndex]));
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
    } else if (req.method === 'DELETE' && parsedUrl.pathname.startsWith('/api/books/')) {
        // Delete a book
        const bookId = parseInt(parsedUrl.pathname.split('/')[3]);
        const bookIndex = books.findIndex((book) => book.id === bookId);

        if (bookIndex !== -1) {
            const deletedBook = books.splice(bookIndex, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(deletedBook[0]));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Book not found' }));
        }
    } else {
        // Handle invalid routes
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid endpoint' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
