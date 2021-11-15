const knapsack = (values, weights, capacity) => {
  const n = values.length - 1;
  const dp = new Array(n + 1)
  .fill([])
  .map(() => new Array(capacity + 1).fill(0));

  for (let i = 0; i < n + 1; i++) {
    for (c = 0; c < capacity + 1; c++) {
      if (i === 0 || c === 0) dp[i][c] = 0;
      else if (weights[i] > c) {
        dp[i][c] = dp[i - 1][c];
      }
      else {
        dp[i][c] = Math.max(dp[i - 1][c], dp[i - 1][c - weights[i]] + values[i]);
      }
    }
  }

  return dp[n][capacity];
}

// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const items = parseData('./3-4-knapsack.txt', '\n');

const [capacity, numItems] = items[0].split(' ');

// values & weights have null 0 idx to match idx to item number.
const values = new Array(numItems + 1).fill(0);
const weights = new Array(numItems + 1).fill(0);

for (let i = 1; i < items.length; i++) {
  items[i] = items[i].split(' ');
  values[i] = Number(items[i][0]);
  weights[i] = Number(items[i][1]);
}

console.log({values, weights});

// RUN
console.log(knapsack(values, weights, capacity));
