const kargerContractionAlgo = (graph) => {
  // parse data from input graph
  let V = graph.V;
  const E = graph.E;
  const edges = graph.edges;
  const subsets = new Array(V + 1).fill(null);
  const cutEdges = [];

  for (let v = 1; v < V + 1; v++) {
    subsets[v] = new Subset(v, 0);
  }

  while (V > 2) {
    // pick a random edge index to select a uniformly random edge.
    const i = Math.floor(Math.random() * E);

    // find the set of vertices (super nodes) in which each endpoint vertex of the selected edge belongs
    const subset1 = find(subsets, edges[i].u);
    const subset2 = find(subsets, edges[i].v);

    // if the two vertices belong to the same set, it means there is a cycle, or a self-loop.
    // we want to delete any self-loops, so we will just skip the current edge (don't bother contracting).
    if (subset1 === subset2) {
      continue;
    }

    // else, we will contract the two vertices.
    // Use the union method to contract (merge) the vertices.
    else {
      V--;
      union(subsets, subset1, subset2);
    }
  }

  // now that we have just two super nodes, we will find the crossing edges and tally count by looking at all the edges and see if they are conected to different vertices.
  let cuts = 0;
  const addedCutVertices = new Set();
  for (let i = 0; i < E; i++) {
    // get each of the endpoints of the edge
    const subset1 = find(subsets, edges[i].u);
    const subset2 = find(subsets, edges[i].v);
    // if an edge has different endpoints, it means it is a crossing edge.
    // we will account for possible duplicates as cut {A, B} is essentially same as cut {B, A}
    const isDuplicate = addedCutVertices.has(`${edges[i].v},${edges[i].u}`);

    if (subset1 !== subset2 && !isDuplicate) {
      addedCutVertices.add(`${edges[i].u},${edges[i].v}`);
      cutEdges.push([edges[i].u, edges[i].v]);
      cuts++;
    }
  }
  // console.log(addedCutVertices)

  return [cuts, cutEdges];
}

// Find will return the subset (the root/parent vertex) in which the vertex belongs.
const find = (subsets, vertex) => {
  if (subsets[vertex].parent !== vertex) {
    subsets[vertex].parent = find(subsets, subsets[vertex].parent);
  }

  return subsets[vertex].parent;
}

const union = (subsets, subset1, subset2) => {
  const v1Root = find(subsets, subset1);
  const v2Root = find(subsets, subset2);

  // Attach the subset with fewer vertices under the root of the subset with more vertices (higher rank subset retains the root).
  // Union by Rank.
  if (subsets[v1Root].rank < subsets[v2Root].rank) {
    subsets[v1Root].parent = v2Root;
  }
  else if (subsets[v1Root].rank > subsets[v2Root].rank) {
    subsets[v2Root].parent = v1Root;
  }
  // if both subsets have same rank, choose one to take the root and increment its rank bt 1.
  else {
    subsets[v2Root].parent = v1Root;
    subsets[v1Root].rank++;
  }
}

class Graph {
  constructor(V, E, vertices, edges) {
    this.V = V;
    this.E = E;
    this.vertices = vertices;
    this.edges = edges;
  }
}

class Edge {
  constructor(u, v) {
    this.u = u;
    this.v = v;
  }
}

// a subset of vertices to be used in union-find operations
class Subset {
  constructor(parent, rank) {
    this.parent = parent; // parent is the root vertex that wil represent the whole subset
    this.rank = rank; // we keep rank to do union by rank
  }
}

/***************** TEST CASES *******************/

// INPUT
const parseData = require('../parseData');
const input = parseData('1-4-kargersContractionAlgoMinCut.txt', '\r\n');
const edges = [];
const vertices = [];

// Parse to adjacency list - an array of edges [u, v]
for (let i = 0; i < input.length; i++) {
  input[i] = input[i].split('\t');

  input[i].pop();
  vertices.push(Number(input[i][0]));

  for (let j = 1; j < input[i].length; j++) {
    edges.push(new Edge(Number(input[i][0]), Number(input[i][j])));
  }
}

// console.log({input, vertices1, edges1})
const graph = new Graph(vertices.length, edges.length, vertices, edges);

// TC0
const vertices0 = [1, 2, 3, 4, 5, 6, 7, 8];
const edges0 = [new Edge(1, 2), new Edge(3, 4), new Edge(5, 6), new Edge(7, 8), new Edge(2, 4), new Edge(2, 5), new Edge(1, 3), new Edge(6, 8), new Edge(5, 7), new Edge(4, 7)];
const graph0 = new Graph(8, 10, vertices0, edges0);


