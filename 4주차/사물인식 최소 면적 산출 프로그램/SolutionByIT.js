const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" ").map(Number));
}).on('close', () => {
    const [N, K] = lines[0];
    const points = Array.from({length: K}, () => []);
    
    lines.slice(1).forEach(line => {
        const [x, y, color] = line;
        points[color - 1].push([x, y]);
    })
    
    let min = 2000 * 2000;

    function dfs(color, left, right, bottom, top) {

        if (color === K) {
            min = Math.min(min, (right - left) * (top - bottom));
            return;
        }
        
        for (const [x, y] of points[color]) {
            const newLeft = Math.min(left, x), newRight = Math.max(right, x);
            const newTop = Math.max(top, y), newBottom = Math.min(bottom, y);
            const newArea = (newRight - newLeft) * (newTop - newBottom);
 
            if (newArea < min) {
                dfs(color + 1, newLeft, newRight, newBottom, newTop);
            }
        }
    }

    dfs(0, 1000, -1000, 1000, -1000);
    
    console.log(min);
    process.exit(0);
});
