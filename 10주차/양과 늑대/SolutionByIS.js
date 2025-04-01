function solution(info, edges) {
  let answer = 0;

  const tree = Array.from({ length: info.length }, () => []);

  for (const [from, to] of edges) {
    tree[from].push(to);
  }

  const dfs = (node, sheep, wolf, path) => {
    // 현재 노드의 정보 >> 양: 0, 늑대: 1
    if (info[node] === 0) sheep += 1;
    else wolf += 1;

    if (wolf >= sheep) return;

    answer = Math.max(answer, sheep);

    // 다음 방문 노드 리스트
    const nextPath = [...path];

    for (const child of tree[node]) {
      nextPath.push(child);
    }

    // 현재 노드 경로에서 제거: 무한루프 방지
    const index = nextPath.indexOf(node);
    if (index > -1) nextPath.splice(index, 1);

    for (const nextNode of nextPath) {
      dfs(nextNode, sheep, wolf, nextPath);
    }
  };

  dfs(0, 0, 0, [0]);

  return answer;
}
