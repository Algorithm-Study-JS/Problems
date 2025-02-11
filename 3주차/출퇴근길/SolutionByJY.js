// 실행시간 : 0.729초, 메모리 : 103.03MB

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line.split(' ').map(Number));
}).on('close', () => {
  const [n, m] = lines.shift();
  let graph = Array.from({ length: n + 1 }, () => []); // 출근길
  let reverseGraph = Array.from({ length: n + 1 }, () => []); // 퇴근길(역방향)

  // 간선 저장
  for (let i = 0; i < m; i++) {
    const [a, b] = lines[i];
    graph[a].push(b);
    reverseGraph[b].push(a);
  }

  const [S, T] = lines[lines.length - 1];

  const dfs = (start, visited, graph) => {
    let stack = [start];

    while (stack.length) {
      const node = stack.pop();
      if (visited[node]) continue;

      visited[node] = true;

      for (const now of graph[node]) {
        if (visited[now]) continue;

        stack.push(now);
      }
    }
  };

  let fromS = Array(n + 1).fill(false);
  let toT = Array(n + 1).fill(false);
  let fromT = Array(n + 1).fill(false);
  let toS = Array(n + 1).fill(false);

  fromS[T] = true; // 출근길 탐색 시 T에 도달하면 탐색 중지
  fromT[S] = true; // 퇴근길 탐색 시 S에 도달하면 탐색 중지

  // 출근길 탐색
  dfs(S, fromS, graph);
  dfs(T, toT, reverseGraph);

  // 퇴근길 탐색
  dfs(T, fromT, graph);
  dfs(S, toS, reverseGraph);

  let answer = 0;

  for (let i = 1; i <= n; i++) {
    if (fromS[i] && toT[i] && fromT[i] && toS[i]) {
      answer++;
    }
  }

  console.log(answer - 2);
});
