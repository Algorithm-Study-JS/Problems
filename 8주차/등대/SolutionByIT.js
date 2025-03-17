function solution(n, lighthouse) {
    const graph = Array.from({ length: n + 1 }, () => []);
    
    lighthouse.forEach(([a, b]) => {
        graph[a].push(b);
        graph[b].push(a);
    });

    // [node가 꺼졌을 때 최소 등대 수, node가 켜졌을 때 최소 등대 수]
    const dp = Array.from({ length: n + 1 }, () => [0, 0]);
    const visited = Array(n + 1).fill(false);

    function dfs() {
        const stack = [1];
        
        while (stack.length > 0) {
            const node = stack[stack.length - 1];
            
            visited[node] = true;

            let allVisited = true;

            // 연결 순회하고
            for (const neighbor of graph[node]) {
                if (!visited[neighbor]) {
                    allVisited = false;
                    stack.push(neighbor);
                }
            }
            
            // 돌아오며 값 갱신
            if (allVisited) {
                stack.pop();

                dp[node][0] = 0;
                dp[node][1] = 1;

                for (const neighbor of graph[node]) {
                    dp[node][0] += dp[neighbor][1];
                    dp[node][1] += Math.min(dp[neighbor][0], dp[neighbor][1]);
                }
            }
        }
    }

    dfs();

    return Math.min(dp[1][0], dp[1][1]);
}
