function solution(nodeinfo) {
    // index 저장
    nodeinfo = nodeinfo.map((node, idx) => [node[0], node[1], idx + 1]);
    // 위에서 아래로, 좌에서 우로 정렬
    nodeinfo.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
    
    const childs = Array.from({length: nodeinfo.length + 1}, () => Array(2).fill(null));
    const parents = Array(nodeinfo.length + 1).fill(null);
    
    const visitedChild = Array.from(nodeinfo.length + 1).fill(false);
    
    for(let i = 0; i < nodeinfo.length - 1; i++) {
        const [parentX, parentY, parentNum] = nodeinfo[i];
        let childCount = 0;
        let childLevel = -1;
        let isLeftEmpty = false;
        
        for(let j = i; j < nodeinfo.length; j++) {
            const [childX, childY, childNum] = nodeinfo[j];
            
            // 부모 y값보다 작아야 함, 이진 트리라 자식 노드는 두개까지, 이미 확인한 자식은 패스, 오른쪽만 있으면 패스, 자식 레벨을 찾았으면 더 작아지면 안됨
            if(parentY === childY || childCount >= 2 || visitedChild[childNum] || isLeftEmpty || (childLevel !== -1 && childLevel > childY)) {
                continue;
            }
            
            childLevel = childY;
            
            if(parentX > childX) {
                childs[parentNum][0] = childNum;
                parents[childNum] = parentNum;
                visitedChild[childNum] = true;
            } else if(parentX < childX) {
                childs[parentNum][1] = childNum;
                parents[childNum] = parentNum;
                visitedChild[childNum] = true;
                
                // 자식이 없는데 오른쪽 먼저 찾으면 왼쪽은 없는 거임
                if(childCount === 0) {
                    isLeftEmpty = true;
                }
            }
            
            childCount++;
        }
    }
    
    return childs.slice(1);
}
