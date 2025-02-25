function solution(k, ranges) {
  let answer = [];
  let area = [[k, 0]]; // idx: x > [y, area]

  while (k > 1) {
    if (k % 2 === 0)
      k = k / 2
    else
      k = k * 3 + 1;
    area.push([k]);
  }

  for (let i = 1; i < area.length; i++) {
    // 사다리꼴 넓이: (윗변 + 아랫변) * 높이 / 2
    area[i].push(area[i - 1][1] + (area[i][0] + area[i - 1][0]) / 2);
  }

  for (let i = 0; i < ranges.length; i++) {
    const [lt, rt] = [ranges[i][0], area.length - 1 + ranges[i][1]];
    if (lt > rt) {
      answer.push(-1)
    } else {
      answer.push(area[rt][1] - area[lt][1]);
    }
  }

  
  return answer;
}