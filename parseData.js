const fs =  require('fs');
const path = require('path');

const parseData = (rawFilePath, split, parseType = 'original') => {
  const nums = fs.readFileSync(`${module.parent.path}/${rawFilePath}`, 'utf-8');
  const input = nums.split(split);
  input.pop();

  if (parseType !== 'original') {
    for (let i = 0; i < input.length; i++) {
      if (parseType === 'num') {
        input[i] = Number(input[i]);
      }
    }
  }

  return input;
}

module.exports = parseData;
