class Node {
    constructor(x, num) {
        this.x = x;
        this.num = num;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.preOrder = [];
        this.postOrder = [];
    }
    
    insert(node) {
        if(this.root === null) {
            this.root = node;
            return;
        }
        
        let current = this.root;
        
        while(true) {
            if(node.x < current.x) {
                if(current.left === null) {
                    current.left = node;
                    return;
                }
                
                current = current.left;
            } else {
                if(current.right === null) {
                    current.right = node;
                    return;
                }
                
                current = current.right;
            }
        }
    }
    
    findPreOrder(node) {
        if(node === null) {
            return;
        }
        
        this.preOrder.push(node.num);
        this.findPreOrder(node.left);
        this.findPreOrder(node.right);
    }
    
    findPostOrder(node) {
        if(node === null) {
            return;
        }
        
        this.findPostOrder(node.left);
        this.findPostOrder(node.right);
        this.postOrder.push(node.num);
    }
}

function solution(nodeinfo) {
    nodeinfo = nodeinfo.map((node, idx) => [node[0], node[1], idx + 1]);
    nodeinfo.sort((a, b) => b[1] - a[1] || a[0] - b[0]);
    
    const nodes = nodeinfo.map(node => new Node(node[0], node[2]));
    const tree = new BinaryTree();
    
    nodes.forEach(node => tree.insert(node));
    
    tree.findPreOrder(tree.root);
    tree.findPostOrder(tree.root);
    
    return [tree.preOrder, tree.postOrder];
}
