function solution(order) {
    let result = 0;
    
    const support = [];

    let current = 1; // 벨트에서 나오는 번호
    let orderHead = 0 // shift를 사용하지 않고 인덱스로 처리
    
    while(orderHead < order.length) {
        const orderNum = order[orderHead]; // 현재 순서
        const supportPeek = support[support.length - 1]; // 보조벨트에서 나오는 번호
        
        // 벨트 위의 물건이 순서와 맞으면
        if(orderNum === current) {
            current++;
            orderHead++;
            result++;
            
        // 보조 벨트 위의 물건이 순서와 맞으면
        } else if(orderNum === supportPeek) {
            orderHead++;
            support.pop();
            result++;
            
        // 벨트 위에 물건이 남아있고, 둘 다 안맞으면 보조벨트로 보내기
        } else if(current <= order.length) {
            support.push(current++);
            
        } else {
            break;
        }
    }
    
    return result;
}
