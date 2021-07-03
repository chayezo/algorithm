# rotatedArraySearch

이분 탐색을 활용하자 !<br>
배열 [<span style="color:yellowgreen">3 4 5</span> **6** <span style="color:skyblue">8 0 2</span>] [<span style="color:yellowgreen">5 1</span> **2** <span style="color:skyblue">7 8</span>]로 예를 들어 생각해보자.<br>
**중간 인덱스**를 기준으로 <span style="color:yellowgreen">**왼쪽**</span>과 <span style="color:skyblue">**오른쪽**</span>으로 나누고, _오름차순인지 내림차순인지_ 구한다.<br>

| 왼쪽     | 오른쪽   | 배열                                | target위치(<mid) | target 위치(>mid) |
| -------- | -------- | ----------------------------------- | ---------------- | ----------------- |
| 오름차순 | 오름차순 | 오름차순                            | 왼쪽             | 오른쪽            |
| 오름차순 | 내림차순 | 제일 작은 수가 오른쪽에 위치        | 오른쪽, 왼쪽     | 오른쪽            |
| 내림차순 | 오름차순 | 제일 작은 수가 중간이나 왼쪽에 위치 | 왼쪽             | 왼쪽, 오른쪽      |
| 내림차순 | 내림차순 | 내림차순                            | 오른쪽           | 왼쪽              |

1. **왼쪽과 오른쪽 모두 오름차순**이면 모든 배열이 오름차순이다.
2. **왼쪽과 오른쪽 모두 내림차순**이면 모든 배열이 내림차순이다.<Br>
   (근데 문제에서 오름차순 배열이 주어지기 때문에 이 경우는 나오지 않음.)

<br>
이제 여기서 문제는 두 정렬이 다른 경우이다.<br>

3. **왼쪽이 오름차순, 오른쪽이 내림차순**인 경우는
   [<span style="color:yellowgreen">3 4 5</span> **6** <span style="color:skyblue">8 0 2</span>] 배열이 여기에 해당한다.<br>
   이 배열은 제일 작은수(0)이 중간보다 오른쪽에 위치한다. (= 오름차순 배열의 끝이 오른쪽 배열에 위치한다.)<br>
   만약 중간(mid)값 7보다 큰 8을 찾는다고 하면 오른쪽 배열에서만 찾으면 된다.<br>
   배열의 끝이 오른쪽 배열에 있기 때문이다.<br>
   7보다 작은 수를 찾는다고 하면 왼쪽, 오른쪽 배열을 모두 탐색해야 한다.<br>
   예를 들어, 2를 찾는다고 하면 오른쪽 배열을 탐색해야 하고 5를 찾는다고 하면 왼쪽 배열을 탐색해야 한다.
   <br>

4. 이제 **왼쪽이 내림차순, 오른쪽이 오름차순**인 경우를 보자.<br>
   3번 경우와 비슷하지만 반대이다. 예제 배열 중 [<span style="color:yellowgreen">5 1</span> **2** <span style="color:skyblue">7 8</span>]이 이에 해당한다.<br>
   이 배열은 제일 작은 수(1)가 중간보다 왼쪽에 위치한다. (= 오름차순 배열의 끝이 왼쪽 배열에 위치한다.)<br>
   만약 중간 값 2보다 작은 수 1을 찾는다고 하면 이는 왼쪽 배열만 탐색하면 된다.<br>
   2보다 큰 값을 찾는다고 하면 7을 찾는 경우는 오른쪽, 5를 찾는 경우 왼쪽 배열을 탐색해야 하기 때문에 양쪽 모두 탐색해야 한다.

이제 **이분 탐색**으로 정답이 있을 수 있는 범위를 [0, 배열 크기]로 설정한 뒤 위의 규칙으로 범위를 줄여나간다.<br>
만약 탐색 중 배열의 중간값이 target과 같다면 중간 인덱스를 반환한다.<br>
배열의 크기가 0이 된다면 target이 없다는 뜻이므로 -1을 반환한다.<br>

<br>

**시간 복잡도 O(n)인 풀이**

```js
const rotatedArraySearch = (rotated, target) => {
	for (let i = 0; i < rotated.length; i++) {
		if (rotated[i] === target) {
			return i;
		}
	}
	return -1;
};
```

<br>

**시간복잡도가 O(log n)인 풀이**

```js
const rotatedArraySearch = function (rotated, target) {
	// TODO : 부분적으로 오름차순 정렬된 정수의 배열(rotated)과
	//        정수(target)를 입력받아 target의 인덱스를 리턴
	let left = 0;
	let right = rotated.length - 1;
	let middle;
	while (left <= right) {
		middle = Math.floor((left + right) / 2);

		if (target === rotated[middle]) {
			return middle;
		}
		// middle이 rigth보다 작다 ?? 오른쪽이 정렬된 상태.(middle~right)
		if (rotated[middle] <= rotated[right]) {
			if (target < rotated[middle] || target > rotated[right]) {
				// target이 middle 보다 작거나 rigth보다 크다 ?
				// target이 middle 왼쪽에 있다는 것(이미 오른쪽은 정렬된 상태니까)
				right = middle - 1;
			}
			// middle보다 크거나 right보다 작은 경우
			else {
				left = middle + 1;
			}
		}
		// middle이 left보다 크다 ?? 왼쪽이 정렬된 상태.(left~middle)
		else if (rotated[middle] >= rotated[left]) {
			if (target > rotated[middle] || target < rotated[left]) {
				// target이 middle 보다 크거나 rigth보다 작다 ?
				// target이 middle 오른쪽에 있다는 것(이미 왼쪽은 정렬된 상태니까)
				left = middle + 1;
			}
			// middle보다 작거나 left보다 큰 경우 (left~middle 사이)
			// -> right가 left~middle로 가야함.
			else {
				right = middle - 1;
			}
		}
	}
	return -1;
};
```
