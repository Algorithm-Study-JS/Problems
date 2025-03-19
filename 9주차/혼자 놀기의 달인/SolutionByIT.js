function solution(cards) {
    const answer = [], visited = Array(cards.length).fill(false);
    
    for(let i = 0; i < cards.length; i++) {
        if(!visited[i]) {
            let cur = i, size = 0;
            
            while(!visited[cur]) {
                visited[cur] = true;
                size++;
                cur = cards[cur] - 1;
            }
            
            answer.push(size);
        }
    }
    
    answer.sort((a, b) => b - a);
    
    return answer[0] * (answer[1] || 0);
}
