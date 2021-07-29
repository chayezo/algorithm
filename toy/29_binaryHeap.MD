# Heap(힙)

트리 기반 자료구조.<br>
`힙 속성`(최대힙 *Max Heap*일 경우 부모 노드는 반드시 자식 노드보다 값이 커야 한다는 규칙)을 만족하는 거의 완전한 트리.<br>
최상위 노드는 최대값을 가지게 된다.<br>

이런 특성으로 힙은 우선순위 `큐`를 구현하는데 적합한 자료구조다.

# BinaryHeap(이진 힙)

`힙` 중에서 가장 널리 쓰이는 형태 중 하나로 **이진 트리 형태의 힙**.<br>
`이진 트리`는 각 노드의 자식 노드가 반드시 2개 이하인 트리이다.<br>

`이진 힙`은 완전 이진 트리라는 조건을 만족해야 한다.<br>
모든 레벨의 노드가 채워져 있어야 하며, 마지막 레벨은 왼쪽부터 채워져 있어야 한다.

## 삽입: 요소를 추가할 때

<img src="https://drive.google.com/uc?export=view&id=1XJMBseRIBjEEB5nfQRtfCe710rB7m2kk">

새로운 요소가 추가되면 우선 트리의 가장 마지막 노드에 넣어준다.<br>
그 후 부모 노드와 비교해서 작으면 부모와 위치를 교환하고, 반복해준다.<br>
노드의 자식은 2개까지 가질 수 있다.<br>
따라서 n번째 노드의 부모는 **`Math.floor((n-1) / 2)`** 와 동일하다.<br>

예를 들어, 배열 인덱스가 0부터 시작하고 값이 [0, 1, 2]일 때 최상위 노드는 0이고, 자식으로 1과 2를 갖는다.<br>
**0 = f(1) = f(2)** 를 만족시켜야 하므로 **f(n) = Math.floor((n-1) / 2)** 이다.
<br>
<br>

1. 원소를 힙의 가장 마지막 노드에 추가.<br>
   <img src="https://kayuse88.github.io/assets/img/posts/binary-heap/Heap_delete_step1.svg">

2. 추가한 요소를 부모와 비교. 순서가 힙 조건과 일치한다면 중지.<br>
   <img src="https://kayuse88.github.io/assets/img/posts/binary-heap/Heap_add_step2.svg">

3. 힙 조건과 순서가 맞지 않다면 부모와 위치를 교환. 힙 조건과 일치할 때까지 반복.
   <img src="https://kayuse88.github.io/assets/img/posts/binary-heap/Heap_add_step3.svg">

```js
function swap(idx1, idx2, arr) {
	// 두 값을 교환: 두 요소의 인덱스를 바꾼다.
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

function getParentIdx(idx) {
	// 배열은 0부터 시작
	// 부모 노드의 인덱스를 알아내는 모듈
	return Math.floor((n - 1) / 2);
}

function insert(heap, item) {
	// 1. 일단 넣고 부모 index를 계산해준다.
	let idx = heap.length;
	let parentIdx = getParentIdx(idx);
	heap.push(item);

	// 2. 부모와 비교해서 작으면 부모와 교환 : 반복
	while (item < heap[parentIdx]) {
		swap(idx, parentIdx, heap);
		idx = parentIdx;
		parentIdx = getParentIdx(idx);
	}
	return heap;
}
```

## 삭제: 요소를 제거할 때

<img src="https://drive.google.com/uc?export=view&id=11zG7ZjLNSns6L5w7cxrkk4k7Pl60XNTu">

루트 노드를 제거한 경우 우선 가장 마지막 노드의 값이 루트노드의 값으로 변경된다.<br>
그 후 자식 중 더 작은 값과 계속 비교해서 해당 값이 더 크다면 자식 요소와 교환하고 이를 반복한다.<br>
자식 노드는 부모 노드와 반대로 `n*2 + 1` 로 구한다. <br>
두 자식 노드 중 더 작은 노드와 값을 비교하고 반복한다.

<br>
<br>

1. 힙의 루트 노드를 삭제한다.<br>
   <img src="https://kayuse88.github.io/assets/img/posts/binary-heap/Heap_delete_step1.svg">

2. 마지막 노드를 루트로 이동한다. 루트를 자식 노드와 비교.<br> 이 때, 두 자식 노드 중 최대 힙인 경우 더 큰 자식과 비교하며, 최소 힙인 경우 더 작은 자식과 비교한다.<br> 순서가 힙 조건과 일치한다면 중지.<br>
   <img src="https://kayuse88.github.io/assets/img/posts/binary-heap/Heap_delete_step2.svg">

3. 만약 순서가 맞지 않는다면 위치를 교환한다. 힙 조건이 일치할 때까지 반복.
   <img src="https://kayuse88.github.io/assets/img/posts/binary-heap/Heap_delete_step3.svg">

```js
function getLeftChildIdx(idx) {
	return idx * 2 + 1;
}

function removeRoot(heap) {
	// 배열의 첫번째(최소값)과 배열의 마지막 값을 바꾼다.
	// : 가장 끝에 있는 요소가 루트로 간다.
	swap(0, heap.length - 1, heap);
	// 배열의 최소값 제거
	heap.pop();

	if (heap.length === 0) return [];

	let idx = 0;
	let leftIdx = getLeftChildIdx(idx);
	let rightIdx = leftIdx + 1;

	// 2. 자식 둘 중에 더 작은 값이랑 계속 비교해나간다.
	while (heap[idx] > heap[leftIdx] || heap[idx] > heap[rightIdx]) {
		let childIdx = heap[leftIdx] > heap[rightIdx] ? rightIdx : leftIdx;
		swap(idx, childIdx, heap);
		idx = childIdx;
		leftIdx = getLeftChildIdx(idx);
		rightIdx = leftIdx + 1;
	}
	return heap;
}
```
