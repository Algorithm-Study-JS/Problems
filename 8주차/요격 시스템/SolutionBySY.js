function solution(targets) {
    // 좌표 끝 점을 기준으로 정렬
    targets.sort((a, b) => a[1] - b[1]);
    
    let end = targets[0][1];
    let cnt = 1;
    
    for(let i = 1; i < targets.length; i++) {
        const [s, e] = targets[i];
        
        // 끝점안에 들어오면 통과
        if(s < end) {
            continue;
        // 아니라면 요격하고 끝 점 갱신
        } else {
            end = e;
            cnt++;
        }
    }
    
    return cnt;
}
