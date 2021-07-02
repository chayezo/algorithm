// 제출한 코드 -> advanced까지 통과
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
}

/*********************** 하단 코드 다시 수정해보기 ***********************/
//단순히 모든 배열 요소를 하나하나 일치비교하면 O(n)이다.
//근데 O(log n)으로 구현하라는 것은 => 반씩 버려가면서 답을 찾는 방법을 구해보라는 것.
//그래서 생각난게 이진탐색법
//1. rotated길이-1 < target 이면 null
//2. 아니면 이진탐색 start=0, end=rotated길이-1, mid = (start+end)/2
//3-1. rotated[mid]===target이면 return mid
//3-2. rotated[mid]<target이면 오른쪽 탐색 즉, start = mid+1
//3-3. rotated[mid]>target이면 왼쪽 탐색 즉, end = mid-1

const rotatedArraySearch = function (rotated, target) {
    // TODO : Your code here!
    let len = rotated.length;
    let start = 0;
    let end = len - 1;

    function binarySearch(start, end, target) {
        if (start > end) {
            return null
        } else if (start === end) {
            if (rotated[start] === target) {
                return start
            } else {
                null
            }
        } else {
            let mid = Math.floor((start + end) / 2)
            if (rotated[mid] === target) {
                return mid
            } else if (rotated[start] <= rotated[mid]) {
                //start~mid까진 정상 정렬
                if (rotated[start] <= target && target < rotated[mid]) {
                    //이때, target이 start, mid-1 범위 사이에 있으면 end = mid-1
                    binarySearch(start, mid - 1, target)
                } else {
                    //target이 start, mid-1 범위 사이에 없으면 start = mid+1
                    binarySearch(mid + 1, end, target)
                }
            } else {
                if (rotated[mid] < target && target <= rotated[end]) {
                    //이때, target이 mid+1, end 범위 사이에 있으면 start = mid+1
                    binarySearch(mid + 1, end, target)
                } else {
                    //target이 mid+1, end범위 사이에 없으면 end = mid-1
                    binarySearch(start, mid - 1, target)
                }
            }
        }
    }

    binarySearch(start, end, target)
}