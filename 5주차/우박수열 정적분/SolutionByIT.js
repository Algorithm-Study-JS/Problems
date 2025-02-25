function solution(k, ranges) {
    const seq = [k];
    let current = k;
    
    while (current !== 1) {
        if (current % 2 === 0) {
            current /= 2;
        } else {
            current = current * 3 + 1;
        }
        seq.push(current);
    }
    
    const n = seq.length;
    
    const answer = ranges.map(([a, b]) => {
        if (a >= n + b || a < 0 || b > 0) {
            return -1;
        }
        
        let area = 0;
        
        for (let i = a; i < n + b - 1; i++) {
            area += (seq[i] + seq[i + 1]) / 2;
        }
        
        return area;
    });
    
    return answer;
}
