const floydWarshall = (V, edges) => {
  const n = V + 1;
  // First, prepare the base matrix A for only direct edges between each vertex of the graph.
  const A = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < n; j++) {
      if (i === j) { // Self loops.
        A[i][j] = 0;
      }
      else {
        A[i][j] = edges[i][j] ?? Infinity;
      }
    }
  }

  // Now, we will go through all intermediate vertices {1, 2, ..., k} for all edge{i,j}.
  for (let k = 1; k < n; k++) {
    for (let i = 1; i < n; i++) {
      for (let j = 1; j < n; j++) {
        A[i][j] = Math.min(A[i][j], A[i][k] + A[k][j]);
      }
    }
  }

  // Check for negative cycle. If any of the diagonal slots (i = j) in A has a negative value, we have a negative cycle.
  const shortestOfShortest = {
    dist: Infinity,
    path: [],
    hasNegativeCycle: false
  }
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < n; j++) {
      if (i === j) {
        if (A[i][j] < 0) {
          shortestOfShortest.hasNegativeCycle = true;
          return shortestOfShortest;
        }
      }
      else {
        if (A[i][j] < shortestOfShortest.dist) {
          shortestOfShortest.dist = A[i][j];
          shortestOfShortest.path = [i, j];
        }
      }
    }
  }

  return shortestOfShortest;
}

// Compute the shortest of the shortest out of all graphs: 'findShortestOfAllShortest' takes as input an array of graphs, each of which is a two-item array of V and edges.
const findShortestOfAllShortest = (graphs) => {
  let theMin = {
    dist: Infinity,
    path: [],
    error: 'All graphs have negative cycle. No solution was computed.'
  };

  graphs.forEach((graph, idx) => {
    const shortest = floydWarshall(graph[0], graph[1]);
    if (!shortest.hasNegativeCycle) {
      theMin = shortest;
      theMin['g'] = idx + 1;
    }
  });

  if (theMin['error']) {
    throw new Error(theMin.error);
  }

  return theMin;
}


class Edge {
  constructor(u, v, dist) {
    this.u = u;
    this.v = v;
    this.dist = dist;
  }
}


// PRE-PROCESSING: ASSIGNMENT INPUTS (g1, g2, g3)
// g1
const parseData = require('../parseData');
const edgeNcosts = parseData('./4-1-floyd-warshall-g1.txt', '\n');
const V1 = Number(edgeNcosts[0].split(' ')[0]);
const E1 = Number(edgeNcosts[0].split(' ')[1]);
const edges1 = {};


for (let i = 1; i < edgeNcosts.length; i++) {
  edgeNcosts[i] = edgeNcosts[i].split(' ');

  const u = Number(edgeNcosts[i][0]);
  const v = Number(edgeNcosts[i][1]);
  const dist = Number(edgeNcosts[i][2]);

  if (!edges1[u]) {
    edges1[u] = {};
  }

  edges1[u][v] = dist;
}


// g2
const edgeNcosts2 = parseData('./4-1-floyd-warshall-g2.txt', '\n');
const V2 = Number(edgeNcosts2[0].split(' ')[0]);
const E2 = Number(edgeNcosts2[0].split(' ')[1]);
const edges2 = {};


for (let i = 1; i < edgeNcosts2.length; i++) {
  edgeNcosts2[i] = edgeNcosts2[i].split(' ');

  const u = Number(edgeNcosts2[i][0]);
  const v = Number(edgeNcosts2[i][1]);
  const dist = Number(edgeNcosts2[i][2]);

  if (!edges2[u]) {
    edges2[u] = {};
  }

  edges2[u][v] = dist;
}


// g3
const edgeNcosts3 = parseData('./4-1-floyd-warshall-g3.txt', '\n');
const V3 = Number(edgeNcosts3[0].split(' ')[0]);
const E3 = Number(edgeNcosts3[0].split(' ')[1]);
const edges3 = {};


for (let i = 1; i < edgeNcosts3.length; i++) {
  edgeNcosts3[i] = edgeNcosts3[i].split(' ');

  const u = Number(edgeNcosts3[i][0]);
  const v = Number(edgeNcosts3[i][1]);
  const dist = Number(edgeNcosts3[i][2]);

  if (!edges3[u]) {
    edges3[u] = {};
  }

  edges3[u][v] = dist;
}

// edges (adjacency list) data structure:
/*
{
  i: {
    j1: dist,
    j2: dist,
    ...
  },
  ...
}
*/

// console.log({vertices1, edges1}, V1, E1);
// console.log({vertices2, edges2}, V2, E2);
// console.log({vertices3, edges3}, V3, E3);

// console.log(edges1[334]);
// console.log(edges2[334]);
// console.log(edges3[334]);

// RUN
// console.log(floydWarshall(V1, edges1));
// console.log(floydWarshall(V2, edges2));
// console.log(floydWarshall(V3, edges3));

const graphs = [
  [V1, edges1],
  [V2, edges2],
  [V3, edges3]
]

// RUN
console.log(findShortestOfAllShortest(graphs));

