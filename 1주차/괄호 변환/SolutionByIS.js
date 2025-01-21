function solution(p) {
  // 1. 입력이 빈 문자열인 경우: 그대로 반환
  if (p === "") return p;

  let ans = "";
  // 2. 문자열 w를 u,v로 분리
  let dividedStrs = divide(p);
  let u = dividedStrs[0];
  let v = dividedStrs[1];

  if (isCorrect(u)) {
    // 3. u가 올바른 괄호 문자열인 경우: v에 대해 1단계부터 수행
    return u + solution(v);
  } else {
    // 4. u가 올바른 괄호 문자열이 아닌 경우
    // ( + v에 대해 재귀함수 수행 + )
    ans += "(" + solution(v) + ")";
    // u의 첫 번째와 마지막 문자를 제거 + 나머지 문자열의 괄호 방향 뒤집기기
    for (let i = 1; i < u.length - 1; i++) {
      ans += u[i] === "(" ? ")" : "(";
    }
    return ans;
  }
}

// 올바른 괄호 문자열인지 확인
function isCorrect(str) {
  let count = 0;
  for (let ch of str) {
    if (ch === "(") count++;
    else count--;
    if (count < 0) return false;
  }
  return count === 0;
}

// u와 v로 분리
function divide(str) {
  let ltCnt = 0; // 왼쪽
  let rtCnt = 0; // 오른쪽
  let dividedStrs = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") ltCnt++;
    else if (str[i] === ")") rtCnt++;

    if (ltCnt === rtCnt) {
      dividedStrs.push(str.slice(0, i + 1));
      dividedStrs.push(str.slice(i + 1));
      break;
    }
  }

  return dividedStrs;
}
