function solution(info, edges) {
    const tree = Array.from({length: info.length}, () => []);
    
    edges.forEach(([from, to]) => {
        tree[from].push(to);
    });
    
    let maxBaa = 0;
    
    const dfs = (node, sheep, wolves, next) => {
        if(info[node]) {
            wolves++;
        } else {
            sheep++;
        }
        
        if(wolves >= sheep) return;
        
        maxBaa = Math.max(maxBaa, sheep);
        
        const temp =  [...next].filter(el => el !== node);
        temp.push(...tree[node]);
        
        for(let next of temp) {
            dfs(next, sheep, wolves, temp);
        }
    }
    
    dfs(0, 0, 0, []);
    
    return maxBaa;
}
