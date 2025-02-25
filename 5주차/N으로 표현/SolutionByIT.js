function solution(N, number) {
    let dp = Array(9).fill().map(() => new Set());
    
    for (let i = 1; i <= 8; i++) {
        let num = parseInt(Array(i).fill(N).join(''));
        dp[i].add(num);
        
        for (let j = 1; j < i; j++) {
            for (let num1 of dp[j]) {
                for (let num2 of dp[i - j]) {
                    dp[i].add(num1 + num2);
                    dp[i].add(num1 - num2);
                    dp[i].add(num1 * num2);
                    if (num2 !== 0) dp[i].add(Math.floor(num1 / num2));
                }
            }
        }
        
        if (dp[i].has(number)) return i;
    }
    
    return -1; 
}
