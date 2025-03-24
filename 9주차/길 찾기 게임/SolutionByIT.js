function solution(nodeinfo) {
    const nodes = nodeinfo.map((node, idx) => ({ x: node[0], y: node[1], idx: idx + 1 }));

    nodes.sort((a, b) => b.y - a.y || a.x - b.x);

    function insert(root, node) {
        if (!root) return node;
        
        if (node.x < root.x) {
            root.left = insert(root.left, node);
        } else {
            root.right = insert(root.right, node);
        }
        
        return root;
    }

    // 전위 순회
    function preorder(root, result) {
        if (!root) return;
        result.push(root.idx);
        preorder(root.left, result);
        preorder(root.right, result);
    }

    // 후위 순회
    function postorder(root, result) {
        if (!root) return;
        postorder(root.left, result);
        postorder(root.right, result); 
        result.push(root.idx);
    }

    const root = { x: nodes[0].x, y: nodes[0].y, idx: nodes[0].idx, left: null, right: null };
    
    for (let i = 1; i < nodes.length; i++) {
        const newNode = { x: nodes[i].x, y: nodes[i].y, idx: nodes[i].idx, left: null, right: null };
        insert(root, newNode);
    }

    const preorderResult = [], postorderResult = [];
    
    preorder(root, preorderResult);
    postorder(root, postorderResult);

    return [preorderResult, postorderResult];
}
