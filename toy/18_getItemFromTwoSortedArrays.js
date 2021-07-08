/*
 * 제출한 내 코드.
 * 테스트 1개 통과 못함.(advanced)
 * binary search
 * 
 */
const getItemFromTwoSortedArrays = function (arr1, arr2, k) {
    // TODO: 오름차순으로 정렬되어 있는 자연수 배열들을 입력받아 전체 요소 중 k번째 요소를 리턴
    // binary search
    // arr1[0], arr2[0] => 가장 작은 값
    // 가장 작은 두 값을 비교해서 더 작은 값을 target
    // arr1[left] < arr2[right] -> left++ -> count++
    // k번째 전까지 : while
    let count = 0;
    let left = 0;
    let right = 0;
    let target;
    while (k > count) {
        if (arr1[left] < arr2[right]) {
            target = arr1[left];
            left++;
        } else {
            target = arr2[right];
            right++;
        }
        count++;
    }
    return target;
};

/*
 * Reference code.
 * 1. naive solution
 * 2. O(logK) solution
 */

// naive solution
const getItemFromTwoSortedArrays = function (arr1, arr2, k) {
    let cnt = 0,
        left = 0,
        right = 0;
    let target;
    while (cnt < k) {
        if (arr1[left] < arr2[right]) {
            target = arr1[left];
            left++;
        } else {
            target = arr2[right];
            right++;
        }
        cnt++;
    }
    return target;
};

// O(logK) solution
const getItemFromTwoSortedArrays = function (arr1, arr2, k) {
    let leftIdx = 0;
    let rightIdx = 0;

    while (k > 0) {
        // 이진 탐색을 위해 각 배열에서 k를 절반으로 쪼개서 카운트 한다.
        let cnt = Math.ceil(k / 2);
        let leftStep = cnt,
            rightStep = cnt;

        // 엣지 케이스
        // 카운트가 남았음에도 배열의 끝에 도달하면 k를 나머지 배열쪽으로 넘긴다.
        if (leftIdx === arr1.length) {
            rightIdx = rightIdx + k;
            break;
        }

        if (rightIdx === arr2.length) {
            leftIdx = leftIdx + k;
            break;
        }

        // 엣지 케이스
        // 현재 카운트가 남아있는 후보 요소들보다 많을 경우, leftStep(현재 할당량)을 남아있는 요소들의 개수로 바꾼다.
        if (cnt > arr1.length - leftIdx) leftStep = arr1.length - leftIdx;
        if (cnt > arr2.length - rightIdx) rightStep = arr2.length - rightIdx;

        // 두 배열의 현재 검사 요소 위치를 비교해서, 그 값이 작은 배열은 비교한 위치 앞에 있는 요소들을 모두 후보군에서 제외시킨다.
        if (arr1[leftIdx + leftStep - 1] < arr2[rightIdx + rightStep - 1]) {
            leftIdx = leftIdx + leftStep;
            // 처리가 끝나면 k값을 절반으로 떨어뜨린다.
            k = k - leftStep;
        } else {
            rightIdx = rightIdx + rightStep;
            k = k - rightStep;
        }
    }

    leftMax = arr1[leftIdx - 1] || -1;
    rightMax = arr2[rightIdx - 1] || -1;

    return Math.max(leftMax, rightMax);
};