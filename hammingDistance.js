const hammingDist = (a, b) => {
  let xor = a ^ b;
  let diff = 0;

  while (xor ^ 0) {
    if (xor & 1 === 1) { // increment count if lsb of xor is 1.
      diff++;
    }
    xor >>= 1; // right shift xor by 1.
  }

  return diff;
}

// Brian Kernigan's Hamming Distance Algorithm.
const hammingDist2 = (a, b) => {
  let xor = a ^ b;
  let diff = 0;

  while (xor !== 0) {
    diff++;
    xor &= xor - 1;
  }

  return diff;
}

module.exports = {
  hammingDist,
  hammingDist2
};
