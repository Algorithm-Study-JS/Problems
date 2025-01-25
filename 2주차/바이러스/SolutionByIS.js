const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputLines = [];

rl.on('line', (line)=> {
  inputLines.push(line.split(" ").map(el => BigInt(el)));  
}).on('close', () => {
  const [K, P, N] = inputLines[0];
  
  let ans = K;
  for (let i = 0; i < Number(N); i++) {
    ans = (ans * P) % BigInt(1000000007);
  }

  console.log(Number(ans));
});