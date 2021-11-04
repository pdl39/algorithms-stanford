const quickSortComparisons = (arr, pivotSelection, comparisons, l = 0, r = arr.length - 1) => {
  if (l >= r) return 0;

  const subarrayLen = r - l + 1;
  comparisons.count += subarrayLen - 1;

  const pivotIdx = partition(arr, l, r, pivotSelection);
  quickSortComparisons(arr, pivotSelection, comparisons, l, pivotIdx - 1);
  quickSortComparisons(arr, pivotSelection, comparisons, pivotIdx + 1, r);

  return comparisons.count;
}

const choosePivot = (arr, l, r, pivotToChoose) => {
  if (pivotToChoose === 'last') {
    [arr[l], arr[r]] = [arr[r], arr[l]];
  }
  else if (pivotToChoose === 'median') {
    const midpoint = l + Math.floor((r - l) / 2);

    const x = [arr[l], l];
    const y = [arr[r], r];
    const z = [arr[midpoint], midpoint];

    const sorted = [x, y, z].sort((a, b) => a[0] - b[0]);
    const pivotIdx = sorted[1][1];

    [arr[l], arr[pivotIdx]] = [arr[pivotIdx], arr[l]];
  }

  return arr[l];
}

const partition = (arr, l, r, pivotSelection) => {
  const pivot = choosePivot(arr, l, r, pivotSelection);
  let i = l + 1;
  for (let j = l + 1; j <= r; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[l], arr[i - 1]] = [arr[i - 1], arr[l]];
  return i - 1;
}


const parseData = require('../parseData');

// #1
let input = parseData('module-01/week3-assignment.txt');
console.log(input, input.length);
console.log(quickSortComparisons(input, 'first', {count: 0}));

// #2
input = parseData('module-01/week3-assignment.txt');
console.log(input, input.length);
console.log(quickSortComparisons(input, 'last', {count: 0}));

// #3
input = parseData('module-01/week3-assignment.txt');
console.log(input, input.length);
console.log(quickSortComparisons(input, 'median', {count: 0}));
