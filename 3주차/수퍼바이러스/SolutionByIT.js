const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MOD = 1000000007n;

rl.on('line', (line) => {
    const [K, P, N] = line.split(" ").map(BigInt);

    let result = BigInt(1), base = P, exponent = N * 10n;

    // 지수 승법
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % MOD;
        }
      
        base = (base * base) % MOD;
        exponent = exponent / 2n;
    }

    const answer = (result * K) % MOD;
    console.log(answer.toString());

    rl.close();
});
