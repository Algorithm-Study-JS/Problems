function solution(N, number) {
  // N을 i번 사용해서 만들 수 있는 숫자들의 집합
  const dp = Array.from({ length: 9 }, () => new Set());
  dp[1].add(N);
  
  for (let i = 1; i <= 8; i++) {
    dp[i].add(Number(String(N).repeat(i)));

    // j번 사용한 숫자와 (i-j)번 사용한 숫자를 조합해서 i 생성
    for (let j = 1; j < i; j++) {
      for (const num1 of dp[j]) {
        for (const num2 of dp[i - j]) {
          dp[i].add(num1 + num2);
          dp[i].add(num1 - num2);
          dp[i].add(num1 * num2);
          if (num2 !== 0) dp[i].add(Math.floor(num1 / num2));
        }
      }
    }
    if (dp[i].has(number)) {
      return i;
    }
  }
  
  return -1;  // 8번 초과해서 만들 수 없는 경우
}