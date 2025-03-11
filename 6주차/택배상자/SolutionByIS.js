function solution(order) {
  let answer = 0;
  const sub = [];
  let cur = 1;
  let orderIdx = 0;

  while (orderIdx < order.length) {
    // 서브 벨트 확인
    if (sub.length > 0) {
      if (order[orderIdx] < sub[sub.length - 1]) {
        // 현재 꺼내야 하는 값이 서브 벨트 마지막 값보다 작은 값: break
        break;
      } else if (order[orderIdx] === sub[sub.length - 1]) {
        // 서브 벨트에서 실을 수 있는 경우
        sub.pop();
        orderIdx++;
        answer++;
        continue;
      }
    }

    // 메인 벨트 확인
    if (cur === order[orderIdx]) {
      // 실을 수 있는 경우
      cur++;
      orderIdx++;
      answer++;
      continue;
    } else {
      // 실을 수 없는 경우
      sub.push(cur);
      cur++;
    }
  }

  return answer;
}
