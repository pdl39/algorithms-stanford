const maxWeightIndpSet = (weights) => {
  // 'Independent' set of a path (linear) graph means you can't have two contiguous vertices.
  // weights[0] holds the value of the total # of vertices. Vertex 1 is at index 1, and so on.
  const V = weights[0];
  const A = new Array(V + 1); // This is the array that stores the running max weights at each vertex i. The max weight value at the last index (corresponding to the last vertex) will represent the max weight value for the max weight independent set for the given path graph.

  // For an independent set subproblem, we can either include or not include the current vertex.
  // weight for indp set excluding vertex i = A[i - 1]
  // weight for indp set including vertex i = A[i - 2] + weight(i)

  // Fill in the smallest sub problems (A[1] and A[2])
  A[0] = 0;
  A[1] = weights[1];
  A[2] = Math.max(A[1], weights[2]);
  for (let i = 3; i < V + 1; i++) {
    A[i] = Math.max(A[i - 1], A[i - 2] + weights[i]);
  }

  const independentSet = reconstructIndpSet(A, weights);
  const assignmentVertexCheckList = [1, 2, 3, 4, 17, 117, 517, 997];
  const answer = [];
  assignmentVertexCheckList.forEach(vertex => {
    if (independentSet.has(vertex)) {
      answer.push(1);
    }
    else {
      answer.push(0);
    }
  });

  return {
    maxWeight: A[V],
    independentSet,
    assignmentAnswer: answer.join('')
  };
}

const reconstructIndpSet = (A, weights) => {
  let i = A.length - 1;
  const indpSet = new Set();

  while (i > 0) {
    const prevWeight = A[i - 1];
    const prev2Weight = i > 1 ? A[i - 2] : 0;

    if (prevWeight >= (prev2Weight + weights[i])) { // Case 1: vertex i was NOT included.
      i --;
    }
    else { // Case 2: vertex i was included.
      indpSet.add(i);
      i -= 2;
    }
  }

  return indpSet;
}


// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const weights = parseData('./3-3-max-weight-indp-set.txt', '\n', 'num');

// RUN
console.log(maxWeightIndpSet(weights));
console.log(maxWeightIndpSet(weights));
