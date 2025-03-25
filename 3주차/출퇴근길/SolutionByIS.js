const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let n = 0, m = 0;       // n: 정점 개수, m: 간선 개수
let S = 0, T = 0;       // S: 집, T: 회사
let curLine = 0;
let graph = new Map();  //  정방향
let rGraph = new Map(); //  역방향

function findNodes(start, stop, isReverse) {
  const visited = new Set();

  // JavaScript의 콜 스택 크기는 보통 10000~50000 정도로 제한되어 있음
  // 이를 초과할 경우 "Maximum call stack size exceeded" 에러 발생 가능 > 런타임 에러
  // 재귀(콜스택)를 사용하지 않고 반복문 기반으로 직접 스택 관리 > 메모리 힙에 스택 저장 > 콜 스택 크기 제한 X
  const stack = [start];

  const nowGraph = isReverse ? rGraph : graph;

  while (stack.length > 0) {
    const node = stack.pop();

    if (visited.has(node))
      continue;

    if (node === stop) {
      visited.add(node);
      continue;
    }

    visited.add(node);

    for (let next of nowGraph.get(node)) {
      if (!visited.has(next)) {
        stack.push(next);
      }
    }
  }
  return visited;
}

rl.on('line', (line) => {
  if (n === 0) {
    [n, m] = line.split(' ').map(Number);
    for (let i = 1; i <= n; i++) {
      graph.set(i, []);
      rGraph.set(i, []);
    }
  } else if (curLine < m) {
    const [x, y] = line.split(' ').map(Number);
    graph.get(x).push(y);
    rGraph.get(y).push(x);
    curLine++;
  } else {
    [S, T] = line.split(' ').map(Number);
  }
}).on('close', () => {
  // 출근길 (S -> T)
  const s1 = findNodes(S, T, false);  // S에서 갈 수 있는 노드들
  const s2 = findNodes(T, -1, true);  // T로 갈 수 있는 노드들, 역방향
  
  // 퇴근길 (T -> S)
  const s3 = findNodes(T, S, false);  // T에서 갈 수 있는 노드들
  const s4 = findNodes(S, -1, true);  // S로 갈 수 있는 노드들, 역방향
  
  // 교집합
  let result = new Set([...s1].filter(x => s2.has(x)));
  result = new Set([...result].filter(x => s3.has(x)));
  result = new Set([...result].filter(x => s4.has(x)));
  
  // S, T 제외
  result.delete(S);
  result.delete(T);
  
  console.log(result.size);
});
