const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////// sync and async read/write files //////////////////////

// blocking, synchronous technique //
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `Some info: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// nonblocking, asynchronous (yay!!) //
// fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
// 	if (error) return console.log('error~!');
// 	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
// 		console.log(data2);
// 		fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
// 			console.log(data3);

// 			fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
// 				console.log('File has been created.');
// 			});
// 		});
// 	});
// });
// console.log('Will read file...');

////////////////////// a simple web server //////////////////////

const server = http.createServer((req, res) => {
	const pathName = req.url;
	if (pathName === '/overview' || pathName === '/') {
		res.end('Welcome to the Overview');
	} else if (pathName === '/product') {
		res.end('These are the products');
	} else if (pathName === '/api') {
		res.end('JSON data goes here.');
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'a-custom-header': 'hello world',
		});
		res.end('<h1>Page cannot be found.</h1>');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Server listening for requests on port 8000');
});
