const huffmanCode = (weights) => {
  const Heap = require('../Heap');
  // the min heap stores all leaf nodes (prefixes) with minimum weight node at the root.
  const prefixMinHeap = new Heap((a, b) => a.weight < b.weight);

  // Create node for each symbol (with its weight property) and add to the min heap.
  for (let i = 0; i < weights.length; i++) {
    const node = new Node(`${i + 1}`, weights[i]);
    prefixMinHeap.add(node);
  }

  while (prefixMinHeap.size > 1) {
    // Extract two minimum weight nodes from the heap.
    const a = prefixMinHeap.poll(); // 1st min
    const b = prefixMinHeap.poll(); // 2nd min

    // Create a new internal node with weight = the sum of the weights of a & b.
    const newNode = new Node(`${a.symbol},${b.symbol}`, a.weight + b.weight);
    // Assign a as its left child, b as its right child.
    newNode.left = a;
    newNode.right = b;

    // Add the new internal node into the heap.
    prefixMinHeap.add(newNode);
  }

  const huffmanTree = prefixMinHeap.poll();
  const maxCodeLength = findMaxDepth(huffmanTree);
  const minCodeLength = findMinDepth(huffmanTree);

  return {maxCodeLength, minCodeLength};
}

const findMaxDepth = (tree) => {
  if (!tree) return 0;
  return Math.max(findMaxDepth(tree.left), findMaxDepth(tree.right)) + 1;
}

const findMinDepth = (tree) => {
  if (!tree) return 0;
  return Math.min(findMinDepth(tree.left), findMinDepth(tree.right)) + 1;
}

class Node {
  constructor(symbol, weight) {
    this.symbol = symbol;
    this.weight = weight;
    this.left = null;
    this.right = null;
  }
}


// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const weights = parseData('./3-3-huffman-coding.txt', '\n', 'num');
const numSymbols = weights[0];
weights.shift();

// RUN
console.log(huffmanCode(weights));
