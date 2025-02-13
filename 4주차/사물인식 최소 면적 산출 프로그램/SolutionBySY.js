const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.trim().split(" ").map(Number));
    
}).on('close', () => {
    const [n, k] = lines[0];
    const points = Array.from({length: k + 1}, () => new Array());

    for(let i = 1; i <= n; i++) {
        const [x, y, color] = lines[i];
        points[color].push([x, y]);
    }

    let min = Infinity;

    const dfs = (color, minX, minY, maxX, maxY) => {
        if(min !== Infinity && Math.abs(maxX - minX) * Math.abs(maxY - minY) >= min) return;
        
        if(color === k + 1) {
            min = Math.abs(maxX - minX) * Math.abs(maxY - minY);
            return;
        }

        for(let i = 0; i < points[color].length; i++) {
            const [currX, currY] = points[color][i];
            dfs(color + 1, Math.min(minX, currX), Math.min(minY, currY), Math.max(maxX, currX), Math.max(maxY, currY));
        }
    }

    dfs(1, Infinity, Infinity, -Infinity, -Infinity);

    console.log(min);
});
