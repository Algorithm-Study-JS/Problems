function solution(dice) {
    let answer = [];
    let max = -Infinity;
    
    // 그룹의 분포(합, 경우의 수)를 계산하는 함수
    function getDistribution(indices) {
        const dist = {};
        
        // 재귀적으로 분포를 계산
        function combine(idx, currentSum) {
            if (idx === indices.length) {
                dist[currentSum] = (dist[currentSum] || 0) + 1;
                return;
            }
            // 해당 주사위의 6면에 대해 순회
            for (let face = 0; face < 6; face++) {
                combine(idx + 1, currentSum + dice[indices[idx]][face]);
            }
        }
        combine(0, 0);
        
        return dist;
    }
    
    // 두 분포를 비교하여 그룹 A와 그룹 B의 승리 횟수를 계산하는 함수
    function compareDistribution(distA, distB) {
        let winA = 0, winB = 0;
        
        for (let sumA in distA) {
            for (let sumB in distB) {
                let a = Number(sumA), b = Number(sumB);
                
                if (a > b) {
                    winA += distA[sumA] * distB[sumB];
                    
                } else if (b > a) {
                    winB += distA[sumA] * distB[sumB];
                }
            }
        }
        
        return { winA, winB };
    }
    
    // A 그룹이 선택된 인덱스 배열에 따라, B 그룹은 전체에서 A를 제외한 인덱스로 결정됨
    const dual = (selectedA) => {
        const selectedB = Array.from({ length: dice.length }, (_, idx) => idx).filter(num => !selectedA.includes(num));
        
        const distA = getDistribution(selectedA);
        const distB = getDistribution(selectedB);
        const { winA, winB } = compareDistribution(distA, distB);
        
        // A의 승리 횟수가 더 크고 지금까지의 최대 승리 횟수보다 높으면 선택
        if (winA > winB && winA > max) {
            max = winA;
            answer = selectedA;
        } 
        // B 그룹이 더 유리하면, B 그룹을 선택
        else if (winB > winA && winB > max) {
            max = winB;
            answer = selectedB;
        }
    }
    
    // 주사위 인덱스 조합을 생성하는 함수 (전체 dice 길이의 절반)
    const combination = (selected, idx) => {
        if (selected.length === dice.length / 2) {
            dual(selected);
            return;
        }
        
        for (let i = idx; i < dice.length; i++) {
            combination([...selected, i], i + 1);
        }
    }
    
    combination([], 0);
    
    return answer.map(num => num + 1);
}
