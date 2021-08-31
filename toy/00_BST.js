class BinarySearchTree {
  // BST의 constructor를 구현.
  // constructor로 만든 객체는 이진 탐색 트리의 Node가 된다.
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  // 이진 탐색 트리의 삽입하는 메서드를 만든다.
  // tree에 value를 추가한다.
  insert(value) {
    // 입력 값을 기준으로, 현재 노드의 값보다 크거나 작은 것에 대한 조건문이 있어야 한다.
    // 인자의 value가 this.value보다 작을 경우, 왼쪽 노드에서 진행한다.
    if (value < this.value) {
      // this.left에 아무것도 없을 경우, 새로운 자식 노드를 추가한다.
      if (this.left === null) {
        this.left = new BinarySearchTree(value);
      }
      // this.left의 자식 노드가 있을 경우, 자식 노드에서 insert 재귀를 사용한다.
      else {
        this.left.insert(value);
      }
    }
    // 인자의 value가 this.value보다 클 경우, 오른쪽 노드에서 진행한다.
    else if (value > this.value) {
      // this.right에 아무것도 없을 경우, 새로운 자식 노드를 추가한다.
      if (this.right === null) {
        this.right = new BinarySearchTree(value);
      }
      // this.left의 자식 노드가 있을 경우, 자식 노드에서 insert 재귀를 사용한다.
      else {
        this.right.insert(value);
      }
    }
    else {
      // do nothing => the tree already contains this value.
    }
  }

  // 이진 탐색 트리 안에 해당 값이 포함되어 있는지 확인하는 메서드를 만든다.
  // root -> left -> right 순으로 value 여부를 확인한다.(전위순회)
  // recursion을 사용해서 깊이 탐색한다. 
  // 시간복잡도 : O(log n)
  contains(value) {
    // 찾는 value값이 노드의 value와 일치한다면, true를 리턴한다.
    if (value === this.value) {
      return true;
    }
    // 입력값을 기준으로 현재 노드의 값보다 작은지 판별하는 조건문이 있어야 한다.
    // 찾는 value값이 노드의 value 보다 작다면, 왼쪽에서 contains의 재귀를 진행한다.
    if (value < this.value) {
      return !!(this.left && this.left.contains(value));
    }
    // 찾는 value값이 노드의 value 보다 크다면, 오른쪽에서 contains의 재귀를 진행한다.
    if (value > this.value) {
      return !!(this.right && this.right.contains(value));
    }
  }

  // 트리의 순회에 대해 구현해보자.
  // tree를 전위 순회 하는 메서드.
  preorder(callback) {
    callback(this.value);
    if (this.left) {
      this.left.preorder(callback);
    }
    if (this.right) {
      this.right.preorder(callback);
    }
  }

  // tree를 중위 순회 하는 메서드.
  inorder(callback) {
    if (this.left) {
      this.left.inorder(callback);
    }
    callback(this.value);
    if (this.right) {
      this.right.inorder(callback);
    }
  }

  // tree를 후위 순회 하는 메서드.
  postorder(callback) {
    if (this.left) {
      this.left.postorder(callback);
    }
    if (this.right) {
      this.right.postorder(callback);
    }
    callback(this.value);
  }
}

// ***************************************************************

class BinarySearchTree {
  // BST의 constructor를 구현.
  // constructor로 만든 객체는 이진 탐색 트리의 Node가 된다.
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // tree에 value를 추가한다.
  insert(value) {
    value <= this.data ? this._toLeft(value) : this._toRight(value);
    // 입력 값을 기준으로, 현재 노드의 값보다 크거나 작은 것에 대한 조건이 있어야 한다.
    // 현재 값보다 작으면 왼쪽에, 크면 오른쪽에 넣는다.
  }
  _toLeft(value) {
    this.left ? this.left.insert(value) : this.left = new BinarySearchTree(value);
    // 빈 공간을 찾을 때까지 insert 호출, null이면 노드 생성해서 이어주기.
  }

  _toRight(value) {
    this.right ? this.right.insert(value) : this.right = new BinarySearchTree(value);
    // 빈 공간을 찾을 때까지 insert 호출, null이면 노드 생성해서 이어주기.
  }

  contains(value) {
    if (value === this.value) return this;
    return value <= this.value ? this._findLeft(value) : this._findRight(value);
    // 값을 비교해서 작으면 왼쪽, 크면 오른쪽에서 찾는다.
  }

  _findLeft(value) {
    return this.left ? this.left.contains(value) : null;
    // left가 있으면 탐색을 위해 왼쪽 아래로 다시 contains 재귀 호출, 없으면 return null
  }
  _findRight(value) {
    return this.right ? this.right.contains(value) : null;
    // right가 있으면 탐색을 위해 오른쪽 아래로 다시 contains 재귀 호출, 없으면 return null
  }
}

// min : 상한선, max : 하한선
// 트리의 root로 어떤 값이 들어올지 모르기 때문에 초기값으로 min = Infinity, max = -Infinity 설정해준다.
function vaildate(node, min = Infinity, max = -Infinity) {
  // node가 null일 때
  if (!node) return false;

  if (max < node.value && node.value <= min) {
    // 왼쪽도 validate call : min = 상한선을 node.value로
    if (node.left) return vaildate(node.left, node.value, max);
    // 오른쪽 validate call : max = 하한선을 node.value로
    if (node.right) return vaildate(node.right, min, node.value);
  }
  else {
    // 한 번이라도 false 만나면 콜스택 타고 올라가서 false를 return
    return false;
  }
  // 위에서 한 번도 false 안 걸리면, 최종적으로 true를 return
  return true;
}