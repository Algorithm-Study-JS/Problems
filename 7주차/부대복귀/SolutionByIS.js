function solution(n, roads, sources, destination) {
  let answer = Array.from({ length: n + 1 }, () => -1);
  let map = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of roads) {
    map[a].push(b);
    map[b].push(a);
  }

  let Q = [[destination, 0]];
  let visited = Array(n + 1).fill(0);

  // 목적지에서 출발
  visited[destination] = 1;
  answer[destination] = 0;

  while (Q.length) {
    const [now, dis] = Q.shift();

    for (const next of map[now]) {
      if (!visited[next]) {
        visited[next] = 1;
        answer[next] = dis + 1;
        Q.push([next, dis + 1]);
      }
    }
  }

  let result = [];
  for (let i = 0; i < sources.length; i++) {
    result.push(answer[sources[i]]);
  }

  return result;
}
