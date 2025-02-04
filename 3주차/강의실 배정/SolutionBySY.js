const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" ").map(Number));
    
}).on('close', () => {
    const [n] = lines[0];
    const times = lines.slice(1);

    // 1. 종료가 빠른 순 2. 같다면 시작이 빠른 순으로 정렬
    times.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

    let count = 1;
    let currEnd = times[0][1];

    for(const [s, e] of times) {
        if(s >= currEnd) {
            currEnd = e;
            count++;
        }
    }
    
    console.log(count);
});
