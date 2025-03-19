function makeComb(sub, len) {
    const temp = [];
    
    function combine(start, arr) {
        if (arr.length === sub) {
            temp.push([...arr]);
            return;
        }
        
        for (let i = start; i < len; i++) {
            arr.push(i);
            combine(i + 1, arr);
            arr.pop();
        }
    }
    
    combine(0, []);
    return temp;
}

function solution(relation) {
    const len = relation[0].length, rowCount = relation.length;
    
    const candidateKeys = [];
    
    function isUnique(comb) {
        const seen = new Set();
        
        for (const row of relation) {
            const key = comb.map(index => row[index]).join(',');
            
            if (seen.has(key)) {
                return false;
            }
            
            seen.add(key);
        }
        
        return true;
    }
    
    function isMinimal(comb) {
        for (const key of candidateKeys) {
            if (key.every(index => comb.includes(index))) {
                return false;
            }
        }
        
        return true;
    }
    
    for (let cnt = 1; cnt <= len; cnt++) {
        const combs = makeComb(cnt, len);
        
        combs.forEach(comb => {
            if (isUnique(comb) && isMinimal(comb)) {
                candidateKeys.push(comb);
            }
        });
    }
    
    return candidateKeys.length;
}
