const maxSpacingKClustering = (V, vertices, edges, n = edges.length, k = 4) => {
  // sort the edges by increasing order of distance
  const sortedEdges = edges.sort((a, b) => a.dist - b.dist);

  const clusters = new Array(V + 1).fill(null);
  for (const v of vertices) {
    clusters[v] = new Cluster(v, 0);
  }

  const mst = [];

  for (let i = 0; i < n - 1; i++) {
    const cluster1 = find(clusters, sortedEdges[i].u);
    const cluster2 = find(clusters, sortedEdges[i].v);

    if (cluster1 !== cluster2) { // doesn't form a cycle.
      union(clusters, cluster1, cluster2);
      mst.push(sortedEdges[i]);
    }
  }

  // console.log({mst});
  let kMinus1MostExpensiveEdges = [];
  for (let i = 0; i < k - 1; i++) {
    kMinus1MostExpensiveEdges.push(mst.pop());
  }
  console.log({kMinus1MostExpensiveEdges});

  // 'max spacing' of k clustering is the minimum spacing(distance) between any two of the k clusters.
  const maxSpacing = kMinus1MostExpensiveEdges[k - 2].dist;
  return maxSpacing;
}

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
const edgeNcosts = parseData('./3-2-clustering1.txt', '\n');
const V = Number(edgeNcosts[0]);
const edges = [];
let vertices = new Set();


for (let i = 1; i < edgeNcosts.length; i++) {
  edgeNcosts[i] = edgeNcosts[i].split(' ');

  const u = Number(edgeNcosts[i][0]);
  const v = Number(edgeNcosts[i][1]);
  const dist = Number(edgeNcosts[i][2]);

  edges.push(new Edge(u, v, dist));
  // edges.push(new Edge(v, u, dist));
  vertices.add(u);
  vertices.add(v);
}

// console.log({edges, vertices});

// RUN
console.log(maxSpacingKClustering(vertices.size, vertices, edges));
