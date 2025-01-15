function solution(maps) {

    const target = [maps.length - 1, maps[0].length - 1];
    const direction = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    const visited = Array.from({ length: maps.length }, () => Array(maps[0].length).fill(false));
    
    visited[0][0] = true;
    
    const queue = [[0, 0, 1]];
    
    while(queue.length > 0) {
        const [row, col, steps] = queue.shift();
        
        if(row === target[0] && col === target[1]) {
            return steps;
        }
        
        for (const [dx, dy] of direction) {
            const newRow = row + dx;
            const newCol = col + dy;

            if (newRow >= 0 && newRow < maps.length && newCol >= 0 && newCol < maps[0].length &&
                maps[newRow][newCol] === 1 && !visited[newRow][newCol]) {
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol, steps + 1]);
            }
        }
    }
    
    return -1;
}
