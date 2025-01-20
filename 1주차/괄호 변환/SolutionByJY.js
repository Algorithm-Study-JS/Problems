function solution(p) {
  let answer = '';

  // 입력이 빈 문자열인 경우
  if (p === '') return '';

  // 올바른 괄호인지
  const isCorrect = (str) => {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '(') count++;
      else count--;

      if (count < 0) return false;
    }
    return count === 0;
  };

  // 과정
  const solve = (w) => {
    if (w === '') return '';

    let right = 0,
      left = 0,
      index = 0;

    // u, v 분리
    for (let i = 0; i < w.length; i++) {
      if (w[i] === '(') right++;
      else left++;

      if (right === left) {
        index = i + 1;

        break;
      }
    }

    const [u, v] = [w.slice(0, index), w.slice(index)];

    if (isCorrect(u)) {
      return u + solve(v);
    } else {
      let str = '(';

      str += solve(v) + ')';

      // u의 첫 번째와 마지막 제거 후 괄호 방향 뒤집기
      for (let i = 1; i < u.length - 1; i++) {
        str += u[i] === '(' ? ')' : '(';
      }

      return str;
    }
  };

  answer = solve(p);

  return answer;
}
