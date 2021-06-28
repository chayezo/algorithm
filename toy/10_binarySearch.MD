# 이진 탐색 (Binary Search)
주어진 배열에서 특정한 요소 target을 찾아내는 상황을 가정해보자.<br>
바로 떠올릴 수 있는 방법은 배열의 요소 하나하나와 target 값이 같은 지를 순차적으로 모두 비교하는 것이다.(반복문)<br>
배열의 크기가 n이라고 했을 때, 이 알고리즘의 시간복잡도를 Big-Oh로 표현하면 O(n)이 된다.<br>
<br>
이것보다 빠른 방법을 생각해보자.<br>
우리가 *찾아봐야 할 요소들의 갯수를 절반으로 줄여가면서 탐색* 을 하는 좋은 방법이 있다 !<br>
이것이 **이진 탐색 알고리즘**이다.<br><br>
<img src=https://media.vlpt.us/images/crystalhwang16/post/5883c5ad-4bad-4a49-87bf-ca7d6e118da6/1_Jpuusq4TI4KTpeZdXsyxzQ.png>

<br>
크기가 n인 배열 arr에서 target이라는 특정 요소를 찾아낸다고 가정해보자.<br>

- 이진 탐색의 절차
    1. low = 0, high = n-1로 초기화
    2. middle = (low + high) / 2;
    3. arr[middle]과 target이 같으면 리턴 -> 탐색 종료.
    4. 만약 target < arr[middle]이면, high = middle-1로 업데이트 해주고 2번으로 돌아간다.
    5. 만약 target > arr[middle]이면, low = middle+1로 업데이트 해주고 2번으로 돌아간다.
<br><br>
- low, high, middle의 값은 요소가 갖는 값이 아닌 인덱스다.<br>
- target과 arr[middle]의 대소관계에 따라 다음 탐색 방향을 왼쪽/오른쪽 결정하기 때문에, **반드시 배열은 오름차순으로 정렬**되어 있어야 한다.
<br>
<br><br>

*반복문을 이용한 방법*
```js
const binarySearch = function (arr, target) {
    let low = 0;
    let high = arr.length -1;

    while (low <= high) {
        let middle = Math.floor((low + high) / 2);

        if (arr[middle] === target) {
            return middle;
        } else if (arr[middle] < target) {
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }
    return -1;
};
```

**재귀함수를 이용한 방법**
```js
const binarySearch = function (arr, target, low=0, high = arr.length - 1) {
    if (low > high) return -1;

    let middle = Math.floor((low + high) / 2);
    if (arr[middle] === target) return middle;
        
    else if (arr[middle] < target) {
        return binarySearch(arr, target, middle + 1, high);
    } else {
        return binarySearch(arr, target, low, middle - 1);
    }
};
```
---
이진 탐색의 시간 복잡도는 O(log n)이다.