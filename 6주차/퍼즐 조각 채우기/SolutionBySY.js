function solution(game_board, table) {
    const dr = [-1, 0, 1, 0], dc = [0, 1, 0, -1];
    const n = game_board.length;
    
    const before = game_board.reduce((acc, arr) => {
        return acc + arr.filter(val => val === 0).length;
    }, 0);
    
    const puzzles = [];
    const blanks = [];
    
    // 모양을 왼쪽 상단으로 최대한 붙여서 일반화
    const normalize = (coords) => {
        const minR = Math.min(...coords.map(coord => coord[0]));
        const minC = Math.min(...coords.map(coord => coord[1]));
        
        return coords.map(([r, c]) => [r - minR, c - minC]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    }
    
    for(let r = 0; r < n; r++) {
        for(let c = 0; c < n; c++) {
            // 퍼즐 찾기
            if(table[r][c] === 1) {
                const queue = [[r, c]];
                table[r][c] = 0;
                let head = 0;
                
                while(head < queue.length) {
                    const [currR, currC] = queue[head++];
                    
                    for(let d = 0; d < 4; d++) {
                        const nr = currR + dr[d];
                        const nc = currC + dc[d];
                        
                        if(nr >= 0 && nr < n && nc >= 0 && nc < n && table[nr][nc] === 1) {
                            queue.push([nr, nc]);
                            table[nr][nc] = 0;
                        }
                    }
                }
                
                puzzles.push(normalize(queue));
            }
            
            // 빈칸 찾기
            if(game_board[r][c] === 0) {
                const queue = [[r, c]];
                game_board[r][c] = 1;
                let head = 0;
                
                while(head < queue.length) {
                    const [currR, currC] = queue[head++];
                    
                    for(let d = 0; d < 4; d++) {
                        const nr = currR + dr[d];
                        const nc = currC + dc[d];
                        
                        if(nr >= 0 && nr < n && nc >= 0 && nc < n && game_board[nr][nc] === 0) {
                            queue.push([nr, nc]);
                            game_board[nr][nc] = 1;
                        }
                    }
                }
                
                blanks.push(normalize(queue));
            }
        }
    }
    
    // 퍼즐 돌리기
    const turnPuzzle = (puzzle) => {
        const arr = [puzzle];
        
        for(let i = 0; i < 3; i++) {
            const prev = arr[arr.length - 1];
            const maxR = prev[prev.length - 1][0];
            const turned = prev.map(([r, c]) => [c, maxR - r]);
            arr.push(normalize(turned)); // 일반화해서 저장
        }
        
        return arr;
    }
    
    const puzzleSet = puzzles.map(puzzle => turnPuzzle(puzzle));
    
    let usedPuzzle = 0;
    const usedNum = Array(puzzleSet.length).fill(false);
    
    for(let i = 0; i < blanks.length; i++) {
        const blank = blanks[i];
        
        outer: for(let j = 0; j < puzzleSet.length; j++) {
            const puzzle = puzzleSet[j];
            
            if(!usedNum[j] && blank.length === puzzle[0].length) {
                for(let k = 0; k < 4; k++) {
                    if(JSON.stringify(blank) === JSON.stringify(puzzle[k])) {
                        
                        usedNum[j] = true;
                        usedPuzzle += blank.length;
                        break outer;
                    }
                }
            }
        }
    }
    
    return usedPuzzle;
}
