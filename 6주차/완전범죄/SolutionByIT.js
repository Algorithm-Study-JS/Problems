function solution(info, n, m) {
    let memo = {};

    function dfs(idx, A, B) {
        if (A >= n || B >= m) return Infinity;
        
        if (idx === info.length) return A;

        if (memo[`${idx}-${A}-${B}`] !== undefined) {
            return memo[`${idx}-${A}-${B}`];
        }

        let resultA = dfs(idx + 1, A + info[idx][0], B);
        let resultB = dfs(idx + 1, A, B + info[idx][1]);
        let result = Math.min(resultA, resultB);

        memo[`${idx}-${A}-${B}`] = result;

        return result;
    }

    let answer = dfs(0, 0, 0);

    return answer === Infinity ? -1 : answer;
}
