const knapsackBig = (values, weights, capacity) => {
  const cache = new Array(values.length)
  .fill(null)
  .map(() => new Object());
  return knapsackBigRecursive(values, weights, 1, capacity, cache);
}

const knapsackBigRecursive = (values, weights, i, capacity, cache) => {
  if (capacity < 1 || i > values.length - 1) return 0;

  // If combination already seen, retrieve from cache.
  if (cache[i][capacity] > 0) {
    return cache[i][capacity];
  }

  // In any subset, we either exclude or include the current item.
  // #1: total value including the current item (we can only include if its weight is less than the remaining capacity):
  let value1 = 0;
  if (weights[i] <= capacity) {
    value1 = values[i] + knapsackBigRecursive(values, weights, i + 1, capacity - weights[i], cache);
  }

  // #2: total value excluding the current item:
  const value2 = knapsackBigRecursive(values, weights, i + 1, capacity, cache);

  cache[i][capacity] = Math.max(value1, value2);
  return cache[i][capacity];
}


// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const items = parseData('./3-4-knapsack2.txt', '\n');

const [capacity, numItems] = items[0].split(' ');

// values & weights have null 0 idx to match idx to item number.
const values = new Array(numItems + 1).fill(0);
const weights = new Array(numItems + 1).fill(0);

for (let i = 1; i < items.length; i++) {
  items[i] = items[i].split(' ');
  values[i] = Number(items[i][0]);
  weights[i] = Number(items[i][1]);
}

// RUN
const start = Date.now();
console.log('Running knapsack algorithm on huge input...');
console.log(knapsackBig(values, weights, capacity));
console.log(`Time taken: ${(Date.now() - start) / 1000}s`);
