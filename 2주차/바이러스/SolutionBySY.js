const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" ").map(Number));
}).on('close', () => {
    const [k, p, n] = lines[0].map(BigInt);
    let virus = BigInt(k);
    
    for(let i = 1; i <= n; i++) virus = virus * p % 1000000007n;

    console.log(Number(virus));
});
