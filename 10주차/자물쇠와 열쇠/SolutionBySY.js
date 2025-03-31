function solution(key, lock) {
    const n = lock.length, m = key.length;
    
    const extendedLength = m + (n - 1) * 2;
    const extendedKey = Array.from({length: n - 1}, () => Array(extendedLength).fill(0));
    
    key.forEach((arr) => extendedKey.push([...Array(n - 1).fill(0), ...arr, ...Array(n - 1).fill(0)]));
    
    for(let i = 0; i < n - 1; i++) {
        extendedKey.push(Array(extendedLength).fill(0));
    }
    
    // 자물쇠랑 열쇠 맞춰보기
    const join = () => {
        for(let r1 = 0; r1 <= extendedLength - n; r1++) {
            outer: for(let c1 = 0; c1 <= extendedLength - n; c1++) {
                
                // 자물쇠
                for(let r2 = 0; r2 < n; r2++) {
                    for(let c2 = 0; c2 < n; c2++) {
                        if(extendedKey[r1 + r2][c1 + c2] === lock[r2][c2]) {
                            continue outer;
                        }
                    }   
                }
                
                return true;
            }
        }
        
        return false;
    }
    
    // 90도 회전
    const turnLock = () => {
        const temp = Array.from({length: n}, () => Array(n));
        
        for(let r = 0; r < n; r++) {
            for(let c = 0; c < n; c++) {
                temp[r][c] = lock[n - c - 1][r];
            }
        }
        
        lock = temp;
    }
    
    let isPossible = false;
    
    for(let i = 0; i < 4; i++) {
        turnLock();
        isPossible = join();
        
        if(isPossible) {
            return true;
        }
    }
    
    return false;
}
