// 실행시간 : 0.045초, 메모리 : 7.18MB

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];
const MOD = BigInt(1000000007);

rl.on('line', (line) => {
  lines.push(line.split(' ').map(BigInt));
}).on('close', () => {
  const [K, P, N] = lines[0];
  let answer = K;

  const solve = (p, n) => {
    if (n === 1n) return p % MOD;

    let half = solve(p, n / 2n);

    if (n % 2n === 0n) return (half * half) % MOD;
    else return (((half * half) % MOD) * p) % MOD;
  };

  answer = (solve(P, 10n * N) * K) % MOD;

  console.log(answer.toString());

  process.exit(0);
});
