/* Travelling Sales Person problem:
Input: Complete, undirected graph with non-negative edge costs.
Output: A min cost tour (a cycle that visits each vertex EXACTLY once).
Find the shortest tsp path that starts from vertex v, visits every other vertex exactly once, and returns back to v.

Running Time:
- Brute Force O(n!) --> tractable up to ~ 12
- DP: O(n^2 * 2^n) --> tractable up to ~ 30
DP time complexity analysis:
- # of subproblems: n * 2^n ---> n for # of vertices, 2^n for # of subsets. We need 2^n for subsets since we need to keep track of the identities of the vertices (whether a vertex is in the subset) in any subproblem path 1 -> j, so that we don't have any repeated vertex in any of the paths - in the end, we can only have each vertex exactly once in the final tsp tour path. This is better than the n! time we would need if we have to keep track of the order of vertices in each sub path as well.
- # of work per subproblem: n --> iterate over all vertices in the subset to find the min

Subproblems:
For every destination j {1, 2. 3, ..., n} & subset S {1, 2, 3, ..., n} that contains 1 and j,
let L(S,j) = the shortest path from 1 to j that visits precisely the vertex in S exactly once each.

Optimal Substructure:
Optimal Substructure Lemma:
Let p be L(S,j). If the last hop of p is (k,j),
then p' is a shortest path from 1 -> k and is L(S, k) that visits every vertex of S - {j} exactly once.

Recurrence relation:
L(S,j) = min{L(S-{j}, k) + c(k,j)}
where k in S, k != j, and c(k,j) is the edge cost of the last hop (k -> j).

L(S,j) = min(S - {k})
Let v = 1,
S = a subset of V that contains 1 and j,
k = the intermediate vertex (in S) in the 1 -> j path that yields the shortest 1 -> k path + a final hop k -> j.
j -> a destination vertex

*/

// 'cities' are 1 indexed (NOT 0 indexed).
const tspDp = (V, cities, source) => {
  const numCities = V - source + 1;
  const vertices = [];
  for (let v = 1; v < numCities + 1; v++) {
    vertices.push(v);
  }
  console.log(5 & (1 << 0))
  console.log({vertices})
  subsetsBitMask(vertices, numCities);
}

const euclideanDist = (coord1, coord2) => {
  return Math.sqrt(((coord1[0] - coord2[0])**2) + ((coord1[1] - coord2[1])**2));
}

// Get an array sets of all subsets (2^(n - source)) from source to n.
const subsetsBitMask = (arr, n) => {
  const total = (1 << n); // 2^n
  console.log({total});
  const S = [];

  for (let mask = 0; mask < total; mask++) { // Create mask for all possible subsets.
    const subset = [];

    for (let i = 0; i < n; i++) { // for each bit index of subset mask,
      // create a bit mask for the ith bit of the subset mask. Let's have the least significant bit be 0th bit (vs 1st bit). If the ith bit of mask is set to 1, we know the mask includes the ith index element of arr. So we add the ith element of arr to our current subset.
      if (mask & (1 << i)) {
        subset.push(arr[i]);
      }
    }

    if (subset[0] === 1) {
      S.push(subset);
    }
  }
  console.log({S})
  console.log(0b111)
  console.log(1 << 0)
  console.log(1 << 1)
  console.log(1 << 2)
  console.log(1 << 3)

  return S;
}


// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const data = parseData('./4-2-traveling-salesperson-dp.txt', '\n');

const numCities = Number(data[0]);
const cities = new Array(numCities + 1).fill(null);

for (let i = 1; i < data.length; i++) {
  data[i] = data[i].split(' ');
  const x = parseFloat(data[i][0]);
  const y = parseFloat(data[i][1]);

  cities[i] = [x, y];
}

console.log({numCities, cities});
console.log(euclideanDist(cities[1], cities[2]));

console.log(tspDp(13, cities, 1));
// console.log(tspDp(numCities, cities, 12));
