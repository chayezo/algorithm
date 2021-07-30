// 최소 힙 구현
function swap(idx1, idx2, arr) {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

// heap내에서 parentIdx를 구하는 모듈
function getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
}

// heap 삽입 구현
function insert(heap, item) {
    heap.push(item);
    if (heap.length > 1) {
        let curIdx = heap.length - 1;
        let parentIdx = getParentIdx(curIdx);
        while (parentIdx >= 0 && heap[curIdx] < heap[parentIdx]) {  // 최대 힙과 부등호만 반대
            swap(curIdx, parentIdx, heap);
            curIdx = parentIdx;
            parentIdx = getParentIdx(curIdx);
        }
    }
    return heap;
}

// heap 삭제 구현
// 항상 rootNode(최솟값)가 삭제되며 제일 끝 인덱스가 rootNode 자리에 오르게 되고,
// 자식 노드들과 반복 비교를 진행해서, 최종적으로 삭제되었던 rootNode의 다음 최솟값이 rootNode 자리에 오른다
function removeRoot(heap) {
    // 배열의 첫번째(최소값)과 배열의 마지막 값을 바꾼다.
    swap(0, heap.length - 1, heap);
    // 배열의 최소값 제거
    heap.pop();

    if (heap.length === 0) return [];

    // 다시 최소힙을 유지
    let curIdx;
    let minIdx = 0;
    while (curIdx !== minIdx) {
        curIdx = minIdx;
        let leftChild = curIdx * 2 + 1;
        let rightChild = curIdx * 2 + 2;
        if (leftChild < heap.length && heap[leftChild] < heap[minIdx]) {
            minIdx = leftChild;
        }

        if (rightChild < heap.length && heap[rightChild] < heap[minIdx]) {
            minIdx = rightChild;
        }

        swap(curIdx, minIdx, heap);
    }

    return heap;
}

// 아래 코드는 수정하지 마세요.
const binaryHeap = function (arr) {
    return arr.reduce((heap, item) => {
        return insert(heap, item);
    }, []);
};

// heapSort 구현
// removeRoot(heap)을 진행하면 항상 rootNode에는 최솟값이 존재하기 때문에 heap이 빈 배열이 될 때까지 heap[0]을 result 배열에 넣어준다.
const heapSort = function (arr) {
    let minHeap = binaryHeap(arr);
    // TODO: 여기에 코드를 작성합니다.
    const result = [];
    while (minHeap.length > 0) {
        result.push(minHeap[0]);
        minHeap = removeRoot(minHeap);
    }
    return result;
};