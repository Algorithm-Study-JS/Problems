const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let n = 0, m = 0;       // n: 정점 개수, m: 간선 개수
let S = 0, T = 0;       // S: 집, T: 회사
let curLine = 0;
let graph = new Map();  // 인접 리스트

function findNodes(start) {
  const visited = new Set();
  const endNode = (start === S ? T : S);
  
  function dfs(node) {
    visited.add(node);
    
    for (let next of graph.get(node)) {
      if (next === endNode)
        continue;
      
      if(!visited.has(next)) {
        dfs(next);
      }
    }
  }

  dfs(start);
  return visited;
}

rl.on('line', (line) => {
  if (n === 0) {
    [n, m] = line.split(' ').map(Number);
    // 인접 리스트 초기화(n까지)
    for (let i = 0; i <= n; i++) {
      graph.set(i, []);
    }
  } else if (curLine < m) {
    const [x, y] = line.split(' ').map(Number);
    graph.get(x).push(y);
    curLine++;
  } else {
    [S, T] = line.split(' ').map(Number);
  }
}).on('close', () => {
  const nodesFromS = findNodes(S);
  const nodesFromT = findNodes(T);

  // 출퇴근길 노드 중에서 교집합 필터링
  const ansNodes = new Set(
    [...nodesFromS].filter(n => nodesFromT.has(n))
  );

  console.log(ansNodes.size);
});

// 5, 15, 22, 25번 케이스 오답
// 31~39 케이스 런타임 에러