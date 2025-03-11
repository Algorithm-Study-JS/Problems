function solution(game_board, table) {
  const N = game_board.length;
  let answer = 0;
  const dirs = [
    // 상, 하, 좌, 우
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // BFS를 이용한 블록 추출 함수
  const extractBlocks = (board, target) => {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    const blocks = [];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // target칸이 아니거나 이미 방문한 경우: continue
        if (board[i][j] !== target || visited[i][j]) {
          continue;
        }

        let Q = [[i, j]];
        let block = [];
        let minX = N;
        let minY = N;
        visited[i][j] = true;

        while (Q.length) {
          let [x, y] = Q.shift();
          block.push([x, y]);
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);

          for (let [dx, dy] of dirs) {
            let nx = x + dx;
            let ny = y + dy;

            if (
              nx >= 0 &&
              nx < N &&
              ny >= 0 &&
              ny < N &&
              !visited[nx][ny] &&
              board[nx][ny] === target
            ) {
              visited[nx][ny] = true;
              Q.push([nx, ny]);
            }
          }
        }

        // 1) minX와 minY를 이용하여 같은 모양의 블럭이라면 같은 좌표 배열에 위치하도록 변환
        // 2) sort를 통해 회전 및 이동에 상관없이 일정한 형태로 유지
        blocks.push(block.map(([x, y]) => [x - minX, y - minY]).sort());
      }
    }
    return blocks;
  };

  // 90도 회전
  const rotate = (block) => {
    let rotated = block.map(([x, y]) => [y, -x]); // 90도 회전
    let minX = Math.min(...rotated.map(([x, y]) => x));
    let minY = Math.min(...rotated.map(([x, y]) => y));

    // 회전 후에도 (0, 0) 기준으로 같은 좌표 배열에 위치하도록 변환
    return rotated
      .map(([x, y]) => [x - minX, y - minY])
      .sort((a, b) => {
        if (a[0] === b[0]) {
          return a[1] - b[1];
        }
        return a[0] - b[0];
      });
  };

  // 블록 비교
  const isEqual = (a, b) => {
    return (
      a.length === b.length && // 크기(길이)가 같고
      a.every(([x, y], i) => x === b[i][0] && y === b[i][1]) // a와 b의 모든 좌표가 일치하는지 확인
    );
  };

  let emptyBlocks = extractBlocks(game_board, 0); // 빈 공간의 블럭 모양들을 배열로 추출
  // 1) 테이블 위의 퍼즐 조각을 찾아 배열로 추출
  let puzzleBlocks = extractBlocks(table, 1).map((block) => {
    // 2) 90도씩 회전하며 블록의 모든 모양을 rotations에 저장
    let rotations = new Set();
    let current = block;

    for (let i = 0; i < 4; i++) {
      let rotated = rotate(current);
      let key = rotated.map(([x, y]) => `${x},${y}`).join("|");
      if (!rotations.has(key)) rotations.add(key);
      current = rotated;
    }

    // 3) Set에 저장되어 있는 모든 블록의 모양을 배열 형태로 변환
    return [...rotations].map((k) =>
      k.split("|").map((p) => p.split(",").map(Number))
    );
  });

  // 퍼즐조각 사용 여부
  let used = Array(puzzleBlocks.length).fill(false);

  // 빈 공간의 블럭 모양에 테이블에서 추출한 퍼즐 조각들을 매칭
  for (let empty of emptyBlocks) {
    for (let i = 0; i < puzzleBlocks.length; i++) {
      if (used[i]) {
        continue;
      }

      // 현재 빈 공간에 들어갈 수 있는 퍼즐 조각이 있다면
      if (puzzleBlocks[i].some((rotated) => isEqual(empty, rotated))) {
        answer += empty.length;
        used[i] = true;
        break;
      }
    }
  }

  return answer;
}
