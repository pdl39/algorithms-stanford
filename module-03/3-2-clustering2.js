
// Find the cluster (name of the leader vertex) in which a node/vertex belongs.
const find = (clusters, node) => {
  if (clusters[node].leader !== node) {
    clusters[node].leader = find(clusters, clusters[node].leader);
  }

  return clusters[node].leader;
}

// Union by Rank
const union = (clusters, cluster1, cluster2) => {
  const root1 = find(clusters, cluster1);
  const root2 = find(clusters, cluster2);

  if (root1.rank > root2.rank) {
    clusters[root2].leader = root1;
  }
  else if (root2.rank > root1.rank) {
    clusters[root1].leader = root2;
  }
  else { // if they have same rank, choose one of them to be the leader and increase its rank by 1.
    clusters[root2].leader = root1;
    clusters[root1].rank++;
  }
}

class Cluster {
  constructor(leader, rank) {
    this.leader = leader;
    this.rank = rank;
  }
}

class Edge {
  constructor(u, v, dist) {
    this.u = u;
    this.v = v;
    this.dist = dist;
  }
}

// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const nodeBits = parseData('./3-2-clustering2.txt', '\n');
const V = Number(nodeBits[0].split(' ')[0]);
// console.log(nodeBits.length);
const nodes = new Array(V).fill(null);
const nodesMap = {};

for (let i = 1; i < nodeBits.length; i++) {
  nodeBits[i] = nodeBits[i].split(' ');
  nodeBits[i].pop();
  nodes[i] = parseInt(nodeBits[i].join(''), 2);
}

console.log({nodes}, nodes[0]);
for (let i = 1; i < nodes.length; i++) {
  if (nodesMap[nodes[i]]) {
    nodesMap[nodes[i]].push(i);
  }
  else {
    nodesMap[nodes[i]] = [i];
  }
}

// RUN
// console.log(maxSpacingKClustering(vertices.size, vertices, edges));
