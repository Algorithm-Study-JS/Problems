function solution(relation) {
    const possibleCases = [];
    
    // 후보키가 가능한지 확인
    const isCandidateKey = (list) => {
        
        // 조합 목록 하나씩 확인
        outer: for(const candidates of list) {
            const set = new Set();
            
            for(let i = 0; i < relation.length; i++) {
                let combined = "";
                
                for(const column of candidates) {
                    combined += relation[i][column];
                }
                
                // 결합한 데이터가 이미 set에 존재하면 pass
                if(set.has(combined)) {
                    continue outer;
                } else {
                    set.add(combined);
                }
            }
            
            possibleCases.push(candidates);
        }
    }
    
    // 조합
    const combination = (len) => {
        const result = [];
        
        const dfs = (selected, len, idx) => {
            if(selected.length === len) {
                result.push(selected);
                return;
            }
            
            for(let i = idx; i < relation[0].length; i++) {
                dfs([...selected, i], len, i + 1);
            }
        }
        
        dfs([], len, 0);
        
        isCandidateKey(result);
    }
    
    for(let i = 1; i <= relation[0].length; i++) {
        combination(i);
    }
    
    const used = Array.from({length: possibleCases.length}).fill(false);
    
    for(let i = 0; i < used.length; i++) {
        if(used[i]) {
            continue;
        }
        
        for(let j = i + 1; j < used.length; j++) {
            if(used[j]) {
                continue;
            }
            
            // possibleCases[i]의 모든 요소가 possibleCases[j]에 포함되어 있는지 확인
            const isSubarray = possibleCases[i].every(num => possibleCases[j].includes(num));

            if (isSubarray) {
              used[j] = true;
            }
        }
    }
        
    return used.filter(bool => !bool).length;
}
