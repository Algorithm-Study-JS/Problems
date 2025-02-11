const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" ").map(Number));
}).on('close', () => {
    const N = lines[0][0], classes = lines.slice(1).sort((a, b) => a[1] - b[1]);
    
    let answer = 1, prev = classes[0][1];
    
    for (let i = 1; i < classes.length; i++) {
        const [start, end] = classes[i];
        
        if (prev <= start) {
            answer++;
            prev = end;
        }
    }
    
    console.log(answer);
    
    process.exit(0);
});
