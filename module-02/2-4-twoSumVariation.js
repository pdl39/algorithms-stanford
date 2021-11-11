const twoSumVariant = (nums) => {
  const sorted = nums.sort((a, b) => a - b);
  console.log(sorted);

  const seenTargets = new Set();

  const start = Date.now();
  for (let target = -10000; target < 10001; target++) {
    console.log({target});
    for (let i = 0; i < sorted.length; i++) {
      const y = target - sorted[i];

      if (y > sorted[sorted.length - 1]) continue;
      if (y < sorted[0]) continue;

      if (binarySearch(sorted, y) >= 0) {
        seenTargets.add(target);
      }
    }
  }

  const end = Date.now();
  console.log(`Runtime: ${(end - start)/1000}s`);

  return seenTargets.size;
}

const binarySearch = (arr, key) => {
  let low = 0;
  let high = arr.length - 1;

  if (key > arr[high] || key < arr[low]) return -1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === key) return mid;

    if (arr[mid] < key) {
      low = mid + 1;
    }
    else {
      high = mid - 1;
    }
  }

  return -1;
}


const parseData = require('../parseData');
const nums = parseData('./2-4-twoSumVariation.txt', '\n', 'num');

// console.log(nums);

console.log(twoSumVariant(nums))
