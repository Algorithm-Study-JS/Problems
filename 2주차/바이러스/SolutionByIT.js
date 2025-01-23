const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MOD = BigInt(1000000007);

const lines = [];
rl.on('line', (line) => {
    lines.push(line.split(" "));
}).on('close', () => {
    const [virus, increment, times] = lines[0].map(el => BigInt(el));

    let result = virus;
    
    for (let i = 0; i < times; i++) {
        result = (result * increment) % MOD;
    }

    console.log(result.toString());

    process.exit(0);
});
