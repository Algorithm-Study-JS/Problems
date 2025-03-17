function solution(n, lighthouse) {
    const connects = Array.from({length: n + 1}, () => []);
    
    for(const [s, e] of lighthouse) {
        connects[s].push(e);
        connects[e].push(s);
    }
    
    const dp = Array.from({length: n + 1}, () => [0, 0]);
    
    // 스택 오버플로우 때문에 배열로 dfs 구현
    const stack = [[1, -1, false]];
    
    while(stack.length) {
        const [node, parent, handled] = stack.pop();
        
        // 후위 탐색 해야함
        if(!handled) {
            stack.push([node, parent, true]);
            
            for(const child of connects[node]) {
                // 서로 연결된 등대
                if(child === parent) {
                    continue;
                }
                
                stack.push([child, node, false]);
            }
        }
        
        if(handled) {
            dp[node][0] = 0;
            dp[node][1] = 1;
            
            for(const child of connects[node]) {
                if(child === parent) {
                    continue;
                }
                
                // 현재 등대에서 꺼지면 자식 등대는 무조건 켜야함
                dp[node][0] += dp[child][1];
                
                // 현재 등대가 켜지면, 자식 등대는 키거나 끄거나
                dp[node][1] += Math.min(dp[child][0], dp[child][1]);
            }
        }
    }
    
    return Math.min(dp[1][0], dp[1][1]);
}
