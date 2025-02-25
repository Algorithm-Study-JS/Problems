function solution(n) {
  const answer = [];
  hanoi(n, 1, 2, 3, answer);
  return answer;
}

function hanoi (cnt, from, via, to, answer) {
  if (cnt === 1) {
    answer.push([from, to]);
    return;
  }

  hanoi(cnt - 1, from, to, via, answer);
  answer.push([from, to]);
  hanoi(cnt - 1, via, from, to, answer);
}