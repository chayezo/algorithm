class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = new Node(value);

    // 루트가 설정되어 있지 않다면 루트를 node로 만들어 준다. 
    // node는 treeNode()에서 뼈대를 받아온다.
    if (!this.root) {
      this.root = node;
      return this;
    }
    else {
      // 비교를 위해 current 변수를 설정해 준다.
      let current = this.root;
      // current가 true 라면 while문을 돌면서 value와 지금 현재 value인 current value를 비교한다.
      while (true) {
        // 중복된 값은 어떤 결과를 리턴하지 않는다.
        if (value === current.value) return;
        // value가 기준 value(current value)보다 작다면 왼쪽에 넣어준다.
        if (value < current.value) {
          if (!current.left) {
            current.left = node;
            break;  // return this;
          }
          else {
            // 이제 current value(기준)는 왼쪽의 data로 잡힌다.
            current = current.left;
          }
        }
        // value가 기준 value(current value)보다 크다면 오른쪽에 넣어준다.
        else if (value > current.value) {
          if (!current.right) {
            current.right = node;
            break;  // return this;
          }
          else {
            // 이제 current value(기준)는 오른쪽 value로 잡힌다.
            current = current.right;
          }
        }
      }
    }
  }

  find(value) {
    if (!this.root) return;
    let current = this.root;
    let found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      }
      else if (value > current.value) {
        current = current.right;
      }
      else {
        found = true;
      }
    }
    if (!found) return;
    return current;
  }

  // Breadth-first Search(너비 우선 탐색)
  bfs() {
    let node = this.root;
    let queue = [node];
    let data = [];

    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return data;
  }

  // Depth-first Search(깊이 우선 탐색)
  // 1. Pre-Order traversal(전위 순회)
  preOrder() {
    let data = [];
    function traverse(node) {
      data.push(node.value);
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    }
    traverse(this.root);
    return data;
  }

  // 2. In-Order traversal(중위 순회)
  inOrder() {
    let data = [];
    function traverse(node) {
      if (node.left) {
        traverse(node.left);
        data.push(node.data);
      }
      if (node.right) {
        traverse(node.right);
      }
    }
    traverse(this.root)
    return data;
  }

  // 3. Post-Order traversal(후위 순회)
  postOrder() {
    let data = [];
    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
        data.push(node);
      }
    }
    traverse(this.root)
    return data;
  }
}

let nums = new bst();
nums.insert(10);
nums.insert(5);
nums.insert(11);
nums.insert(3);
nums.insert(6);

console.log(nums.bfs());       // 10, 5, 11, 3, 6
console.log(nums.preOrder());  // 10, 5, 3, 6, 11 
console.log(nums.inOrder());   // 3, 5, 6, 10, 11 
console.log(nums.postOrder()); // 3, 6, 5, 11, 10