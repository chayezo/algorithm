# Bubble Sort 버블정렬

<img src="https://i1.faceprep.in/fp/articles/img/71784_1580551129.png">

<img src="https://prepinsta.com/wp-content/uploads/2020/06/Bubble-Sort-In-C-Final.webp">
<br>
<br>

**가장 큰 값이 버블처럼 위로 올라가는 모양을 하게 되는 알고리즘**<br>
버블 정렬은 O(n^2)이기 때문에 성능이 좋지 않다.<br>
정렬 과정이 엄청 길다. 한 과정에 겨우 두 수의 위치를 서로 바꾸는 작업밖에 못한다.<br> 성능이 좋을 리가 없지.... 하지만 간단한 작업을 하는 만큼, 코드를 짜기는 쉽다.

```text
1. i라는 변수를 통해 배열의 마지막 지점에서 시작 지점까지 순회하는 반복문을 만든다.
2. j라는 변수를 통해 시작점부터 i-1까지 순회하는 이중 반복문을 만든다.
3. 배열의 j번째 요소가 j+1번째 요소보다 크면, 두 개의 위치를 바꾼다.(swap)
4. 만약 inner Loop에서 swap이 발생하지 않는다면 ? -> 모두 정렬된 것. 반복문 종료.
5. 정렬된 요소를 return.
```

```js
function bubbleSort(arr) {
	let noSwaps;
	for (let i = arr.length; i > 0; i--) {
		noSwaps = true;
		for (let j = 0; j < i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				let temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
				noSwaps = false;
			}
		}
		if (noSwaps) break;
	}
	return arr;
}
```
