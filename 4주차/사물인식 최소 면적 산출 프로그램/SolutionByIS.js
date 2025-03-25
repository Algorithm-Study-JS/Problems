const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N = 0, K = 0;
const lines = [];

rl.on('line', (line) => {
  if (N === 0) {
    [N, K] = line.split(' ').map(Number);
  } else {
    lines.push(line.split(" ").map(Number));
  }
}).on('close', () => {
  //  동일한 색을 가진 점 저장
  const groups = Array.from({ length: K + 1}, () => []);

  for (let i = 0; i < lines.length; i++) {
    const [x, y, k] = lines[i];
    groups[k].push([x, y]);
  }

  let minArea = Infinity; // 최소 넓이
  const INF = 1000; // 좌표의 최댓값: 1000

  function comb(idx, selIdx, minX, minY, maxX, maxY, area) {
    // 현재 넓이가 최소 넓이보다 큰 경우: return
    if (area >= minArea) return;

    // 모든 그룹에서 한 개씩 점을 선택한 경우 (총 K개 선택)
    if (selIdx === K) {
      minArea = area;  // 최소 면적 갱신
      return;
    }

    // 현재 그룹에 속한 모든 점들에 대해
    for (const point of groups[idx]) {
      const [r, c] = point;
      // 최소/최대 좌표 갱신
      const newMinX = Math.min(minX, r);
      const newMinY = Math.min(minY, c);
      const newMaxX = Math.max(maxX, r);
      const newMaxY = Math.max(maxY, c);
      // 사각형 넓이 새로 계산
      const newArea = (newMaxX - newMinX) * (newMaxY - newMinY);
      // 다음 그룹에 대해 재귀 호출
      comb(idx + 1, selIdx + 1, newMinX, newMinY, newMaxX, newMaxY, newArea);
    }
  }
  comb(1, 0, INF, INF, -INF, -INF, (2 * INF) * (2 * INF));
  console.log(minArea);
  process.exit(0);
});
