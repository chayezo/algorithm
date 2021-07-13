// 시간 초과된 내 코드 1번....
const bubbleSort = function (arr) {
    // 1. 배열의 길이만큼 반복 -> for 반복문
    // 2. 중첩 for문
    for (let i = 0; i < arr.length; i++) { // 순차적으로 비교하기 위한 반복문
        for (let j = 0; j < arr.length - 1 - i; j++) { // 끝까지 돌았을 때 다시 처음부터 비교하기 위한 반복문
            if (arr[j] > arr[j + 1]) { // 두 수를 비교하여 앞 수가 뒷 수보다 크면
                let swap = arr[j]; // 두 수를 서로 바꿔준다
                arr[j] = arr[j + 1];
                arr[j + 1] = swap;
            }
        }
    }
    return arr;
}

/*
 * 내 코드 2번..... 테스트 2개 통과안됨
 * advanced 통과안됨.........................수행 시간을 단축 못 함 !
 * RangeError: Maximum call stack size exceeded
 *
 */

const bubbleSort = function (arr, pointer = arr.length - 1) {
    // TODO: 배열을 입력받아 오름차순으로 정렬하여 리턴
    if (pointer === 0) return arr;
    for (let i = 0; i < pointer; i++) {
        // 순차적으로 비교하기 위한 반복문
        if (arr[i] > arr[i + 1]) {
            let temp = arr[i + 1];
            arr[i + 1] = arr[i];
            arr[i] = temp;
        }
    }
    return bubbleSort(arr, pointer - 1);

};

/*
 * 통과한 내 코드. 
 */
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

// reference code
const swap = function (idx1, idx2, arr) {
    // 두 변수를 바꾸는 방법

    // 1) 임시 변수를 활용한 방법
    // let temp = arr[idx1];
    // arr[idx1] = arr[idx2];
    // arr[idx2] = temp;

    // 2) Destructuring assignment를 활용한 방법
    // arr이 reference type이라 가능
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];

    // 3) XOR 연산을 활용한 방법
    // arr이 reference type이라 가능
    // arr[idx1] ^= arr[idx2];
    // arr[idx2] ^= arr[idx1];
    // arr[idx1] ^= arr[idx2];
};

// naive solution
// let bubbleSort = function (arr) {
//   let N = arr.length;

//   for (let i = 0; i < N - 1; i++) {
//     // 매 반복(iteration)마다 i번째로 큰 수가 마지막에서 i번째 위치하게 된다.
//     // 이미 정렬된 요소는 고려할 필요가 없으므로, 'j < N - 1 - i'만 비교하면 된다.
//     for (let j = 0; j < N - 1 - i; j++) {
//       if (arr[j] > arr[j + 1]) {
//         swap(j, j + 1, arr);
//       }
//     }
//   }

//   return arr;
// };

// optimized solution
let bubbleSort = function (arr) {
    let N = arr.length;

    for (let i = 0; i < N; i++) {
        // swap 횟수를 기록한다.
        // 어떤 요소도 swap되지 않은 경우, 배열은 정렬된 상태이다.
        let swaps = 0;

        // 매 반복(iteration)마다 i번째로 큰 수가 마지막에서 i번째 위치하게 된다.
        // 이미 정렬된 요소는 고려할 필요가 없으므로, 'j < N - 1 - i'만 비교하면 된다.
        for (let j = 0; j < N - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swaps++;
                swap(j, j + 1, arr);
            }
        }

        if (swaps === 0) {
            break;
        }
    }

    return arr;
};

/*
 * 
 * study code. 
 */
const bubbleSort = function (arr) {
    let flag = true;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                flag = false;
            }
        }

        if (flag) return arr;
    }
    return arr;
};