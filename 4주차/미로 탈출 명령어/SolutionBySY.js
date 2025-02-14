function solution(n, m, x, y, r, c, k) {
  let mustMoveCount = Math.abs(x - r) + Math.abs(y - c);
    
  // 남은 이동 횟수가 부족하거나 홀짝이 맞지 않으면 불가능
  if (k < mustMoveCount || (k - mustMoveCount) % 2 === 1) return 'impossible';

  const result = [];
  // extra = (k - dist) / 2  (남은 이동 횟수를 2로 나눠서 취소되는 쌍의 횟수)
  if (k > mustMoveCount) {
    let extra = (k - mustMoveCount) / 2;
      
    // 가능한 경우 아래('d')로 한 번 이동하여 여분을 줄인다.
    while (extra > 0) {
      if (x < n) {
        // 만약 아래로 한 칸 이동했을 때 새 맨해튼 거리는
        let newDist = Math.abs((x + 1) - r) + Math.abs(y - c);
          
        // 이동 후 남은 이동 횟수(k-1)와 새 거리의 차이가 짝수여야 함
        if (k - 1 >= newDist && ((k - 1 - newDist) % 2 === 0)) {
          x++;     // 아래로 이동
          k--;     // 남은 이동 횟수 1 감소
          result.push('d');
          mustMoveCount = newDist;
          extra = (k - mustMoveCount) / 2;
          continue;
        }
      }
      break;
    }
      
    // 가능한 경우 왼쪽('l')으로 이동
    while (extra > 0) {
      if (y > 1) {
        let newDist = Math.abs(x - r) + Math.abs((y - 1) - c);
        if (k - 1 >= newDist && ((k - 1 - newDist) % 2 === 0)) {
          y--;     // 왼쪽으로 이동
          k--;
          result.push('l');
          mustMoveCount = newDist;
          extra = (k - mustMoveCount) / 2;
          continue;
        }
      }
      break;
    }
      
    // 만약 여전히 extra가 남았다면, 좌우 쌍(r, l) 이동으로 2회씩 소비
    for (let i = 0; i < extra; i++) {
      k -= 2;
      // 여기서는 r 후 l을 진행 – (r,l)는 이동 후 제자리로 돌아오므로 위치 변화 없음
      result.push('r');
      result.push('l');
    }
  }
  
  // 최종적으로 (x,y)에서 (r,c)까지 직진하는 경로 추가
  const rowDiff = Math.abs(x - r);
  const colDiff = Math.abs(y - c);
    
  if (x < r) {
    for (let i = 0; i < rowDiff; i++) result.push('d');
  }
    
  if (y > c) {
    for (let i = 0; i < colDiff; i++) result.push('l');
  }
    
  if (y < c) {
    for (let i = 0; i < colDiff; i++) result.push('r');
  }
    
  if (x > r) {
    for (let i = 0; i < rowDiff; i++) result.push('u');
  }

  return result.join('');
}
