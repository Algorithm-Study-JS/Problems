// 주사위 개수에 따른 인덱스 조합 생성
function getCombinations(n) {
    const result = [];
    
    function combine(start, current) {
        if (current.length === n / 2) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i < n; i++) {
            current.push(i);
            combine(i + 1, current);
            current.pop();
        }
    };
    
    combine(0, []);
    
    return result;
}

// A가 가진 주사위들의 합 경우와 B가 가진 주사위들의 합 경우 비교
function compareDice(diceA, diceB) {
    let win = 0;
    // diceA.forEach(a => {
    //     diceB.forEach(b => {
    //         if(a > b) win++;
    //     })
    // })
    return win;
}


function solution(dice) {
    const idx = Array.from({ length: dice.length }, (_, i) => i);
    const diceAcombinations = getCombinations(dice.length);
    const diceBcombinations = diceAcombinations.map(comb => idx.filter(el => !comb.includes(el)));
    
    let combi = [], max = -1;
    
    // 가진 주사위들의 합 경우의 수
    function makeCombi(indices) {
        const temp = {};
        
        function combine(idx, currentSum) {
            if (idx === indices.length) {
                temp[currentSum] = (temp[currentSum] || 0) + 1;
                return;
            }
            
            for (let i = 0; i < 6; i++) {
                combine(idx + 1, currentSum + dice[indices[idx]][i]);
            }
        }
        
        combine(0, 0);
        
        return temp;
    }
    
    for (let i = 0; i < diceAcombinations.length; i++) {
        const tempA = makeCombi(diceAcombinations[i]);
        const tempB = makeCombi(diceBcombinations[i]);
        let temp = compareDice(tempA, tempB);

        if (temp > max) {
            max = temp;
            combi = diceAcombinations[i];
        }
    }
    
    return combi.map(el => el + 1);
}
