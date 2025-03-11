function solution(dice) {
  const n = dice.length;
  let maxRate = -1;
  let answer = [];

  const combs = getComb([...Array(n).keys()], n / 2);

  for (const combA of combs) {
    // B의 주사위 선택
    const combB = [...Array(n).keys()].filter((i) => !combA.includes(i));

    const sumsA = getSums(dice, combA); // A 주사위로 구할 수 있는 합계 배열
    const sumsB = getSums(dice, combB); // B 주사위로 구할 수 있는 합계 배열

    sumsB.sort((a, b) => a - b); // B의 주사위 합을 정렬 (이분탐색을 위해)

    let wins = 0; // A가 이기는 경우의 수

    for (const sumA of sumsA) {
      // count: B의 배열에서 A의 합보다 작은 값의 개수 > A가 이기는 경우의 수
      const count = binarySearch(sumsB, sumA);
      wins += count;
    }

    const winRate = wins / (sumsA.length * sumsB.length);

    if (winRate > maxRate) {
      maxRate = winRate;
      answer = combA.map((i) => i + 1); // 주사위 번호는 1부터 시작
    }
  }
  return answer;
}

// 선택된 주사위의 조합(comb)으로 구할 수 있는 모든 합의 배열
function getSums(dice, comb) {
  const sums = [];

  function dfs(idx, sum) {
    if (idx === comb.length) {
      sums.push(sum);
      return;
    }

    for (const val of dice[comb[idx]]) {
      dfs(idx + 1, sum + val);
    }
  }

  dfs(0, 0);
  return sums;
}

function binarySearch(arr, value) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < value) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}

function getComb(arr, r) {
  const result = [];

  function dfs(cur, start) {
    if (cur.length === r) {
      result.push([...cur]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      cur.push(arr[i]);
      dfs(cur, i + 1);
      cur.pop();
    }
  }

  dfs([], 0);
  return result;
}
