const dijkstrasAlgorithm = (V, graph, src, arr = null) => {
  const confirmedSet = new Array(V + 1).fill(false); // A set of explored vertices whose shortest paths from the source are confirmed as final.
  const spDistances = new Array(V + 1).fill(Infinity);

  spDistances[src] = 0; // the source vertex has the shortest path distance to itself of 0.

  for (let i = 1; i < V; i++) {
    const u = getMinDistVertex(V, confirmedSet, spDistances);
    confirmedSet[u] = true;

    for (const edge of graph[u]) {
      const v = edge[0];
      const dist = edge[1];
      const dijkstrasCriteria = spDistances[u] + dist;
      if (!confirmedSet[v]) {
        spDistances[v] = Math.min(dijkstrasCriteria, spDistances[v]);
      }
    }
  }

  // print the shortest path distances for the vertices specified by the argument arr.
  if (arr) {
    arr.forEach((v) => {
      console.log(spDistances[v]);
    });
  }

  return spDistances;
}

const getMinDistVertex = (V, confirmedSet, spDistances) => {
  let minDistance = Infinity;
  let minDistVertex = null;

  for (let v = 1; v < V + 1; v++) {
    if (!confirmedSet[v] && spDistances[v] <= minDistance) {
      minDistance = spDistances[v];
      minDistVertex = v;
    }
  }

  return minDistVertex;
}


// ASSIGNMENT INPUT
const parseData = require('../parseData');
const edges = parseData('./week2.txt', '\r\n');

// final parsing for edges.
for (let i = 0; i < edges.length; i++) {
  edges[i] = edges[i].split('\t').slice(1);
  edges[i].pop();

  for (let j = 0; j < edges[i].length; j++) {
      edges[i][j] = edges[i][j].split(',');
      edges[i][j][0] = Number(edges[i][j][0]);
      edges[i][j][1] = Number(edges[i][j][1]);
  }
}

// Adjacency list representation of the unput graph, with each edge a two-item array containing the dest vertex and the length between the src and the dest vertices.
const graph = new Array(edges.length + 1).fill(null);
edges.forEach((edge, idx) => {
  graph[idx + 1] = edge;
})

console.log(dijkstrasAlgorithm(200, graph, 1, [7, 37, 59, 82, 99, 115, 133, 165, 188, 197]));
