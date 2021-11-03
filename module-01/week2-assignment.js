const sortAndCount = (input) => {
  const n = input.length;
  if (n === 1) return [input, 0];

  const [sortedLeft, x] = sortAndCount(input.slice(0, n/2));
  const [sortedRight, y] = sortAndCount(input.slice(n/2));
  const [sortedInput, z] = countSplitInversions(input, sortedLeft, sortedRight);

  const count = x + y + z;

  return [sortedInput, count];
}


const countSplitInversions = (input, sortedLeftArr, sortedRightArr) => {
  let n = input.length;
  const sortedInput = new Array(n);
  let i = 0;
  let j = 0;
  let k = 0;
  let count = 0;

  for (let k = 0; k < n; k++) {
    if (i === sortedLeftArr.length) {
      while (j < sortedRightArr.length) {
        sortedInput[k] = sortedRightArr[j];
        k++;
        j++;
      }
      break;
    }

    if (j === sortedRightArr.length) {
      while (i < sortedLeftArr.length) {
        sortedInput[k] = sortedLeftArr[i];
        k++;
        i++;
      }
      break;
    }

    if (sortedLeftArr[i] <= sortedRightArr[j]) {
      sortedInput[k] = sortedLeftArr[i];
      i++;
    }
    else {
      count += sortedLeftArr.length - i;
      sortedInput[k] = sortedRightArr[j];
      j++;
    }
  }

  return [sortedInput, count];
}



const fs =  require('fs');

const nums = fs.readFileSync(`${__dirname}/week2-assignment.txt`, 'utf-8');
const input = nums.split('\r\n');
input.pop();
for (let i = 0; i < input.length; i++) {
  input[i] = Number(input[i]);
}

console.log(sortAndCount(input)[0]);
console.log(sortAndCount(input)[0][99999]);
console.log(sortAndCount(input)[1]);
console.log(sortAndCount([1, 5, 3])[1]);
console.log(sortAndCount([1, 5, 3, 2, 4])[1]);
console.log(sortAndCount([1, 3, 5, 2, 4, 6])[1]);
