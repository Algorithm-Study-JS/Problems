class Node {
  constructor(val, x) {
    this.val = val;
    this.x = x;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
    this.preSeq = []; // 전위 순회
    this.postSeq = []; // 후위 순회
  }

  insert(node) {
    if (!this.root) {
      this.root = node;
      return;
    }
    let current = this.root;
    // x좌표와 left, right 값으로 노드 삽입
    while (true) {
      if (node.x < current.x) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      }
    }
  }

  preOrder(node) {
    if (node) {
      this.preSeq.push(node.val);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  postOrder(node) {
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      this.postSeq.push(node.val);
    }
  }
}

function solution(nodeinfo) {
  let nodes = nodeinfo.map((info, index) => ({
    val: index + 1,
    x: info[0],
    y: info[1],
  })); // 객체 배열 생성 및 y값 기준 정렬
  nodes.sort((a, b) => b.y - a.y || a.x - b.x);

  let tree = new Tree();
  nodes.forEach(({ val, x }) => tree.insert(new Node(val, x)));

  tree.preOrder(tree.root);
  tree.postOrder(tree.root);

  return [tree.preSeq, tree.postSeq];
}
