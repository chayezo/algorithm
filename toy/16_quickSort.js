// 1번 코드. : 테스트 11개 통과 
const quickSort = function (arr, left = 0, right = arr.length - 1) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    const pivot = arr[mid];
    const partition = divide(arr, left, right, pivot);
    quickSort(arr, left, partition - 1);
    quickSort(arr, partition, right);

    function divide(arr, left, right, pivot) {
        while (left <= right) {
            while (arr[left] < pivot) {
                left++;
            }
            while (arr[right] > pivot) {
                right--;
            }
            if (left <= right) {
                let temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;
                left++;
                right--;
            }
        }
        return left;
    }
    return arr;

}


const quickSort = function (arr, callback = (num) => num, left = 0, right = arr.length - 1) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    const pivot = arr[mid];
    const partition = divide(arr, left, right, pivot);
    quickSort(arr, callback, left, partition - 1);
    quickSort(arr, callback, partition, right);

    const divide = (arr, left, right, pivot) => {
        while (left <= right) {
            while (callback(arr[left]) < callback(pivot)) {

                left++;
            }
            while (callback(arr[right]) > callback(pivot)) {

                right--;
            }
            if (left <= right) {
                let temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;
                left++;
                right--;
            }
        }
        return left;
    }
    return arr;

}
/*
 * 제출코드 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ advanced까지 통과..
 *  pivot을 기준으로 작은 수들은 왼쪽, 큰 수들은 오른쪽에 정렬
 *  콜백 함수에 기본 인자 전달
 *  인자 전달 순서
 *  재귀 함수에 인자에도 콜백 함수 전달
 */
const quickSort = function (arr, callback = (num) => num, left = 0, right = arr.length - 1) {
    if (left >= right) return;

    const divide = (arr, left, right, pivot) => {
        while (left <= right) {
            while (callback(arr[left]) < callback(pivot)) {
                left++;
            }
            while (callback(arr[right]) > callback(pivot)) {
                right--;
            }
            if (left <= right) {
                let temp = arr[left];
                arr[left] = arr[right];
                arr[right] = temp;
                left++;
                right--;
            }
        }
        return left;
    }
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        const pivot = arr[mid];
        const partition = divide(arr, left, right, pivot);
        quickSort(arr, callback, left, partition - 1);
        quickSort(arr, callback, partition, right);
    }
    return arr;

}

// const quickSort = (originalList) => {
//   const list = [...originalList]

//   if (list.length < 2) {
//     return list
//   }

//   const pivot = list[0]

//   const smaller = list.filter((item) => item < pivot)
//   const bigger = list.filter((item) => item > pivot)

//   return [...quickSort(smaller), pivot, ...quickSort(bigger)]
// }

/*
 * Reference code
 * 1. naive solution
 * 2. advanced 
 * 
 */
// naive solution
// const quickSort = function (arr) {
//   if (arr.length <= 1) return arr;

//   const pivot = arr[0];
//   const left = [];
//   const right = [];

//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] <= pivot) left.push(arr[i]);
//     else right.push(arr[i]);
//   }

//   const lSorted = quickSort(left);
//   const rSorted = quickSort(right);
//   return [...lSorted, pivot, ...rSorted];
// };

function quickSort(arr, transform = (item) => item) {
    if (arr.length <= 1) return arr;

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (transform(arr[i]) < transform(pivot)) left.push(arr[i]);
        else right.push(arr[i]);
    }

    const lSorted = quickSort(left, transform);
    const rSorted = quickSort(right, transform);
    return [...lSorted, pivot, ...rSorted];
}

/*
 * 
 */
function quickSort(arr, callback = (val) => val) {
    // 탈출 조건
    if (arr.length <= 1) {
        return arr;
    }

    const mid = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (callback(arr[i]) < callback(mid)) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left, callback), mid, ...quickSort(right, callback)];
}