/*
 * 문자열을 요소로 갖는 배열을 입력받아 
 * 문자열을 세로로 읽었을 때의 문자열을 리턴
 *  
 */

function readVertically(arr) {
    // 세로로 읽었을 때????
    // 규칙을 보면 : arr[0][0] + arr[1][0] + arr[0][1] + arr[1][1] + arr[0][2] + arr[1][2] + ...
    // 첫 번째 범위는 arr의 길이까지, 두 번째 범위는 배열의 요소 중 가장 긴 길이 ?
    // 이중 for문 사용해서 외부 반복문에서는 두번 째 요소를 기준으로 돌고
    // 내부 반복문에서는 첫 번째 요소를 기준으로
    let maxLen = 0;
    for (let i = 0; i < arr.length; i++) {
        if (maxLen < arr[i].length) {
            maxLen = arr[i].length;
        }
    }

    let result = '';
    for (let i = 0; i < maxLen; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j][i] === undefined) {
                continue;
            }
            result += arr[j][i];
        }
    }
    return result;
}






// reference code
function readVertically(arr) {
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        let str = arr[i];
        for (let j = 0; j < str.length; j++) {
            if (temp.length === j) {
                temp.push(str[j]);
            } else {
                temp[j] = temp[j] + str[j];
            }
        }
    }

    let result = '';
    for (let i = 0; i < temp.length; i++) {
        result = result + temp[i];
    }

    return result;
}