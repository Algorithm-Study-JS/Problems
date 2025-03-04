function bfs(row, col, board, k) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const queue = [[row, col]], block = [];
    
    board[row][col] = k;
        
    while(queue.length) {
        let [r, c] = queue.shift();
        block.push([r, c]);
            
        for(let [dr, dc] of directions) {
            const nr = r + dr, nc = c + dc;
                
            if(nr >= 0 && nc >= 0 && nr < board.length && nc < board.length && board[nr][nc] !== k) {
                board[nr][nc] = k;
                queue.push([nr, nc]);
            }
        }
    }
    return initBlock(block);
}

function initBlock (block) {
    const minR = Math.min(...block.map(([r, c]) => r));
    const minC = Math.min(...block.map(([r, c]) => c));
        
    return block.map(([r, c]) => [r - minR, c - minC]).sort();
}

function rotateBlock (block) {
    const max = Math.max(...block.map(([r, c]) => Math.max(r, c)));
    const rotated = block.map(([r, c]) => [max - c, r])
    return initBlock(rotated);
}

function solution(game_board, table) {
    const blocks = [], blanks = [];
    
    for(let i = 0; i < game_board.length; i++) {
        for(let j = 0; j < game_board.length; j++) {
            if(!game_board[i][j]) {
                blanks.push(bfs(i, j, game_board, 1));
            }
        }
    }
    
    for(let i = 0; i < table.length; i++) {
        for(let j = 0; j < table.length; j++) {
            if(table[i][j]) {
                blocks.push(bfs(i, j, table, 0));
            }
        }
    }
    
    let answer = 0;
    
    blocks.forEach(block => {
        outer: for(let i = 0; i < blanks.length; i++) {
            for(let rt = 1; rt <= 4; rt++) {
                block = rotateBlock(block);
                if(JSON.stringify(block) === JSON.stringify(blanks[i])) {
                    blanks.splice(i, 1);
                    answer += block.length;
                    break outer;
                }
            }
        }
    })
    
    return answer;
}
