const kargersMinCut = (graph) => {
  // parse data from input graph
  let V = graph.V;
  const E = graph.E;
  const edges = graph.edges;
  const subsets = new Array(V + 1).fill(0);
  const cutEdges = [];

  for (let v = 1; v < V + 1; v++) {
    subsets[v] = new Subset(v, 0);
  }

  let vertices = V;

  while (vertices > 2) {
    // pick a random edge index to select a uniformly random edge.
    const i = Math.floor(Math.random() * E);

    // find the set of vertices (super node) of each endpoint of the selected edge
    const subset1 = find(subsets, edges[i].u);
    const subset2 = find(subsets, edges[i].v);

    // if the two vertices hbelong to the same set, it means there is a cycle, or a self-loop.
    // we want to delete any self-loops, so we will just skip the current edge (don't bother contracting).
    if (subset1 === subset2) {
      continue;
    }

    // else, we will contract the two vertices.
    // Use the union method to contract (merge) the vertices.
    else {
      vertices--;
      union(subsets, subset1, subset2);
    }
  }

  // now that we have just two super nodes, we will find the crossing edges and tally count by looking at all the edges and see if they are conected to different vertices.
  let cuts = 0;
  for (let i = 0; i < E; i++) {
    // get each of the endpoints of the edge
    const subset1 = find(subsets, edges[i].u);
    const subset2 = find(subsets, edges[i].v);
    // if an edge has different endpoints, it means it is a crossing edge.
    if (subset1 !== subset2) {
      cutEdges.push([subset1, subset2]);
      cuts++;
    }
  }

  return [cuts, cutEdges];
}

const find = (subsets, vertex) => {
  const i = vertex;
  if (subsets[i].parent !== vertex) {
    subsets[i].parent = find(subsets, subsets[i].parent);
  }

  return subsets[i].parent;
}

const union = (subsets, subset1, subset2) => {
  const v1Root = find(subsets, subset1);
  const v2Root = find(subsets, subset2);

  // Attach the subset with fewer vertices under the root of the subset with more vertices (higher rank).
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
    this.parent = parent;
    this.rank = rank;
  }
}

// INPUT
const parseData = require('../parseNestedData');
const input = parseData('week4-assignment.txt', '\r\n');
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

const graph = new Graph(vertices.length, edges.length, vertices, edges);

// TC0
const vertices0 = [1, 2, 3, 4, 5, 6, 7, 8];
const edges0 = [new Edge(1, 2), new Edge(3, 4), new Edge(5, 6), new Edge(7, 8), new Edge(2, 4), new Edge(2, 5), new Edge(1, 3), new Edge(6, 8), new Edge(5, 7), new Edge(4, 7)];
const graph0 = new Graph(8, 10, vertices0, edges0);


// TC1
const tc1 = parseData('week4-tc1.txt', '\n');
const edges1 = [];
const vertices1 = [];

console.log(tc1)

for (let i = 0; i < tc1.length; i++) {
  tc1[i] = tc1[i].split(' ');
  vertices1.push(Number(tc1[i][0]));

  for (let j = 1; j < tc1[i].length; j++) {
    edges1.push(new Edge(Number(tc1[i][0]), Number(tc1[i][j])));
  }
}

console.log({vertices1, edges1})

const graph1 = new Graph(vertices1.length, edges1.length, vertices1, edges1);


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
    if (newCut === minCut) {
      cutEdges.push(newCutEdges);
      console.log({newCut, newCutEdges});
    }
  }

  return [minCut, cutEdges];
}

// TEST
// console.log('minCut: ', multipleRuns(graph, kargersMinCut, graph.V**2));
// console.log('minCut: ', multipleRuns(graph0, kargersMinCut, graph0.V**2*Math.log(graph0.V)));
console.log('minCut: ', multipleRuns(graph1, kargersMinCut, graph1.V**2*Math.log(graph1.V)));
