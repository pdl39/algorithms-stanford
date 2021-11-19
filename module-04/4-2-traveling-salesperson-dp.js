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

// All arrays used in this function will be 0 indexed (e.g. city at 0 index = city 0, etc.).
const tspDp = (V, cities, source) => {
  const n = V - source;
  const vertices = [];
  for (let v = source; v < V; v++) {
    vertices.push(v);
  }
  const [S, keyMap] = subsetsBitMask(n);

  // Set up DP Table of subsets S and dest j.
  const A = new Array(S.length).fill([]).map(() => new Array(n).fill(Infinity));
  A[keyMap[1]][0] = 0; // Base case: if dest j = 1 && S = {1}, it's a self loop so path cost = 0.

  for (let i = 0; i < S.length; i++) {
    // console.log({i}, S[i].subset.toString(2))
    // Note: based on the boundary in S determined by m, all subsets being considered in each iteration have count = m.
    for (let j = 1; j < n + 1; j++) { // for all j (bit) in S[i], where j != 0 (the 0th bit of subset mask = the source city the 0th element in the vertices array)
      const jInS = S[i].subset & (1 << j);
      if (!jInS) continue;

      let minPathVal = Infinity;
      for (let k = 0; k < n + 1; k++) { // among all k in S[i], where k != j, find the shortest path value from the city at bit 0 to city at bit j.
        const kInS = S[i].subset & (1 << k);
        if (kInS && k !== j) {
          const Sminusj = S[i].subset - (1 << j);
          const cityK = cities[vertices[k]];
          const cityJ = cities[vertices[j]];

          minPathVal = Math.min(minPathVal, A[keyMap[Sminusj]][k] + euclideanDist(cityK, cityJ));
        }
      }

      A[keyMap[S[i].subset]][j] = minPathVal;
      // console.log({i, j}, 'S[i]: ', S[i], 'min(S[i], j): ', A[keyMap[S[i].subset]][j]);
    }
  }

  // Final loop over all final dest j's to get the final minimum path value by adding the final hop from each j back to the source city.
  let finalMin = Infinity;
  for (let j = 1; j < n; j++) {
    const cityJ = cities[vertices[j]];
    const sourceCity = cities[vertices[0]];
    finalMin = Math.min(finalMin, A[S.length - 1][j] + euclideanDist(cityJ, sourceCity));
  }

  return finalMin;
}


// Get an array of all subsets (2^n - 1).
const subsetsBitMask = (n) => {
  const total = (1 << n); // 2^n --> total # of possible subsets.
  const SbitArr = []; // An array of all subsets. Each subset will be in the form of an object with the the 'subset' property storing the bitmask of the subset and the 'count' property storing the # of elements included in the subset.
  const keyMap = {}; // A mapping of subsetBitmask -> its position (index) in SbitArr.

  for (let mask = 0; mask < total; mask++) { // Create mask for all possible subsets.
    let subsetBitMask = 0; // a bitmask representing the contents of a subset: Each bitmask (when thought of as binary number) will have n digits, and the ith bit (with the lsb = 0 and i increasing from right to left) will correspond to the ith element of the input array (1 ith element is included and 0 if not).
    let setCount = 0; // Store count of how many elements are in the subset.

    for (let i = 0; i < n; i++) { // for each bit index of subset mask, check if the ith bit is set. Let's have the least significant bit be 0th bit (vs 1st bit). If the ith bit of mask is set to 1, we know the mask includes the ith index element of arr. So we add the ith element of arr to our current subset (Set the ith bit of subset bitmask to 1).
      if (mask & (1 << i)) {
        subsetBitMask |= (1 << i);
        setCount++;
      }
    }

    if (subsetBitMask & (1 << 0)) { // Only store subsets that contain the source vertex, which will be at the 0 index in the input array and thus at the 0th bit in the subset bitmask.
      SbitArr.push({
        subset: subsetBitMask,
        count: setCount
      });
    }
  }

  const sortedSbitArr = SbitArr.sort((a, b) => a.count - b.count);
  sortedSbitArr.forEach((s, idx) => {
    keyMap[s.subset] = idx;
  });

  return [sortedSbitArr, keyMap];
}

// Get the dist between 2 cities.
const euclideanDist = (coord1, coord2) => {
  return Math.sqrt(((coord1[0] - coord2[0])**2) + ((coord1[1] - coord2[1])**2));
}


// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const data = parseData('./4-2-traveling-salesperson-dp.txt', '\n');

const numCities = Number(data[0]);
const cities = new Array(numCities).fill(null);

for (let i = 1; i < data.length; i++) {
  data[i] = data[i].split(' ');
  const x = parseFloat(data[i][0]);
  const y = parseFloat(data[i][1]);

  cities[i - 1] = [x, y];
}

console.log({numCities, cities});

// RUN
const cluster1Min = tspDp(13, cities, 0);
const cluster2Min = tspDp(numCities, cities, 11);
const duplicatePath = euclideanDist(cities[11], cities[12]);
console.log({cluster1Min, cluster2Min, duplicatePath})
console.log('Shortest TSP Tour distance: ', Math.floor(cluster1Min + cluster2Min - 2 * duplicatePath));

