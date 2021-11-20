const kClusteringHammingDistance = (V, nodes, nodesMap, nBits = 24) => {
  const clusters = [];
  for (const v of nodes) {
    clusters.push(new Cluster(v, 0));
  }
  let k = V;
  const distances = [0];

  // bit masks for hamming distance 1 (24 items).
  for (let i = 0; i < nBits; i++) {
    distances.push((1 << i));
  }

  // bit masks for hamming distance 2 (276 items).
  for (let i = 0; i < nBits - 1; i++) {
    for (let j = i + 1; j < nBits; j++) {
      distances.push((1 << i) | (1 << j));
    }
  }

  for (let i = 0; i < distances.length; i++) {
    for (const key in nodesMap) {
      if (nodesMap.hasOwnProperty(key)) {
        const key1 = Number(key);
        const key2 = key1 ^ distances[i];

        if (nodesMap[key2]) {
          const cluster1 = find(clusters[nodesMap[key1][0]]);
          for (let id = 1; id < nodesMap[key1].length; id++) {
            const cluster1a = find(clusters[nodesMap[key1][id]]);

            if (cluster1.leader !== cluster1a.leader) { // Union if doesn't form cycle.
              union(cluster1, cluster1a);
              k--;
            }
          }

          const cluster2 = find(clusters[nodesMap[key2][0]]);
          for (let id = 1; id < nodesMap[key2].length; id++) {
            const cluster2a = find(clusters[nodesMap[key2][id]]);

            if (cluster2.leader !== cluster2a.leader) { // Union if doesn't form cycle.
              union(cluster2, cluster2a);
              k--;
            }
          }

          if (cluster1.leader !== cluster2.leader) {
            union(cluster1, cluster2);
            k--;
          }
        }
      }
    }
  }

  return k;
}

// Find the cluster (name of the leader vertex) in which a node belongs.
const find = (node) => {
  if (node.leader.val !== node.val) {
    node.leader = find(node.leader);
  }

  return node.leader;
}

// Union by Rank
const union = (cluster1, cluster2) => {
  const root1 = find(cluster1);
  const root2 = find(cluster2);

  if (root1.rank > root2.rank) {
    root2.leader = root1;
  }
  else if (root2.rank > root1.rank) {
    root1.leader = root2;
  }
  else { // if they have same rank, choose one of them to be the leader and increase its rank by 1.
    root2.leader = root1;
    root1.rank++;
  }
}

class Cluster {
  constructor(val, rank) {
    this.leader = this;
    this.val = val;
    this.rank = rank;
  }
}

// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const nodeBits = parseData('./3-2-clustering2.txt', '\n');
const V = Number(nodeBits[0].split(' ')[0]);
const nodes = []; // 0-indexed.
const nodesMap = {};

for (let i = 1; i < nodeBits.length; i++) {
  nodeBits[i] = nodeBits[i].split(' ');
  nodeBits[i].pop();
  const node = parseInt(nodeBits[i].join(''), 2);
  nodes.push(node);
}

for (let i = 0; i < nodes.length; i++) {
  if (nodesMap[nodes[i]]) {
    nodesMap[nodes[i]].push(i);
  }
  else {
    nodesMap[nodes[i]] = [i];
  }
}


// RUN
const run = require('../run');
run(() => kClusteringHammingDistance(V, nodes, nodesMap, 24), 'Max # of clusters with hamming distance spacing >= 3');
