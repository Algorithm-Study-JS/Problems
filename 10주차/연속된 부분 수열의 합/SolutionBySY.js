function solution(sequence, k) {
    let answer = [-1, -1];
    let left = 0, right = 0;
    let sum = sequence[0];
    let minLength = Infinity;
    
    while(right < sequence.length) {
        if(sum === k) {
            const len = right - left + 1;
            
            if(len < minLength) {
                minLength = len
                answer = [left, right]
            }
            
            sum -= sequence[left++];
            
        } else {
            if(sum < k) {
                sum += sequence[++right];
            } else {
                sum -= sequence[left++];
            }
        }
    }
    
    return answer;
}
