function solution(cards) {
  const len = cards.length;
  let visited = Array.from({ length: len + 1 }, () => false);
  let groups = [];

  const selectCard = (num, cnt) => {
    if (visited[num]) {
      groups.push(cnt);
      return;
    }
    visited[num] = true;
    selectCard(cards[num - 1], cnt + 1);
  };

  // 그룹 만들기
  for (let i = 0; i < len; i++) {
    if (!visited[i + 1]) {
      visited[i + 1] = true;
      selectCard(cards[i], 1);
    }
  }

  // 그룹이 한 개 밖에 없는 경우: 0 리턴
  if (groups.length <= 1) return 0;

  // 최고 점수 리턴
  groups.sort((a, b) => b - a);
  return groups[0] * groups[1];
}
