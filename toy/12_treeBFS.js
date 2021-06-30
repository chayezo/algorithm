// 제출한 코드
let bfs = function (node) {
    // TODO: 노드의 탐색을 treeBFS 탐색 순으로 배열에 담아내자
    // DFS : stack, BFS : queue
    let result = [];
    let queue = [node]; // 조회할 노드를 순차적으로 넣는다.

    // 조회할 노드가 없을때까지
    while (queue.length) {
        let target = queue.shift();
        result.push(target.value);
        // 자식 노드들을 순차적으로 queue에 쌓아준다.
        for (let i in target.children) {
            queue.push(target.children[i])
        }

    }
    return result;
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

// reference  code
let bfs = function (node) {
    // TODO: 여기에 코드를 작성합니다.
    let queue = [node];
    const values = [];
    while (queue.length > 0) {
        const head = queue[0];
        queue = queue.slice(1);

        values.push(head.value);

        head.children.forEach((child) => queue.push(child));
    }
    return values;
};

// 스터디 코드
let bfs = function (node) {
    const results = [];
    const queue = [node];

    while (queue.length) {
        const root = queue.shift();

        results.push(root.value);

        for (let node of root.children) {
            queue.push(node);
        }
    }

    return results;
};
