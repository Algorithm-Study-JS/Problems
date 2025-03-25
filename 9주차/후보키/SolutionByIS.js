function solution(relation) {
  let keys = []; // 후보키 저장 배열
  const colIdx = Array.from({ length: relation[0].length }, (_, i) => i); // 컬럼 인덱스 배열

  function comb(arr, num) {
    if (num === 1) return arr.map((v) => [v]);
    let result = [];
    // forEach: 현재요소, 인덱스, 원본배열
    arr.forEach((el, idx, array) => {
      const rest = array.slice(idx + 1);
      const combos = comb(rest, num - 1);
      const merged = combos.map((combo) => [el, ...combo]);
      result.push(...merged);
    });
    return result;
  }

  let combArr = [];
  for (let i = 1; i <= relation[0].length; i++) {
    combArr.push(...comb(colIdx, i));
  }

  // 유일성
  function isUnique(comb) {
    let checked = new Set();
    for (let row of relation) {
      let key = comb.map((index) => row[index]).join("|"); // 문자열로 변환하여 비교
      if (checked.has(key)) return false;
      checked.add(key);
    }
    return true;
  }

  // 최소성
  function isMinimal(comb) {
    return !keys.some((key) => key.every((col) => comb.includes(col)));
  }

  for (let comb of combArr) {
    if (isUnique(comb) && isMinimal(comb)) {
      keys.push(comb);
    }
  }

  return keys.length;
}
