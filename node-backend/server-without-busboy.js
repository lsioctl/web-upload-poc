const http = require('http');

const HOST = '127.0.0.1';
const PORT = '3000';

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        console.log('POST request');
        console.log(req.headers);

        let body = '';
        req.on('data', buffer => {
            // the data event returns a Buffer by default
            // https://millermedeiros.github.io/mdoc/examples/node_api/doc/streams.html
            console.log(buffer);
            // The Buffer class is a subclass of JavaScript's Uint8Array class and extends it with methods that cover additional use cases.
            // https://nodejs.org/api/buffer.html#buffer
            console.log(`reading a chunk of ${buffer.length}`);
            body += buffer.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            //console.log(body);
            res.end('ok');
        });
  }
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});