function solution(sequence, k) {
  let result = [0, 0];
  const n = sequence.length;
  let left = 0;
  let right = 0;
  let minLen = n + 1;
  let sum = sequence[0];

  while (left <= right && right < n) {
    if (sum < k) {
      right++;
      if (right < n) sum += sequence[right];
    } else if (sum > k) {
      sum -= sequence[left];
      left++;
    } else {
      // sum === k
      if (
        right - left + 1 < minLen || // 더 짧은 수열
        (right - left + 1 === minLen && left < result[0]) // 길이 동일, 인덱스 작은 수열
      ) {
        minLen = right - left + 1;
        result = [left, right];
      }
      sum -= sequence[left];
      left++;
    }
  }

  return result;
}
