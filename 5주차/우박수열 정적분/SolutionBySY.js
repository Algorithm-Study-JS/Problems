function solution(k, ranges) {
    const seq = [];
    
    while(k > 1) {
        seq.push(k);
        k = k % 2 === 0 ? k / 2 : k * 3 + 1
    }
    seq.push(1);
    
    const sizes = [];
    
    for(let i = 0; i < seq.length - 1; i++) {
        const longer = Math.max(seq[i], seq[i + 1]);
        const shorter = Math.min(seq[i], seq[i + 1]);
        
        sizes.push((longer - shorter) / 2 + shorter);
    }
    
    const answer = [];
    
    for(let [start, end] of ranges) {
        if(end === 0) {
            end = sizes.length;
        } else {
            end += sizes.length;
        }
        
        if(start > end) {
            answer.push((-1).toFixed(1));
            continue;
        }
        
        answer.push(sizes.slice(start, end).reduce((acc, cur) => acc + cur, 0).toFixed(1));
    }
    
    return answer;
}



