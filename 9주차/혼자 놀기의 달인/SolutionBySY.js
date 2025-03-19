function solution(cards) {
    const visited = Array(cards.length).fill(false);
    const groups = [];
    
    const makeGroup = (start) => {
        let index = cards[start] - 1;
        const group = [index + 1];
        
        while(!visited[index]) {
            group.push(cards[index]);
            visited[index] = true;
            index = cards[index] - 1;
        }
        
        return group.length === 0 ? null : group;
    }
    
    for(let i = 0; i < cards.length; i++) {
        if(!visited[i]) {
            visited[i] = true;
            groups.push(makeGroup(i));
        }
    }
    
    groups.sort((a, b) => b.length - a.length)
    
    return groups[0].length === cards.length ? 0 : groups[0].length * groups[1].length;
}
