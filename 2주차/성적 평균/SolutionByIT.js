const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" "));
}).on('close', () => {
    const [N, K] = lines.shift().map(Number)
    const grades = lines.shift().map(Number);
    const intervals = lines;

    intervals.forEach(([start, end]) => {
        const temp = grades.slice(+start - 1, +end).reduce((acc, cur) => acc + cur, 0) / (end - start + 1);
        console.log(temp.toFixed(2));
    })
    
    process.exit(0);
});
