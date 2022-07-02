const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

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

const templateOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8'
);
const templateProduct = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	'utf-8'
);
const templateCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const parsedDataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	// overview page
	if (pathname === '/overview' || pathname === '/') {
		res.writeHead(200, {
			'Content-type': 'text/html',
		});

		const cardsHTML = parsedDataObject
			.map((element) => replaceTemplate(templateCard, element))
			.join('');

		const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML);

		res.end(output);
	}

	// product page
	else if (pathname === '/product') {
		res.writeHead(200, {
			'Content-type': 'text/html',
		});

		const product = parsedDataObject[query.id];
		const output = replaceTemplate(templateProduct, product);
		res.end(output);
	}

	// api
	else if (pathname === '/api') {
		res.writeHead(200, {
			'Content-type': 'application/json',
		});
		res.end(data);
	}

	// 404 page not found
	else {
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
