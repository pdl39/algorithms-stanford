// #1: Sorting cities by distance from the current city at every new current city.
const tspLocalSearch1 = (numCities, cities, source) => {
  let tourCost = 0;
  let startCity = cities[source];
  let currentCity = startCity;
  let lastCity = startCity;
  const visited = new Set();
  visited.add(startCity[0]);

  while (visited.size < numCities) {
    // Sort cities by distance from the current city. If same distance, lower index city first. - O(nlogn).
    const sortedCities = cities.sort((a, b) => {
      const distDiff = euclideanDistSq(currentCity, a) - euclideanDistSq(currentCity, b);
      if (distDiff === 0) {
        return a[0] - b[0];
      }
      else {
        return distDiff;
      }
    });

    for (let i = 0; i < sortedCities.length; i++) {
      if (!visited.has(sortedCities[i][0])) {
        tourCost += euclideanDist(currentCity, sortedCities[i]);
        visited.add(sortedCities[i][0]);
        currentCity = sortedCities[i];

        if (visited.size === numCities) {
          lastCity = currentCity;
        }

        break;
      }
    }
  }

  tourCost += euclideanDist(lastCity, startCity);
  return tourCost;
}

// #2: Using direct pair comparisons.
const tspLocalSearch2 = (numCities, cities, source) => {
  let tourCost = 0;
  let startCity = cities[source];
  let currentCity = startCity;
  let lastCity = startCity;
  const visited = new Set();
  visited.add(startCity[0]);

  while (visited.size < numCities) {
    minDistSquared = Infinity;
    minDistNeighbor = currentCity;

    for (let i = 0; i < cities.length; i++) {
      if (!visited.has(cities[i][0])) {
        const distSquared = euclideanDistSq(currentCity, cities[i]);
        if (distSquared < minDistSquared) {
          minDistSquared = distSquared;
          minDistNeighbor = cities[i];
        }
        else if (distSquared === minDistSquared) {
          minDistNeighbor = cities[i][0] < minDistNeighbor[0] ? cities[i] : minDistNeighbor;
        }
      }
    }

    tourCost += euclideanDist(currentCity, minDistNeighbor);
    visited.add(minDistNeighbor[0]);
    currentCity = minDistNeighbor;

    if (visited.size === numCities) {
      lastCity = currentCity;
    }
  }

  tourCost += euclideanDist(lastCity, startCity);
  return tourCost;
}


// Get the dist between 2 cities.
const euclideanDist = (coord1, coord2) => {
  return Math.sqrt(((coord1[1] - coord2[1])**2) + ((coord1[2] - coord2[2])**2));
}

// Get the square of euclidean dist between 2 cities.
const euclideanDistSq = (coord1, coord2) => {
  return ((coord1[1] - coord2[1])**2) + ((coord1[2] - coord2[2])**2);
}


// PRE-PROCESSING: ASSIGNMENT INPUT
const parseData = require('../parseData');
const data = parseData('./4-3-traveling-salesperson-local-search.txt', '\n');

const numCities = Number(data[0]);
const cities = new Array(numCities).fill(null);

for (let i = 1; i < data.length; i++) {
  data[i] = data[i].split(' ');
  const v = parseFloat(data[i][0]); // city #
  const x = parseFloat(data[i][1]); // city x coordinate
  const y = parseFloat(data[i][2]); // city y coordinate

  cities[i - 1] = [v, x, y];
}

// console.log({numCities, cities});

// RUN
const run = require('../run');
run(() => tspLocalSearch1(numCities, cities, 0), 'Approximate Shortest TSP Tour distance via Local Search Heuristic using sort');

console.log('---------------------------------');
cities.sort((a, b) => a[0] - b[0]); // Sort cities back to original state (by index).

run(() => tspLocalSearch2(numCities, cities, 0), 'Approximate Shortest TSP Tour distance via Local Search Heuristic using direct pair comparisons');
