function solution(n, m, currR, currC, targetR, targetC, k) {
    let answer = "";
    
    // 다이렉트로 갈 때 필요한 거리
    let dist = Math.abs(targetR - currR) + Math.abs(targetC - currC);
    
    // 다이렉트로도 못 가거나, 여분의 거리가 짝수가 아니라면 불가능
    if(dist > k || dist % 2 !== k % 2) return "impossible";
    
    // 여분이 있을 때
    // d, l, rl 순으로 돌아갈거임
    if(k > dist) {
        // 한 칸 돌아가면, 다시 돌아와야 하니까 2로 나눠줌
        let remain = (k - dist) / 2;
        
        // d 방향으로 돌아가기
        while(remain > 0 && currR < n) {
            answer += "d";
            k--;
            currR++;
            
            // d로 한 칸 움직인 상태에서 다이렉트 거리와, 남은 거리 갱신
            dist = Math.abs(targetR - currR) + Math.abs(targetC - currC);
            remain = (k - dist) / 2;
        }
        
        // l 방향으로 돌아가기
        while(remain > 0 && currC > 1) {
            answer += "l";
            k--;
            currC--;
            
            dist = Math.abs(targetR - currR) + Math.abs(targetC - currC);
            remain = (k - dist) / 2;
        }
        
        // 좌측 하단 구석에 도착했는데도, 돌아가야한다면
        // rl로 낭비하는게 사전순으로 베스트
        for(let i = 0; i < remain; i++) {
            answer += "rl";
        }
    }
    
    // 다이렉트 경로만 남은 상황에서
    // dlru 순으로 이동하기
    const distR = Math.abs(targetR - currR);
    const distC = Math.abs(targetC - currC);
    
    if(currR < targetR) {
        for(let i = 0; i < distR; i++) {
            answer += "d";
        }    
    }
    
    if(targetC < currC) {
        for(let i = 0; i < distC; i++) {
            answer += "l";
        }    
    }
    
    if(currC < targetC) {
        for(let i = 0; i < distC; i++) {
            answer += "r";
        }    
    }
    
    if(targetR < currR) {
        for(let i = 0; i < distR; i++) {
            answer += "u";
        }    
    }
    
    return answer;
}
