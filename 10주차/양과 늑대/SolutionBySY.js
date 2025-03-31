function solution(info, edges) {
    const tree = Array.from({ length: info.length }, () => []);
    edges.forEach(([s, e]) => {
        tree[s].push(e);
        tree[e].push(s);
    });

    let max = 0;
    const memo = new Set();

    const dfs = (sheep, wolves, candidates, visited) => {
        // 현재 양, 늑대, 후보 노드, 방문 노드로 상태 관리
        const key = `${sheep}-${wolves}/${[...candidates].sort((a, b) => a - b).join('-')}/${[...visited].sort((a, b) => a - b).join('-')}`;

        if (memo.has(key)) return;
        memo.add(key);

        max = Math.max(max, sheep);

        for (let i = 0; i < candidates.length; i++) {
            const node = candidates[i];

            let [nextSheep, nextWolves] = [sheep, wolves];
            info[node] === 0 ? nextSheep++ : nextWolves++;

            if (nextSheep <= nextWolves) continue;

            const nextVisited = new Set(visited);
            nextVisited.add(node);

            const nextCandidates = candidates.slice();
            nextCandidates.splice(i, 1);

            tree[node].forEach(child => {
                if (!nextVisited.has(child)) {
                    nextCandidates.push(child);
                }
            });

            dfs(nextSheep, nextWolves, nextCandidates, nextVisited);
        }
    }

    dfs(1, 0, tree[0], new Set([0]));

    return max;
}
