// 제출한 코드
const powerSet = function (str) {
    // TODO: 부분집합 경우의 수 !
    // 1. 입력받은 문자열을 쪼갠다. 중복은 제거.
    // 2. 순서에 상관없이, 같은 문자열의 조합은 같은 경우로 취급한다.
    let newStr = Array.from(new Set(str.split('')));
    // 입력받은 문자열에서 중복제거(new Set)하고 , 쪼갠 문자열로 이루어진 새로운 배열을 만들자
    let answer = [];
    function recur(arr, depth) {
        if (depth === newStr.length) {
            answer.push(arr.slice().sort().join(''));
            // .slice() -> 그냥 배열 복사해서 사용하려고
            return;
        } else {
            arr[depth] = newStr[depth];
            recur(arr, depth + 1);
            arr[depth] = undefined;
            recur(arr, depth + 1);
        }
    }
    recur([], 0);
    return answer.sort();

};

// reference code
const powerSet = function (str) {
    // 정렬
    const sorted = str.split('').sort();
    // 중복 제거
    const deduplicated = sorted.reduce((acc, item) => {
        if (acc[acc.length - 1] === item) {
            return acc;
        } else {
            return acc.concat(item);
        }
    });

    let subSets = [];
    const pickOrNot = (idx, subset) => {
        // base case
        if (idx === deduplicated.length) {
            // 마지막 문자까지 검토한 경우
            subSets.push(subset);
            return;
        }
        // recursive case
        // idx번째 문자가 포함되지 않는 경우
        pickOrNot(idx + 1, subset);
        // idx번째 문자가 포함되는 경우
        pickOrNot(idx + 1, subset + deduplicated[idx]);
    };
    pickOrNot(0, '');
    return subSets.sort();
};