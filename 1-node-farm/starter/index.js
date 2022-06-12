const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `Some info: ${textIn}. \nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);
