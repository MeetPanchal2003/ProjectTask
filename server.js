const { createServer } = require('http');
const { spawn } = require('child_process');

createServer((req, res) => {
    const jsonServer = spawn('json-server', ['--watch', 'Vendor.json']);
    
    jsonServer.stdout.pipe(res);
}).listen(3030); // Adjust the port as necessary

console.log('JSON Server running at http://localhost:3000/');
