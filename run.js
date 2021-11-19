const run = (func, precedingMessage = 'Solution') => {
  console.log('Running algorithm...');
  const start = Date.now();

  console.log(precedingMessage, ': ',func());

  console.log(`Runtime: ${(Date.now() - start) / 1000}s`);
}

module.exports = run;
