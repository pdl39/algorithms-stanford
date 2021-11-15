const Heap = require('../Heap');

// T: O(nlogn) --> O(logn) for insert: adding and polling from the heap takes log(n/2) operations in the worst case, corresponding to the height of the heap. Readjusting the balance between the two heaps takes additional logn operations. Getting the median takes constant time - O(1) - as we just need to look at the top value of the first heap. Since we insert n numbers, we need n * logn operations.
// S: O(n) --> we need two heaps, which each take n/2 of the numbers in the stream, for a combined n space.
// where n = # of numbers in the stream

const sumOfMediansModK = (arr) => {
  const firstHalf = new Heap((a, b) => a > b); // max heap
  const secondHalf = new Heap((a, b) => a < b); // min heap

  let sumOfKMedians = 0;

  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];

    if (firstHalf.size + secondHalf.size === 0 || x < firstHalf.peek()) {
      firstHalf.add(x);
    }
    else {
      secondHalf.add(x);
    }

    // Re-balance the two heaps when the difference between the two gets bigger than 1.
    // Note: we are keeping the first half heap to be the bigger heap in case of odd number of numbers added to the heap. (If n is odd, size of firstHalf > secondHalf by 1. If even, they are equal).
    while (firstHalf.size - secondHalf.size > 1) {
      const item = firstHalf.poll();
      secondHalf.add(item);
    }
    while (secondHalf.size > firstHalf.size) {
      const item = secondHalf.poll();
      firstHalf.add(item);
    }

    const kthMedian = firstHalf.peek();
    sumOfKMedians += kthMedian;
  }

  return sumOfKMedians % 10000;
}


// ASSIGNMENT INPUT
const parseData = require('../parseData');
const stream = parseData('./2-3-medianMaintenance.txt', '\n', 'num');

console.log(sumOfMediansModK(stream));
