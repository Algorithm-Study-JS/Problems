const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputLines = [];

rl.on('line', (line)=> {
  inputLines.push(line.split(" ").map(BigInt));  
}).on('close', () => {
  let [K, P, N] = inputLines[0];
  N *= 10n; // 0.1초마다 증가

  let ans = K;
  for (let i = 0; i < Number(N); i++) {
    ans = (ans * P) % BigInt(1000000007);
  }

  console.log(Number(ans));
});