// TC1
const tc1 = parseData('1-4-kargersContractionAlgoMinCut-tc1.txt', '\n');
const edges1 = [];
const vertices1 = [];

for (let i = 0; i < tc1.length; i++) {
  tc1[i] = tc1[i].split(' ');
  vertices1.push(Number(tc1[i][0]));

  for (let j = 1; j < tc1[i].length; j++) {
    edges1.push(new Edge(Number(tc1[i][0]), Number(tc1[i][j])));
  }
}

// console.log({vertices1, edges1})
const graph1 = new Graph(vertices1.length, edges1.length, vertices1, edges1);


// TC2
const tc2 = parseData('1-4-kargersContractionAlgoMinCut-tc2.txt', '\n');
const edges2 = [];
const vertices2 = [];

for (let i = 0; i < tc2.length; i++) {
  tc2[i] = tc2[i].split(' ');
  vertices2.push(Number(tc2[i][0]));

  for (let j = 1; j < tc2[i].length; j++) {
    edges2.push(new Edge(Number(tc2[i][0]), Number(tc2[i][j])));
  }
}

// console.log({tc2, vertices2, edges2})
const graph2 = new Graph(vertices2.length, edges2.length, vertices2, edges2);


// TC3
const tc3 = parseData('1-4-kargersContractionAlgoMinCut-tc3.txt', '\n');
const edges3 = [];
const vertices3 = [];

for (let i = 0; i < tc3.length; i++) {
  tc3[i] = tc3[i].split(' ');
  vertices3.push(Number(tc3[i][0]));

  for (let j = 1; j < tc3[i].length; j++) {
    edges3.push(new Edge(Number(tc3[i][0]), Number(tc3[i][j])));
  }
}

// console.log({tc3, vertices3, edges3})
const graph3 = new Graph(vertices3.length, edges3.length, vertices3, edges3);


// TC4
const tc4 = parseData('1-4-kargersContractionAlgoMinCut-tc4.txt', '\n');
const edges4 = [];
const vertices4 = [];

for (let i = 0; i < tc4.length; i++) {
  tc4[i] = tc4[i].split(' ');
  vertices4.push(Number(tc4[i][0]));

  for (let j = 1; j < tc4[i].length; j++) {
    edges4.push(new Edge(Number(tc4[i][0]), Number(tc4[i][j])));
  }
}

// console.log({tc4, vertices4, edges4})
const graph4 = new Graph(vertices4.length, edges4.length, vertices4, edges4);


// TC5
const tc5 = parseData('1-4-kargersContractionAlgoMinCut-tc5.txt', '\n');
const edges5 = [];
const vertices5 = [];

for (let i = 0; i < tc5.length; i++) {
  tc5[i] = tc5[i].split(' ');
  vertices5.push(Number(tc5[i][0]));

  for (let j = 1; j < tc5[i].length; j++) {
    edges5.push(new Edge(Number(tc5[i][0]), Number(tc5[i][j])));
  }
}

// console.log({tc5, vertices5, edges5})
const graph5 = new Graph(vertices5.length, edges5.length, vertices5, edges5);


// Repeated Runs
const multipleRuns = (graph, func, repetitions) => {
  let minCut = Infinity;
  let cutEdges = [];

  for (let i = 0; i < repetitions; i++) {
    const [newCut, newCutEdges] = func(graph);

    if (newCut < minCut) {
      minCut = newCut;
      cutEdges = newCutEdges;
    }
  }

  return [minCut, cutEdges];
}

// TEST
console.log('Running repeated runs of Karger\'s contraction algorithm...');
const start = Date.now();
console.log('minCut: ', multipleRuns(graph, kargerContractionAlgo, graph.V**2));
const end = Date.now();
console.log(`Time taken: ${(end - start)/1000}s`);

console.log('minCut: ', multipleRuns(graph0, kargerContractionAlgo, graph0.V**2*Math.log(graph0.V)));
console.log('minCut: ', multipleRuns(graph1, kargerContractionAlgo, graph1.V**2));
console.log('minCut: ', multipleRuns(graph2, kargerContractionAlgo, graph2.V**2));
console.log('minCut: ', multipleRuns(graph3, kargerContractionAlgo, graph3.V**2));
console.log('minCut: ', multipleRuns(graph4, kargerContractionAlgo, graph4.V**2));
console.log('minCut: ', multipleRuns(graph5, kargerContractionAlgo, graph5.V**2));
