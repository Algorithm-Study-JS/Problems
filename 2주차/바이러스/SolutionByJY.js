// 실행시간 : 0.189초, 메모리 : 10.45MB

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line.split(' ').map(BigInt));
}).on('close', () => {
  const [K, P, N] = lines[0];
  let answer = K;

  for (let i = 0; i < N; i++) {
    answer = (answer * P) % BigInt(1000000007);
  }

  console.log(answer.toString());

  process.exit(0);
});
