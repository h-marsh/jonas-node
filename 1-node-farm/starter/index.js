const fs = require('fs');

// blocking, synchronous technique
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `Some info: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// nonblocking, asynchronous (yay!!)
fs.readFile('./txt/start.txt', 'utf-8', (error, data) => {
	console.log(data);
});
console.log('Will read file...');
