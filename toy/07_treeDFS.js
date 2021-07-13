// ! 문제:
/*
임의의 tree를 구성하는 노드 중 하나의 Node 객체를 입력받아, 
해당 노드를 시작으로 깊이 우선 탐색(DFS, Depth First Search)을 합니다.
이 때, 탐색되는 순서대로 노드의 값이 저장된 배열을 리턴해야 합니다.
*/

// ! 주의사항:
/*
생성자 함수(Node)와 메소드(addChild)는 변경하지 않아야 합니다.
*/

// ! 입출력 예시:
/*
let root = new Node(1);
let rootChild1 = root.addChild(new Node(2));
let rootChild2 = root.addChild(new Node(3));
let leaf1 = rootChild1.addChild(new Node(4));
let leaf2 = rootChild1.addChild(new Node(5));
let output = dfs(root);
console.log(output); // --> [1, 2, 4, 5, 3]
leaf1.addChild(new Node(6));
rootChild2.addChild(new Node(7));
output = dfs(root);
console.log(output); // --> [1, 2, 4, 6, 5, 3, 7]
*/
// TODO : 1. node 객체 하나를 입력 받아 해당 노드부터 dfs 탐색 시작
// TODO : 2. 탐색되는 순서대로 노드 값이 저장된 배열을 리턴.
// TODO : 3. 반복문 안에서 재귀 -> 하나씩 배열에 붙여준다. concat?push?
let dfs = function (node) {
    let newArr = [node.value];
    node.children.forEach((node) => {
        newArr = newArr.concat(dfs(node));
    })
    return newArr;
};

// 이 아래 코드는 변경하지 않아도 됩니다. 자유롭게 참고하세요.
let Node = function (value) {
    this.value = value;
    this.children = [];
};

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리입니다.
// membership check(중복 확인)를 따로 하지 않습니다.
Node.prototype.addChild = function (child) {
    this.children.push(child);
    return child;
};

/*
 * reference code.
 */

let dfs = function (node) {
    let outputs = [node.value];
    for (let child of node.children) {
        outputs = outputs.concat(dfs(child));
    }
    return outputs;
};


// 이 아래 코드는 변경하지 않아도 됩니다. 자유롭게 참고하세요.
let Node = function (value) {
    this.value = value;
    this.children = [];
};

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리입니다.
// membership check(중복 확인)를 따로 하지 않습니다.
Node.prototype.addChild = function (child) {
    this.children.push(child);
    return child;
};

