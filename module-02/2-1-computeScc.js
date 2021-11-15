// 2-pass DFS
// 1st pass: DFS on the reverse of the graph to get an ordering the finishing times for the vertices.
// 2nd pass: Using the finishing times, compute the strongly connected components.

// we will store graph as an adjacency list.

const computeScc = (V, edges) => {
  // 1st pas DFS on the reverse of the input graph.
  // Goal of the first pass is to get an ordering of vertices to traverse in the 1nd pass.
  const graphR = createAdj(V, edges, 1, 0);
  const visitedR = new Array(V + 1).fill(false);
  const orderStack = [];

  for (let i = V; i > 0; i--) {
    if (!visitedR[i]) {
      dfs1(graphR, i, visitedR, orderStack);
    }
  }

  // console.log({visitedR})
  // 2nd pass DFS on the original input graph.
  // Run dfs starting with the last vertex in the ordering, keeping track of the current scc (the leader vertex of the current scc) for each dfs call, which will guarantee the correct computation of all strongly connected components.
  const graph = createAdj(V, edges, 0, 1);
  const visited = new Array(V + 1).fill(false);
  const sccs = [];
  let currentScc = null;

  while (orderStack.length > 0) {
    const v = orderStack.pop();

    if (!visited[v]) {
      currentScc = new Scc(v);
      dfs2(graph, v, visited, currentScc);
      sccs.push(currentScc);
    }
  }

  sccs.sort((a, b) => b.size - a.size);
  return sccs;
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

const dfs2 = (graph, i, visited, currentScc) => {
  visited[i] = true;

  if (graph[i]) {
    for (const j of graph[i]) {
      if (!visited[j]) {
        dfs2(graph, j, visited, currentScc);
      }
    }
  }

  currentScc.size++;
}


const createAdj = (V, edges, srcIdx, destIdx) => {
  const adj = new Array(V + 1).fill(null);

  // create adj list
  for (let i = 0; i < edges.length; i++) {
    if (adj[edges[i][srcIdx]]) {
      adj[edges[i][srcIdx]].push(edges[i][destIdx]);
    }
    else {
      adj[edges[i][srcIdx]] = [edges[i][destIdx]];
    }
  }

  return adj;
}

class Scc {
  constructor(i) {
    this.leader = i;
    this.size = 0;
  }
}


// ASSIGNMENT INPUT
// Due to huge input size, running the function with default node v8 stack size will result in stack overflow error --> in the terminal, run the program with "node --stack-size=8100 <filename>.js"
// --stack-size=8100 seems to be around the max we can get without segmentation fault. 8100 seems to give just a little over 100,000 call stack limit (based on node v.16.13.0).
const parseData = require('../parseData');
const edges = parseData('2-1-computeScc.txt', '\n');

// final parsing for edges.
for (let i = 0; i < edges.length; i++) {
  edges[i] = edges[i].split(' ');
  edges[i].pop();

  for (let j = 0; j < edges[i].length; j++) {
    edges[i][j] = Number(edges[i][j]);
  }
}

// console.log({edges});
console.log(computeScc(875714, edges));


/************************TEST CASES************************/
// tc1
const edges1 = parseData('2-1-computeScc-tc1.txt', '\n');

// final parsing for edges1.
for (let i = 0; i < edges1.length; i++) {
  edges1[i] = edges1[i].split(' ');

  for (let j = 0; j < edges1[i].length; j++) {
    edges1[i][j] = Number(edges1[i][j]);
  }
}

// console.log({edges1});
// console.log(computeScc(9, edges1));


// tc2
const edges2 = parseData('2-1-computeScc-tc2.txt', '\n');

// final parsing for edges2.
for (let i = 0; i < edges2.length; i++) {
  edges2[i] = edges2[i].split(' ');

  for (let j = 0; j < edges2[i].length; j++) {
    edges2[i][j] = Number(edges2[i][j]);
  }
}


// console.log({edges2});
// console.log(computeScc(8, edges2));


// tc3
const edges3 = parseData('2-1-computeScc-tc3.txt', '\n');

// final parsing for edges3.
for (let i = 0; i < edges3.length; i++) {
  edges3[i] = edges3[i].split(' ');

  for (let j = 0; j < edges3[i].length; j++) {
    edges3[i][j] = Number(edges3[i][j]);
  }
}

// console.log({edges3});
// console.log(computeScc(8, edges3));

// tc4
const edges4 = parseData('2-1-computeScc-tc4.txt', '\n');

// final parsing for edges4.
for (let i = 0; i < edges4.length; i++) {
  edges4[i] = edges4[i].split(' ');

  for (let j = 0; j < edges4[i].length; j++) {
    edges4[i][j] = Number(edges4[i][j]);
  }
}

// console.log({edges4});
// console.log(computeScc(8, edges4));

// tc5
const edges5 = parseData('2-1-computeScc-tc5.txt', '\n');

// final parsing for edges5.
for (let i = 0; i < edges5.length; i++) {
  edges5[i] = edges5[i].split(' ');

  for (let j = 0; j < edges5[i].length; j++) {
    edges5[i][j] = Number(edges5[i][j]);
  }
}

// console.log({edges5});
// console.log(computeScc(12, edges5));




/**** Check max stack size ****/
// var i = 0;
// function inc() {
//   i++;
//   inc();
// }

// try {
//   inc();
// }
// catch(e) {
//   // The StackOverflow sandbox adds one frame that is not being counted by this code
//   // Incrementing once manually
//   i++;
//   console.log('Maximum stack size is', i, 'in your current browser');
// }
