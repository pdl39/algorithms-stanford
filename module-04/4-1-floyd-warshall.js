const floydWarshall = (V, vertices, edges) => {

}


class Edge {
  constructor(u, v, dist) {
    this.u = u;
    this.v = v;
    this.dist = dist;
  }
}


// PRE-PROCESSING: ASSIGNMENT INPUTS
// g1
const parseData = require('../parseData');
const edgeNcosts = parseData('./4-1-floyd-warshall-g1.txt', '\n');
const V1 = Number(edgeNcosts[0]);
const E1 = Number(edgeNcosts[1]);
const edges1 = [];
let vertices1 = new Set();


for (let i = 1; i < edgeNcosts.length; i++) {
  edgeNcosts[i] = edgeNcosts[i].split(' ');

  const u = Number(edgeNcosts[i][0]);
  const v = Number(edgeNcosts[i][1]);
  const dist = Number(edgeNcosts[i][2]);

  edges1.push(new Edge(u, v, dist));
  vertices1.add(u);
  vertices1.add(v);
}


// g2
const edgeNcosts2 = parseData('./4-1-floyd-warshall-g1.txt', '\n');
const V2 = Number(edgeNcosts2[0]);
const E2 = Number(edgeNcosts2[1]);
const edges2 = [];
let vertices2 = new Set();


for (let i = 1; i < edgeNcosts2.length; i++) {
  edgeNcosts2[i] = edgeNcosts2[i].split(' ');

  const u = Number(edgeNcosts2[i][0]);
  const v = Number(edgeNcosts2[i][1]);
  const dist = Number(edgeNcosts2[i][2]);

  edges2.push(new Edge(u, v, dist));
  vertices2.add(u);
  vertices2.add(v);
}


// g3
const edgeNcosts3 = parseData('./4-1-floyd-warshall-g1.txt', '\n');
const V3 = Number(edgeNcosts3[0]);
const E3 = Number(edgeNcosts3[1]);
const edges3 = [];
let vertices3 = new Set();


for (let i = 1; i < edgeNcosts3.length; i++) {
  edgeNcosts3[i] = edgeNcosts3[i].split(' ');

  const u = Number(edgeNcosts3[i][0]);
  const v = Number(edgeNcosts3[i][1]);
  const dist = Number(edgeNcosts3[i][2]);

  edges3.push(new Edge(u, v, dist));
  vertices3.add(u);
  vertices3.add(v);
}


console.log({vertices1, edges1});
console.log({vertices2, edges2});
console.log({vertices3, edges3});

// RUN
// console.log(floydWarshall(V1, vertices1, edges1));
// console.log(floydWarshall(V2, vertices2, edges2));
// console.log(floydWarshall(V3, vertices3, edges3));

