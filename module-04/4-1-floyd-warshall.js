const floydWarshall = (V, vertices, edges) => {
  // First, prepare the base matrix A for only direct edges between each vertex of the graph.
  //
  const A = new Array(V + 1).fill(null).map(() => new Array(V + 1).fill(Infinity));
  for (let i = 1; i < V + 1; i++) {
    for (let j = 1; j < V + 1; j++) {
      A[i, j] = edges[i][j]['dist'] ?? Infinity;
    }
  }
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
let vertices1 = new Set();


for (let i = 1; i < edgeNcosts.length; i++) {
  edgeNcosts[i] = edgeNcosts[i].split(' ');

  const u = Number(edgeNcosts[i][0]);
  const v = Number(edgeNcosts[i][1]);
  const dist = Number(edgeNcosts[i][2]);

  if (!edges1[u]) {
    edges1[u] = {};
  }

  edges1[u][v] = dist;
  vertices1.add(u);
  vertices1.add(v);
}
vertices1 = Array.from(vertices1);


// g2
const edgeNcosts2 = parseData('./4-1-floyd-warshall-g2.txt', '\n');
const V2 = Number(edgeNcosts2[0].split(' ')[0]);
const E2 = Number(edgeNcosts2[0].split(' ')[1]);
const edges2 = {};
let vertices2 = new Set();


for (let i = 1; i < edgeNcosts2.length; i++) {
  edgeNcosts2[i] = edgeNcosts2[i].split(' ');

  const u = Number(edgeNcosts2[i][0]);
  const v = Number(edgeNcosts2[i][1]);
  const dist = Number(edgeNcosts2[i][2]);

  if (!edges2[u]) {
    edges2[u] = {};
  }

  edges2[u][v] = dist;
  vertices2.add(u);
  vertices2.add(v);
}
vertices2 = Array.from(vertices2);


// g3
const edgeNcosts3 = parseData('./4-1-floyd-warshall-g3.txt', '\n');
const V3 = Number(edgeNcosts3[0].split(' ')[0]);
const E3 = Number(edgeNcosts3[0].split(' ')[1]);
const edges3 = {};
let vertices3 = new Set();


for (let i = 1; i < edgeNcosts3.length; i++) {
  edgeNcosts3[i] = edgeNcosts3[i].split(' ');

  const u = Number(edgeNcosts3[i][0]);
  const v = Number(edgeNcosts3[i][1]);
  const dist = Number(edgeNcosts3[i][2]);

  if (!edges3[u]) {
    edges3[u] = {};
  }

  edges3[u][v] = dist;
  vertices3.add(u);
  vertices3.add(v);
}
vertices3 = Array.from(vertices3);

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
// console.log(floydWarshall(V1, vertices1, edges1));
// console.log(floydWarshall(V2, vertices2, edges2));
// console.log(floydWarshall(V3, vertices3, edges3));

