const http = require('http');

const busboy = require('busboy');

const HOST = '127.0.0.1';
const PORT = '3000';

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    console.log('POST request');
    console.log(req.headers);

    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      console.log(
        `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
        filename,
        encoding,
        mimeType
      );
      // AFAIU we are working with Node Read Streams, so we get
      // file by chunk, even if the client submit all the data once
      // for example with on submit and 
      // 'content-length': '192577'
      // we have:
      // File [file2]: filename: "...", encoding: "7bit", mimeType: "image/png"
      // File [file2] got 64792 bytes
      // File [file2] got 65482 bytes
      // File [file2] got 62074 bytes
      // File [file2] done
      // Done parsing form!
      file.on('data', (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      }).on('close', () => {
        console.log(`File [${name}] done`);
      });
    });

    bb.on('close', () => {
      console.log('Done parsing form!');
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end();
    });

    req.pipe(bb);
  }
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});