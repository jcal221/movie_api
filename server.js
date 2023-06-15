const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);

  // Log the request URL and timestamp
  const logMessage = `${parsedUrl.pathname} - ${new Date().toISOString()}\n`;
  fs.appendFile('log.txt', logMessage, (error) => {
    if (error) {
      console.error('Failed to log request:', error);
    }
  });

  // Serve the requested file
  if (parsedUrl.pathname.includes('documentation')) {
    serveFile('documentation.html', response);
  } else {
    serveFile('index.html', response);
  }
});

function serveFile(fileName, response) {
  const filePath = './' + fileName;

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        response.writeHead(404);
        response.end('404 Not Found');
      } else {
        // Server error
        response.writeHead(500);
        response.end('500 Internal Server Error');
      }
    } else {
      // File found, serve it
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });
}

server.listen(8080, () => {
  console.log('Server is running on Port 8080');
});
