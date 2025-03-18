function solution(n, lighthouse) {
  const A = new Map();
  const dp = Array.from({ length: n + 1 }, () => [0, 0]); // [꺼졌을 때, 켜졌을 때]
  const visited = new Array(n + 1).fill(false);
  const stack = [];
  const order = [];

  lighthouse.forEach(([u, v]) => {
    if (!A.has(u)) A.set(u, []);
    if (!A.has(v)) A.set(v, []);
    A.get(u).push(v);
    A.get(v).push(u);
  });

  function dfs(start) {
    stack.push(start);
    while (stack.length) {
      const node = stack.pop();

      // 방문 순서대로 order에 저장
      if (!visited[node]) {
        visited[node] = true;
        order.push(node);
        A.get(node).forEach((neighbor) => {
          if (!visited[neighbor]) {
            stack.push(neighbor);
          }
        });
      }
    }
  }

  dfs(1);

  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (A.get(u).length === 0) {
      // 리프 노드인 경우
      dp[u][0] = 0;
      dp[u][1] = 1;
    } else {
      let off = 0;
      let on = 1;

      for (const v of A.get(u)) {
        if (visited[v]) {
          off += dp[v][1]; // 현재 노드가 꺼졌을 때, 자식은 켜져야 됨
          on += Math.min(dp[v][0], dp[v][1]); // 현재 노드가 켜졌을 때, 자식은 꺼져도 되고 켜져도 됨
        }
      }

      dp[u][0] = off;
      dp[u][1] = on;
    }
  }

  return Math.min(dp[1][0], dp[1][1]);
}
