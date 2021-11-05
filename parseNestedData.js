const fs =  require('fs');
const path = require('path');

const parseData = (rawFilePath, split) => {
  const nums = fs.readFileSync(`${module.parent.path}/${rawFilePath}`, 'utf-8');
  const input = nums.split(split);
  input.pop();

  for (let i = 0; i < input.length; i++) {
    input[i] = input[i];
  }

  return input;
}

module.exports = parseData;
