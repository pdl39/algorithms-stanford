// Kosaraju's SCC Algorithm: 2-pass DFS
// 1st pass: DFS on the reverse of the graph to get an ordering of the finishing times of vertices.
// 2nd pass: Using the finishing times, compute the strongly connected components.


const twoSat = (clauses) => {
  const n = clauses[0][0]; // # of vertices & clauses.

  // 1st pas DFS on the reverse of the input graph.
  // Goal of the first pass is to get an ordering of vertices to traverse in the 2nd pass.
  const graphR = createGraph(clauses, true);
  const visitedR = new Array(2 * n).fill(false);
  const orderStack = [];

  for (let i = 2 * n; i > 0; i--) {
    if (!visitedR[i]) {
      dfs1(graphR, i, visitedR, orderStack);
    }
  }

  // 2nd pass DFS on the original input graph.
  // Run dfs starting with the last vertex in the ordering, keeping track of the current scc (the leader vertex of the current scc) for each dfs call, which will guarantee the correct computation of all strongly connected components.
  const graph = createGraph(clauses);
  const visited = new Array(2 * n).fill(false);
  const sccs = new Array(2 * n).fill(null);
  let currentScc = null;

  while (orderStack.length > 0) {
    const v = orderStack.pop();

    if (!visited[v]) {
      currentScc = new Scc(v);
      dfs2(graph, v, visited, sccs, currentScc);
    }
  }

  // loop through to see if x and x_bar are in the same scc.
  // If they are in the same scc, the problem is NOT satisfiable.
  for (let i = 0; i < n; i++) {
    if (sccs[i]) {
      if (sccs[i] === sccs[i + n]) {
        return 0; // NOT Satisfiable
      }
    }
  }
  return 1; // Satisfiable
}


const dfs1 = (graph, i, visited, orderStack) => {
  visited[i] = true;

  if (graph[i]) {
    for (const j of graph[i]) {
      if (!visited[j]) {
        dfs1(graph, j, visited, orderStack);
      }
    }
  }

  orderStack.push(Number(i));
}

const dfs2 = (graph, i, visited, sccs, currentScc) => {
  visited[i] = true;

  if (graph[i]) {
    for (const j of graph[i]) {
      if (!visited[j]) {
        dfs2(graph, j, visited, sccs, currentScc);
      }
    }
  }

  sccs[i] = currentScc.leader;
  currentScc.size++;
}


const addEdges = (adj, u, v) => {
  if (adj[u]) {
    adj[u].push(v);
  }
  else {
    adj[u] = [v];
  }
}

// Create an adjacency list using the vertices from the clauses.
// The optional second argument specifies whether to create inverse(true) or original graph.
const createGraph = (clauses, reverse = false) => {
  const n = clauses[0][0]; // # of vertices & clauses.
  const graph = new Array(2 * n).fill(null);

  // create adjacency list
  for (let i = 1; i < n + 1; i++) {
    const u = clauses[i][0];
    const v = clauses[i][1];

    // variable x is mapped to x
    // (e.g. u = u)
    // variable -x is mapped to x + n = n - (-x)
    // (e.g. -u = u + n, --v = n - v)

    // For (u V v) to be true,
    // if u = 0, then v must be 1
    // if v = 0, then u must be 1
    // Thus, for all vertices u or v of a clause (u V v),
    // (-u -> v) AND (-v -> u)

    if (u > 0 && v > 0) {
      if (!reverse) {
        addEdges(graph, u + n, v); // edge 1
        addEdges(graph, v + n, u); // edge 2
      }
      else {
        addEdges(graph, v, u + n); // Inverse
        addEdges(graph, u, v + n); // Inverse
      }
    }

    else if (u > 0 && v < 0) {
      if (!reverse) {
        addEdges(graph, u + n, n - v); // edge 1
        addEdges(graph, -v, u); // edge 2
      }
      else {
        addEdges(graph, n - v, u + n); // Inverse
        addEdges(graph, u, -v); // Inverse
      }
    }

    else if (u < 0 && v > 0) {
      if (!reverse) {
        addEdges(graph, -u, v); // edge 1
        addEdges(graph, v + n, n - u); // edge 2
      }
      else {
        addEdges(graph, v, -u); // Inverse
        addEdges(graph, n - u, v + n); // Inverse
      }
    }

    else {
      if (!reverse) {
        addEdges(graph, -u, n - v); // edge 1
        addEdges(graph, -v, n - u); // edge 2
      }
      else {
        addEdges(graph, n - v, -u); // Inverse
        addEdges(graph, n - u, -v); // Inverse
      }
    }
  }

  return graph;
}

class Scc {
  constructor(i) {
    this.leader = i;
    this.size = 0;
  }
}


// PRE-PROCESSING: ASSIGNMENT INPUT (2sat1 ~ 6)
const parseData = require('../parseData');

// 2sat1
const clauses1 = parseData('4-4-2sat-1.txt', '\n');

// final parsing for clauses1.
for (let i = 0; i < clauses1.length; i++) {
  clauses1[i] = clauses1[i].split(' ');

  for (let j = 0; j < clauses1[i].length; j++) {
    clauses1[i][j] = Number(clauses1[i][j]);
  }
}

// 2sat2
const clauses2 = parseData('4-4-2sat-2.txt', '\n');

// final parsing for clauses2.
for (let i = 0; i < clauses2.length; i++) {
  clauses2[i] = clauses2[i].split(' ');

  for (let j = 0; j < clauses2[i].length; j++) {
    clauses2[i][j] = Number(clauses2[i][j]);
  }
}

// 2sat3
const clauses3 = parseData('4-4-2sat-3.txt', '\n');

// final parsing for clauses3.
for (let i = 0; i < clauses3.length; i++) {
  clauses3[i] = clauses3[i].split(' ');

  for (let j = 0; j < clauses3[i].length; j++) {
    clauses3[i][j] = Number(clauses3[i][j]);
  }
}

// 2sat4
const clauses4 = parseData('4-4-2sat-4.txt', '\n');

// final parsing for clauses4.
for (let i = 0; i < clauses4.length; i++) {
  clauses4[i] = clauses4[i].split(' ');

  for (let j = 0; j < clauses4[i].length; j++) {
    clauses4[i][j] = Number(clauses4[i][j]);
  }
}

// 2sat5
const clauses5 = parseData('4-4-2sat-5.txt', '\n');

// final parsing for clauses5.
for (let i = 0; i < clauses5.length; i++) {
  clauses5[i] = clauses5[i].split(' ');

  for (let j = 0; j < clauses5[i].length; j++) {
    clauses5[i][j] = Number(clauses5[i][j]);
  }
}

// 2sat6
const clauses6 = parseData('4-4-2sat-6.txt', '\n');

// final parsing for clauses6.
for (let i = 0; i < clauses6.length; i++) {
  clauses6[i] = clauses6[i].split(' ');

  for (let j = 0; j < clauses6[i].length; j++) {
    clauses6[i][j] = Number(clauses6[i][j]);
  }
}


// RUN
const run = require('../run');
run(() => twoSat(clauses1), '2sat Satisfiability for case1');
run(() => twoSat(clauses2), '2sat Satisfiability for case2');
run(() => twoSat(clauses3), '2sat Satisfiability for case3');
run(() => twoSat(clauses4), '2sat Satisfiability for case4');
run(() => twoSat(clauses5), '2sat Satisfiability for case5');
run(() => twoSat(clauses6), '2sat Satisfiability for case6');
