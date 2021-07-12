/*
 * 병합정렬(merge sort)은 대표적인 정렬 알고리즘 중 하나.
 * 리스트의 길이가 0 또는 1이면 이미 정렬된 것으로 본다.
 * 그렇지 않은 경우에는
 * 정렬되지 않은 리스트를 절반으로 잘라 비슷한 크기의 두 부분 리스트로 나눈다.
 * 각 부분 리스트를 재귀적으로 합병 정렬을 이용해 정렬한다.
 * 두 부분 리스트를 다시 하나의 정렬된 리스트로 합병한다.
 * 
 */

// 제출한 내 코드.
const mergeSort = function (arr) {
    // TODO: 오름차순으로 정렬하여 리턴 : 병합 정렬
    if (arr.length < 2) return arr;
    // 쪼개기
    let pivot = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, pivot));
    let right = mergeSort(arr.slice(pivot, arr.length));
    // 재귀
    return merge(left, right);
};

const merge = (left, right) => {
    let temp = [];
    // __.length가 true인 경우 === 배열 안에 값이 남아있는 경우
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            // .shift() : 배열에서 첫 번째 요소를 제거한 후, 그 요소를 반환
            temp.push(left.shift());
        } else {
            temp.push(right.shift());
        }
    }
    while (left.length) temp.push(left.shift());
    while (right.length) temp.push(right.shift());
    return temp;
};


/*
 * reference code
 * 
 */

const merge = function (left, right) {
    let merged = [];
    let leftIdx = 0,
        rightIdx = 0;
    const size = left.length + right.length;

    for (let i = 0; i < size; i++) {
        if (leftIdx >= left.length) {
            merged.push(right[rightIdx]);
            rightIdx++;
        } else if (rightIdx >= right.length || left[leftIdx] <= right[rightIdx]) {
            merged.push(left[leftIdx]);
            leftIdx++;
        } else {
            merged.push(right[rightIdx]);
            rightIdx++;
        }
    }

    return merged;
};

const mergeSort = function (arr) {
    if (arr.length < 2) return arr;
    const middle = parseInt(arr.length / 2);
    const left = mergeSort(arr.slice(0, middle));
    const right = mergeSort(arr.slice(middle));
    const merged = merge(left, right);
    return merged;
};