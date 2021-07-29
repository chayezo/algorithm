/*
 * 제출한 코드.
 * 최대 힙(MaxHeap)
 */
// 아래 코드는 수정하지 마세요.
function swap(idx1, idx2, arr) {
    // 두 변수를 바꾸는 방법

    // 1) 임시 변수를 활용한 방법
    // let temp = arr[idx1];
    // arr[idx1] = arr[idx2];
    // arr[idx2] = temp;

    // 2) Destructuring assignment를 활용한 방법
    // arr이 reference type이라 가능
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];

    // 3) XOR 연산을 활용한 방법
    // arr이 reference type이라 가능
    // arr[idx1] ^= arr[idx2];
    // arr[idx2] ^= arr[idx1];
    // arr[idx1] ^= arr[idx2];
}
// 들어오는 idx의 부모 인덱스 구하기
function getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
}

// 왼쪽 자식(leftChild) 인덱스 구하기 = idx * 2 + 1
// 오른쪽 자식(rightChild) 인덱스 구하기 = idx * 2 + 2

function insert(heap, item) {
    // 새로운 노드가 들어오면 주어진 heap 배열의 마지막 인덱스로 들어오게 된다.
    heap.push(item);
    // 현재 위치
    let curIdx = heap.length - 1;
    // 부모 위치
    let parentIdx = getParentIdx(curIdx);
    // 부모의 값이 유효하고 부모의 값보다 자식의 값이 클 때
    while (parentIdx >= 0 && heap[curIdx] > heap[parentIdx]) {
        // 부모와 자식값을 바꾼다.
        swap(curIdx, parentIdx, heap);
        // 현재 위치를 부모의 위치로 바꾼다.
        curIdx = parentIdx;
        // 부모의 위치는 다시 자식의 위치의 부모의 위치가 된다.
        parentIdx = getParentIdx(curIdx);
    }
    return heap;
}

// 아래 코드는 수정하지 마세요.
const binaryHeap = function (arr) {
    return arr.reduce((heap, item) => {
        return insert(heap, item);
    }, []);
};


/*
 * reference code.
 */
function swap(idx1, idx2, arr) {
    // 두 변수를 바꾸는 방법

    // 1) 임시 변수를 활용한 방법
    // let temp = arr[idx1];
    // arr[idx1] = arr[idx2];
    // arr[idx2] = temp;

    // 2) Destructuring assignment를 활용한 방법
    // arr이 reference type이라 가능
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];

    // 3) XOR 연산을 활용한 방법
    // arr이 reference type이라 가능
    // arr[idx1] ^= arr[idx2];
    // arr[idx2] ^= arr[idx1];
    // arr[idx1] ^= arr[idx2];
}

function getParentIdx(idx) {
    // TODO: 여기에 코드를 작성합니다.
    return Math.floor((idx - 1) / 2);
}

function insert(heap, item) {
    // TODO: 여기에 코드를 작성합니다.
    heap.push(item);
    let curIdx = heap.length - 1;
    let pIdx = getParentIdx(curIdx);
    while (pIdx >= 0 && heap[curIdx] > heap[pIdx]) {
        swap(curIdx, pIdx, heap);
        curIdx = pIdx;
        pIdx = getParentIdx(curIdx);
    }
    return heap;
}

// 아래 코드는 수정하지 마세요.
const binaryHeap = function (arr) {
    return arr.reduce((heap, item) => {
        return insert(heap, item);
    }, []);
};