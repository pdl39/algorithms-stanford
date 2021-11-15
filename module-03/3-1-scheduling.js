const scheduling = (jobs, greedyMethod = 'ratio') => { // greedyMethod is either 'diff' or 'ratio'
  let scheduling1 = greedyMethod !== 'diff'
  ? null
  : jobs.sort((a, b) => {
    const aDiff = a[0] - a[1];
    const bDiff = b[0] - b[1];
    if (aDiff === bDiff) {
      return b[0] - a[0];
    }
    else {
      return bDiff - aDiff;
    }
  });

  let scheduling2 = greedyMethod !== 'ratio'
  ? null
  : jobs.sort((a, b) => {
    aRatio = a[0]/a[1];
    bRatio = b[0]/b[1];
    return bRatio - aRatio;
  });

  let runningWeightedSum = 0;
  let runningCompTimeSum = 0;
  if (greedyMethod === 'diff') {
    for (let i = 0; i < scheduling1.length; i++) {
      runningWeightedSum += scheduling1[i][0] * (runningCompTimeSum + scheduling1[i][1]);
      runningCompTimeSum += scheduling1[i][1];
    }
  }
  else {
    for (let i = 0; i < scheduling2.length; i++) {
      runningWeightedSum += scheduling2[i][0] * (runningCompTimeSum + scheduling2[i][1]);
      runningCompTimeSum += scheduling2[i][1];
    }
  }

  return runningWeightedSum;
}


// ASSIGNMENT INPUT
const parseData = require('../parseData');
const jobs = parseData('./3-1-scheduling.txt', '\n');

jobs[0] = Number(jobs[0]);
for (let i = 1; i < jobs.length; i++) {
  jobs[i] = jobs[i].split(' ');
  jobs[i][0] = Number(jobs[i][0]);
  jobs[i][1] = Number(jobs[i][1]);
}

jobs.shift();

console.log(scheduling(jobs, 'diff'));
console.log(scheduling(jobs, 'ratio'));
