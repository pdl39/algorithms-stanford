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

    a.bit = '0';
    b.bit = '1';

    // Create a new internal node with weight = the sum of the weights of a & b.
    const newNode = new Node(`${a.symbol},${b.symbol}`, a.weight + b.weight);
    // Assign a as its left child, b as its right child.
    newNode.left = a;
    newNode.right = b;

    // Add the new internal node into the heap.
    prefixMinHeap.add(newNode);
  }

  const huffmanTree = prefixMinHeap.poll();

  const codeLen = {
    max: -Infinity,
    min: Infinity
  }

  getCode(huffmanTree, '', codeLen); // this will print the code for each symbol and get the max & min code lengths for the huffman tree in one pass. If we dont need to print codes, then we can just use the findMaxAndMinDepths function to get max & min code lengths:
  const [max, min] = findMaxAndMinDepths(huffmanTree);
  console.log({max, min});

  return {
    maxCodeLength: codeLen.max,
    minCodeLength: codeLen.min
  };
}

const getCode = (node, code, codeLen) => {
  const newCode = code + node.bit;

  if (node.left) {
    getCode(node.left, newCode, codeLen);
  }
  if (node.right) {
    getCode(node.right, newCode, codeLen);
  }

  if (!node.left && !node.right) {
    codeLen.max = Math.max(codeLen.max, newCode.length);
    codeLen.min = Math.min(codeLen.min, newCode.length);
    console.log(`Huffman Code for symbol ${node.symbol}:\n --> ${newCode}`);
  }
}

const findMaxAndMinDepths = (node) => {
  if (!node) return [-1, -1]; // Since depth is 0 for the root, we need to count from -1 for none nodes so that leaf nodes will start depth counting from 0.
  const [leftMaxDepth, leftMinDepth] = findMaxAndMinDepths(node.left);
  const [rightMaxDepth, rightMinDepth] = findMaxAndMinDepths(node.right);

  const maxDepth = Math.max(leftMaxDepth, rightMaxDepth) + 1;
  const minDepth = Math.min(leftMinDepth, rightMinDepth) + 1;
  return [maxDepth, minDepth];
}

class Node {
  constructor(symbol, weight) {
    this.symbol = symbol;
    this.weight = weight;
    this.left = null;
    this.right = null;
    this.bit = '';
  }
}


// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const weights = parseData('./3-3-huffman-coding.txt', '\n', 'num');
const numSymbols = weights[0];
weights.shift();

// RUN
console.log(huffmanCode(weights));
