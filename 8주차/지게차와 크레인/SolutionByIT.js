function lift(container, storage) {
    const direction = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const n = storage.length, m = storage[0].length;
    const temp = storage.map(row => row.split(''));

    const accessible = new Set();

    function bfs() {
        const queue = [];
        const visited = Array.from({ length: n }, () => Array(m).fill(false));

        for (let i = 0; i < n; i++) {
            if (!visited[i][0]) {
                visited[i][0] = true;
                queue.push([i, 0]);
            }
            if (!visited[i][m - 1]) {
                visited[i][m - 1] = true;
                queue.push([i, m - 1]);
            }
        }
        for (let j = 0; j < m; j++) {
            if (!visited[0][j]) {
                visited[0][j] = true;
                queue.push([0, j]);
            }
            if (!visited[n - 1][j]) {
                visited[n - 1][j] = true;
                queue.push([n - 1, j]);
            }
        }

        while (queue.length > 0) {
            const [x, y] = queue.shift();

            if (temp[x][y] === container) {
                accessible.add(`${x},${y}`);
            }
            
            if(temp[x][y] == 0) {
                for (const [dx, dy] of direction) {
                    const nx = x + dx, ny = y + dy;
                    if (nx >= 0 && ny >= 0 && nx < n && ny < m && !visited[nx][ny]) {
                        visited[nx][ny] = true;
                        queue.push([nx, ny]);
                    }
                }
            }
        }
    }

    bfs();

    for (const pos of accessible) {
        const [i, j] = pos.split(',').map(Number);
        temp[i][j] = 0
    }

    return temp.map(row => row.join(''));
}

function crane(container, storage) {
    const temp = storage.map(row => row.split(''));

    for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp[0].length; j++) {
            if (temp[i][j] === container) {
                temp[i][j] = 0;
            }
        }
    }

    return temp.map(row => row.join(''));
}

function solution(storage, requests) {
    let tempStorage = storage;

    for (const request of requests) {
        const container = request[0];
        if (request.length === 1) {
            tempStorage = lift(container, tempStorage);
        } else {  
            tempStorage = crane(container, tempStorage);
        }
    }

    let remain = 0;
    for (let row of tempStorage) {
        for (let cell of row) {
            if (cell !== '0') {
                remain++;
            }
        }
    }

    return remain;
}
