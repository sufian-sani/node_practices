const http = require('http');
const url = require('url');
const bodyParser = require('body-parser'); // Using body-parser outside of Express
const data = require('./data');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method.toUpperCase();

    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        let parsedBody = null;
        if (method === 'POST' || method === 'PUT') {
            try {
                parsedBody = JSON.parse(body);
            } catch (error) {
                res.statusCode = 400; // Bad request
                res.end('Invalid JSON format in request body');
                return;
            }
        }

        switch (path) {
            case '/data':
                if (method === 'GET') {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(data.getAllData()));
                } else if (method === 'POST') {
                    const addedItem = data.addData(parsedBody);
                    res.statusCode = 201; // Created
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(addedItem));
                } else {
                    res.statusCode = 405; // Method Not Allowed
                    res.end('Method not allowed');
                }
                break;
            case '/data/:id':
                const id = parsedUrl.pathname.split('/')[2];
                if (method === 'PUT') {
                    const updated = data.updateData(id, parsedBody);
                    if (updated) {
                        res.statusCode = 200; // OK
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(updated));
                    } else {
                        res.statusCode = 404; // Not Found
                        res.end('Data not found');
                    }
                } else if (method === 'DELETE') {
                    const deleted = data.deleteData(id);
                    if (deleted) {
                        res.statusCode = 200; // OK
                        res.end(JSON.stringify({ message: 'Data deleted successfully' }));
                    } else {
                        res.statusCode = 404; // Not Found
                        res.end('Data not found');
                    }
                } else {
                    res.statusCode = 405; // Method Not Allowed
                    res.end('Method not allowed');
                }
                break;
            default:
                res.statusCode = 404; // Not Found
                res.end('Not found');
        }
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
