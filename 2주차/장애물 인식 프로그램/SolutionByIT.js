const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" "));
}).on('close', () => {
    const n = +lines.shift();
    const map = lines.map(el => String(el).split(""));
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const direction = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let count = 0, arr = [];

    // 2차원 배열을 순회하면서 0이 아닌 곳을 찾으면 방문 처리하고 인접한 모든 곳 처리
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (+map[row][col] && !visited[row][col]) {
                count++;
                arr.push(dfs(row, col));
            }
        }
    }

    // 해당 방문 체크 및 청크 사이즈 추가
    function dfs(x, y) {
        visited[x][y] = true;
        let chunkSize = 1;

        for ([dx, dy] of direction) {
            const newX = x + dx;
            const newY = y + dy;
            if (newX >= 0 && newY >= 0 && newX < n && newY < n && !visited[newX][newY] && +map[newX][newY]) {
                chunkSize += dfs(newX, newY);
            }
        }

        return chunkSize;
    }

    arr.sort((a, b) => a - b);
    
    console.log(count);
    
    for(let size of arr) {
        console.log(size);
    }
    
    process.exit(0);
});
