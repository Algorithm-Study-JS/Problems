const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" ").toString());
}).on('close', () => {
    const n = Number(lines[0]);
    const dr = [-1, 0, 1, 0], dc = [0, 1, 0, -1];
    
    const map = new Array(n).fill([]);
    for(let i = 0; i < n; i++) map[i] = lines[i + 1].split("").map(Number);

    const visited = Array.from({length: n}, () => new Array(n).fill(false));

    const blocks = [];

    const bfs = (r, c) => {
        let count = 1;
        const queue = [[r, c]];
        visited[r][c] = true;

        while(queue.length) {
            const [currR, currC] = queue.shift();

            for(let d = 0; d < 4; d++) {
                const nr = currR + dr[d], nc = currC + dc[d];

                if(nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && map[nr][nc] === 1) {
                    queue.push([nr, nc]);
                    count++;
                    visited[nr][nc] = true;
                }
            }
        }

        blocks.push(count);
    }
    
    for(let r = 0; r < n; r++) {
        for(let c = 0; c < n; c++) {
            if(map[r][c] === 1 && !visited[r][c]) bfs(r, c);
        }
    }

    let answer = blocks.sort((a, b) => a - b).length.toString() + "\n";

    for(let i = 0; i < blocks.length; i++) {
        answer += blocks[i].toString();
        answer += "\n";
    }

    console.log(answer);
    
});
