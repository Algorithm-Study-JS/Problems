function rotateKey(key) {
    const M = key.length;
    const rotatedKey = Array.from({ length : M }, () => Array(M).fill(0));

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < M; j++) {
            rotatedKey[j][M - 1 - i] = key[i][j];
        }
    }
    
    return rotatedKey;
}

function checkLock(lock, key, startRow, startCol) {
    const N = lock.length, M = key.length;
    const newLock = Array.from({ length : N }, () => Array(N).fill(0));

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < M; j++) {
            if (key[i][j]) {
                const row = i + startRow, col = j + startCol;

                if (row >= 0 && row < N && col >= 0 && col < N) {
                    newLock[row][col] += 1;
                }
            }
        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if ((!lock[i][j] && !newLock[i][j]) || (lock[i][j] && newLock[i][j])) {
                return false;
            }
        }
    }

    return true;
}

function solution(key, lock) {
    const N = lock.length, M = key.length;

    for (let i = 0; i < 4; i++) {
        key = rotateKey(key);

        for (let row = -M + 1; row < N; row++) {
            for (let col = -M + 1; col < N; col++) {
                if (checkLock(lock, key, row, col)) {
                    return true;
                }
            }
        }
    }

    return false;
}
