const primsMST = (V, graph) => {
  const mstVertices = new Array(V + 1).fill(false);
  const mstCosts = new Array(V + 1).fill(Infinity);
  const mst = new Array(V + 1).fill(null); // the MST graph (index = v, index value = u (parent))
  mstCosts[1] = 0; // Initialize the cost of the first vertex to 0 so that it will be picked first. Note: this is just an arbitrary choice; we're picking the first vertex for simplicity.

  for (let i = 1; i < V; i++) {
    const u = getMinCostVertex(V, mstVertices, mstCosts);
    mstVertices[u] = true; // include the minimum cost vertex to the set of MST vertices.

    for (const edge of graph[u]) {
      const v = edge[0];
      const cost = edge[1];

      // If a neighboring vertex (v) is NOT yet in the included set & the cost of the edge {u, v} is smaller than the current key cost of v, finalize the mst cost for v.
      if (!mstVertices[v]) {
        mstCosts[v] = Math.min(cost, mstCosts[v]);
        mst[v] = u;
      }
    }
  }

  // Sum all costs included in the MST.
  let mstCostSum = 0;
  for (let i = 1; i < mstCosts.length; i++) {
    mstCostSum += mstCosts[i]
  }

  return mstCostSum;
}

// From the set of not yet included vertices, get the vertex with the minimum cost edge.
const getMinCostVertex = (V, mstVertices, mstCosts) => {
  let minCostVertex = null;
  let minCost = Infinity;

  for (let v = 1; v < V + 1; v++) {
    if (!mstVertices[v] && mstCosts[v] < minCost) {
      minCost = mstCosts[v];
      minCostVertex = v;
    }
  }

  return minCostVertex;
}


// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const edgeNcosts = parseData('./3-1-prims.txt', '\n');
const graph = {};

const V = Number(edgeNcosts[0].split(' ')[0]);
const E = Number(edgeNcosts[0].split(' ')[1]);

for (let i = 1; i < edgeNcosts.length; i++) {
  edgeNcosts[i] = edgeNcosts[i].split(' ');

  const u = Number(edgeNcosts[i][0])
  const v = Number(edgeNcosts[i][1]);
  const cost = Number(edgeNcosts[i][2]);

  if (graph[u]) {
    graph[u].push([v, cost]);
  }
  else {
    graph[u] = [[v, cost]];
  }

  // Because we are looking at UNdirected graph, we must add the opposite edge (with same cost) as well.
  if (graph[v]) {
    graph[v].push([u, cost]);
  }
  else {
    graph[v] = [[u, cost]];
  }
}

// RUN
console.log(primsMST(V, graph));
