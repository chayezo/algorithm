/*
 * TODO: 정수를 요소로 갖는 중첩되지 않은 1차원 배열을 입력받아 
 * 3개의 요소를 곱해 나올 수 있는 최대값을 리턴
 * 양수만 주어지면 버블정렬로 깔끔하게 해결할 수 있는데,,,,
 * 음수와 0을 포함하는 정수 ???
 *
 * 
 * 정렬 된 배열에서 답이 나오는 경우 ???
 * 1. 가장 큰 수부터 순서대로 세가지를 곱한 결과 (모두 양수)
 * 2. 가장 큰수(양수)와 음수이면서 가장 작은 두 수를 곱한 결과
 * 
 */

// ! 제출한 코드
const largestProductOfThree = function (arr) {
    arr.sort((a, b) => b - a);

    // 첫번째 양수, 두번째 세번째는 음수 -> 맨앞 * 뒤에두개
    if (arr[0] > 0 && arr[1] < 0) {
        return arr[0] * arr[arr.length - 1] * arr[arr.length - 2];
    }
    // 첫번째 양수보다 뒤에 음수 두개가 더 크다면 -> 맨앞 * 뒤에두개
    if (arr[0] > 0 && arr[arr.length - 2] < 0 && Math.abs(arr[0]) < Math.abs(arr[arr.length - 2])) {
        return arr[0] * arr[arr.length - 1] * arr[arr.length - 2];
    }
    // 나머지 전부
    return arr[0] * arr[1] * arr[2];
};

/* 
 * 테스트 2개가 통과가 안된 코드 !
 * 조금만 수정을 해보자....
 */
const largestProductOfThree = function (arr) {
    const sorted = arr.sort((a, b) => {
        return b - a;
    });
    // variable called "result" with value 1
    let result = 1;
    // if(sorted is not empty)
    // iterate over "sorted", multiply first three element with "result" accumulative
    for (let i = 0; i < 3; i++) {
        if (sorted[i] < 0) {
            // if(sorted[i] is a NEGATIVE number)
            result = result * Math.abs(sorted[i]);
        } else {
            // if(sorted[i] is a POSITIVE number)
            result = result * sorted[i];
        }
    }
    return result;
};


// ? reference code
const largestProductOfThree = function (arr) {
    const sorted = arr.slice().sort((a, b) => a - b);
    const len = arr.length;
    const candi1 = sorted[len - 1] * sorted[len - 2] * sorted[len - 3];
    const candi2 = sorted[len - 1] * sorted[0] * sorted[1];
    return Math.max(candi1, candi2);
};
