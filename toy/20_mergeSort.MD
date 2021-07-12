# 병합 정렬 Merge Sort

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FI4Eea%2FbtqwWoPUJTM%2F7PgoOu3VrplmeIhcR0vnNK%2Fimg.png">
<br>
<br>

병합 정렬 또는 합병 정렬이라고 불리는 `Merge Sort`는 **하나의 큰 문제를 두 개의 작은 문제로 분할한 뒤에 각자 계산하고 나중에 합치는** 방법이다.<br>
병합 정렬은 위의 그림처럼 데이터를 절반씩 쪼개는 divide 작업을 먼저 하는데, 데이터가 하나만 남을 때까지 반복한다.<br>
그 후에 하나씩 쪼개진 데이터를 정렬하고 합쳐준다(그룹화).<br>

**일단 정확히 반으로 나누고 나중에 정렬하는 것이 point !**<br>
_아래 gif를 보면 이해하기 쉽다._<br>

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbWGfE2%2FbtqwVhqEDlG%2FeSEDziKucecgQMqMGT0HYk%2Fimg.gif">

<br>
<br>

결과적으로 **퀵 정렬**과 동일하게 `O(N*log N)`의 시간 복잡도를 가진다.<br>
다만, `퀵 정렬`은 피벗 값에 따라서 편향되게 분할할 가능성이 있다는 점에서 최악의 경우 `O(N^2)`의 시간 복잡도를 가진다.<br>
<u>`병합 정렬`은 정확히 절반을 나눈다는 점에서 최악의 경우에도 `O(N*log N)`을 보장한다.</u><br>
_병합 정렬은 퀵 정렬과 다르게 피벗 값이 없고 항상 반으로 나눈다는 특징이 있다.<br>
이 특징이 단계의 크기가 log N이 되도록 만들어준다._

## Divide and Conquer

**분할하여 정복한다**<br>
`분할 정복 전략`은 알고리즘 문제를 해결하는 유명한 전략 중 하나이다.<br>
<u>병합 정렬도 대표적인 `분할 정복` 방법을 채택한 알고리즘이다.</u>

1. 가장 간단한 경우로 기본 단계를 찾는다.
2. 주어진 문제를 가능한 작게 줄여서 기본 단계가 되도록 만드는 방법을 찾는다.

## 병합 정렬의 특징

- 안정적.
- `O(N*log N)`로 정렬 시간이 일정.
- 배열의 크기가 크면 시간이 오래 걸린다.
- 기존의 데이터를 담을 추가적인 배열 공간이 필요하다.(**temp[]**)
  - 메모리 활용이 비효율적이다.
- 크기가 클 경우, 퀵 정렬보다 효율적이다.
- 일반적인 경우 퀵 정렬보다 느리지만, 어떤 상황에서 정확히 `O(N*log N)`을 보장할 수 있다는 점에서 매우 효율적인 알고리즘이다.
  <br>

```js
const mergeSort = function (arr) {
	if (arr.length < 2) return arr;
	let pivot = Math.floor(arr.length / 2); // 쪼개기
	let left = mergeSort(arr.slice(0, pivot));
	let right = mergeSort(arr.slice(pivot));
	return merge(left, right); // 병합한 배열 리턴
};

const merge = (left, right) => {
	let temp = [];
	// __.length가 true인 경우 === 배열 안에 값이 남아있다.
	while (left.length && right.length) {
		if (left[0] <= right[0]) {
			temp.push(left.shift());
		} else {
			temp.push(right.shift());
		}
	}
	while (left.length) temp.push(left.shift());
	while (right.length) temp.push(right.shift());
	return temp;
};
```
