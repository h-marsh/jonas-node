const fs = require('fs');

// blocking, synchronous technique
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `Some info: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// nonblocking, asynchronous (yay!!)
fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
	if (error) return console.log('error~!');
	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
		console.log(data2);
		fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
			console.log(data3);

			fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
				console.log('File has been created.');
			});
		});
	});
});
console.log('Will read file...');
