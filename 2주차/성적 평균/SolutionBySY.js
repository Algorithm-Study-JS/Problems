const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" ").map(Number));
  
}).on('close', () => {
    const [n, k] = lines[0];
    const scores = lines[1];
    const queries = lines.slice(2);

    const accSum = new Array(n).fill(scores[0]);

    // 누적합
    for(let i = 1; i < n; i++) {
        accSum[i] = scores[i] + accSum[i - 1];
    }

    let answer = "";

    for(const query of queries) {
        const [left, right] = [query[0] - 1, query[1] - 1];
        const sum = accSum[right] - accSum[left] + scores[left];
        const div = right - left + 1;

        answer += (Math.round(sum / div * 100) / 100).toFixed(2);
        answer += "\n";
    }
    
    console.log(answer);
});
