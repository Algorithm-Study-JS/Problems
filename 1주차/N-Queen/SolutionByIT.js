function solution(n) {
    let answer = 0;
    const hasQueen = Array.from({ length: n }, () => Array(n).fill(false));

    function backtrack(row) {
        // row가 n이라는 건 모든 퀸을 배치 완료하고 넘어온 것으로 완성본 하나 생성
        if (row === n) {
            answer++;
            return;
        }

        // 열 기준으로 재귀 함수 생성
        for (let col = 0; col < n; col++) {
            let canPlace = true;

            // 지금 열의 위를 보며 쭉 뻗어 나가며 바로 위, 대각선 좌-우 체크
            for (let prevRow = row - 1; prevRow >= 0; prevRow--) {
                if(hasQueen[prevRow][col]
                   || (col - (row - prevRow) >= 0 && hasQueen[prevRow][col - (row - prevRow)])
                   || (col + (row - prevRow) < n && hasQueen[prevRow][col + (row - prevRow)])) {
                    canPlace = false;
                    break;
                }
            }

            // 없다면 퀸 배치하고 다음 행으로 가고 초기화
            if (canPlace) {
                hasQueen[row][col] = true;
                backtrack(row + 1);
                hasQueen[row][col] = false;
            }
        }
    }

    backtrack(0);
    
    return answer;
}
