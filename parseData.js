const fs =  require('fs');
const path = require('path');

const parseData = (rawFilePath) => {
  const nums = fs.readFileSync(`${__dirname}/${rawFilePath}`, 'utf-8');
  const input = nums.split('\r\n');
  input.pop();

  for (let i = 0; i < input.length; i++) {
    input[i] = Number(input[i]);
  }

  return input;
}

module.exports = parseData;
