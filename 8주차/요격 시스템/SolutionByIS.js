function solution(targets) {
  let answer = 0;

  // 타겟 [s, e] 정렬
  // 1) end 기준 > 2) start 기준
  targets.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  let end = targets[0][1]; // 첫 번째 타겟의 끝 시간
  answer++;

  for (let target of targets) {
    // 현재 타겟의 시작시간이 마지막으로 확인한 타겟의 끝 시간보다 크거나 같다면
    if (target[0] >= end) {
      end = target[1];
      answer++;
    }
  }

  return answer;
}
