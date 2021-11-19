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

  const rawSubsets = subsets(source, V).sort((a, b) => a.size - b.size);
  const S = [];

  // Parse to get all subsets S that contain 1 (in order of subset length).
  for (let i = 0; i < rawSubsets.length; i++) {
    if (rawSubsets[i].has(source)) {
      S.push(rawSubsets[i]);
    }
  }

  console.log({S});

  const A = new Array(S.length).fill([]).map(() => new Array(V + 1).fill(Infinity));

  for (let i = 0; i < S.length; i++) {
    for (let j = source + 1; j < V - source + 2; j++) {
      let p = Infinity;
      if (S[i].has(j)) {

      }
    }
  }
}

const euclideanDist = (coord1, coord2) => {
  return Math.sqrt(((coord1[0] - coord2[0])**2) + ((coord1[1] - coord2[1])**2));
}

// Get an array sets of all subsets (2^(n - source)) from source to n.
const subsets = (source, n) => {
  const subsets = [new Set()]; // begin with an empty subset.

  for (let i = source; i < n + 1; i++) {
    const subsetsLen = subsets.length;

    // add the new number to each copy of the existing subsets
    for (let j = 0; j < subsetsLen; j++) {
      const subsetsCopy = new Set(subsets[j]);
      subsetsCopy.add(i);
      subsets.push(subsetsCopy);
    }
  }

  return subsets;
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
