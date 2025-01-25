const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputLines = [];

rl.on('line', (line) => {
  inputLines.push(line.split(" ").map(Number));
})
    
rl.on('close', () => {
  const K = inputLines[0][1];

  for (let i = 2; i < K + 2; i++) {
    const start = Number(inputLines[i][0]) - 1;
    const end = Number(inputLines[i][1]);

    const avg = inputLines[1].slice(start, end).reduce((sum, cur) => sum + Number(cur), 0) / (end - start);
    console.log(avg.toFixed(2));
  }
  
  process.exit(0);
});