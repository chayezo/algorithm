// 제출한 내 코드
const binarySearch = function (arr, target, low = 0, high = arr.length - 1) {
    // TODO : 오름차순 정렬된 정수의 배열(arr)과 정수(target)를 입력받아 target의 인덱스를 리턴
    if (low > high) return -1;
    while (low <= high) {
        let middle = Math.floor((low + high) / 2);

        if (arr[middle] === target) {
            return middle;
        }

        if (arr[middle] < target) {
            // 같아질때 리턴해야 하니까, 타겟이 더 클 경우는 -> low가 middle보다 큰 값.
            return binarySearch(arr, target, middle + 1, high);
        } else {
            // 타겟이 더 작을 경우 -> high가 middle보다 작은 값.
            return binarySearch(arr, target, low, middle - 1);
        }
    }
};

// 내 코드 2번
const binarySearch = function (arr, target) {
    let firstPointer = 0;
    let lastPointer = arr.length - 1;

    while (firstPointer <= lastPointer) {
        let middle = Math.floor((firstPointer + lastPointer) / 2);

        if (arr[middle] === target) {
            return middle;
        }

        if (arr[middle] < target) {
            // 같아질때 리턴해야 하니까, 타겟이 더 클 경우는 -> firstPointer가 middle보다 큰 값.
            firstPointer = middle + 1;
        } else {
            // 타겟이 더 작을 경우 -> firstPointer가 middle보다 작은 값.
            lastPointer = middle - 1;
        }
    }
    return -1;
};

// reference code
const binarySearch = function (arr, target) {
    let left = 0,
        right = arr.length - 1;
    while (left <= right) {
        let middle = parseInt((right + left) / 2);
        if (arr[middle] === target) {
            return middle;
        }
        if (target < arr[middle]) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    return -1;
};