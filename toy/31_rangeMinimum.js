const rangeMinimum = function (arr, ranges) {
    // 구간 트리를 만드는 모듈
    // 구간 트리가 완성된다면, 가장 최상위 노드에는 arr 범위 내의 최솟값이 위치하게 된다.
    const createMinTree = (arr, startIdx, endIdx) => {
        // 탈출 조건
        if (startIdx === endIdx) {
            return {
                value: arr[startIdx]
            }
        }

        let mid = parseInt((startIdx + endIdx) / 2);
        let left = createMinTree(arr, startIdx, mid);
        let right = createMinTree(arr, mid + 1, endIdx);

        return {
            // 구간 내에서 최솟값을 리턴해야하기 때문에
            value: Math.min(left.value, right.value),
            left,
            right
        }
    }
    const tree = createMinTree(arr, 0, arr.length - 1);

    // range 범위에서 최솟값을 찾아내는 모듈
    // ts: tree의 시작 인덱스(arr[0]) , te: tree의 끝 인덱스(arr[arr.length-1])
    // rs: 각 range의 시작 인덱스 , re: 각 range의 끝 인덱스
    const findMin = (ts, te, rs, re, tree) => {
        // range 범위 내에 tree의 범위가 포함될 경우, tree 범위에서의 최솟값을 리턴하면 된다.
        // range 안에 tree 범위가 있는 경우
        if (rs <= ts && te <= re) {
            return tree.value;
        }
        // range가 tree의 범위를 벗어날 경우, 가장 큰 값을 리턴해서 아래에서 진행되는 Math.min에 해당되지 않도록 만든다.
        if (rs > te || ts > re) {
            return Number.MAX_SAFE_INTEGER;
        }
        // tree안에 range 범위가 있는 경우
        let mid = parseInt((ts + te) / 2);
        return Math.min(findMin(ts, mid, rs, re, tree.left), findMin(mid + 1, te, rs, re, tree.right));
    }
    const result = [];
    for (let range of ranges) {
        const [rs, re] = range;
        result.push(findMin(0, arr.length - 1, rs, re, tree));
    }
    return result;
};
