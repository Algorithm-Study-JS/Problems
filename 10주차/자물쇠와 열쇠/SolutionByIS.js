function solution(key, lock) {
  const n = lock.length;
  const m = key.length;

  let tmp = key.map((row) => [...row]); // 열쇠 복사본

  for (let t = 0; t < 4; t++) {
    const exKey = extendKey(tmp, n, m);
    if (matchingKey(exKey, lock, n, m)) return true;
    tmp = turnKey(tmp, m);
  }

  return false;
}

function matchingKey(key, lock, n, m) {
  for (let i = 0; i < m + n - 1; i++) {
    for (let j = 0; j < m + n - 1; j++) {
      let flag = true;
      wrap: for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          if (lock[y][x] === key[i + y][j + x]) {
            flag = false;
            break wrap;
          }
        }
      }
      if (flag) return true;
    }
  }
  return false;
}

function extendKey(src, n, m) {
  const size = m + 2 * (n - 1);
  const extendKey = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      extendKey[i + n - 1][j + n - 1] = src[i][j];
    }
  }
  return extendKey;
}

function turnKey(src, m) {
  const turnKey = Array.from({ length: m }, () => Array(m).fill(0));
  let y = m - 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      turnKey[j][y] = src[i][j];
    }
    y--;
  }
  return turnKey;
}
