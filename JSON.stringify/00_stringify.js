// 1. 입력값이 undefined 또는 함수일 때 undefined를 반환
// 2. 입력값이 문자열인 경우 문자열의 양쪽 끝에 ""추가한 새로운 문자열을 반환한다.
// 3. 입력값이 문자열이 아닌 데이터 - 숫자, boolean, null 일때는 입력값에 String()메서드를 적용해서 반환한다.
// 4. 입력값이 배열일때, 배열의 요소에 각각 stringifyJSON 함수를 적용시켜주고 그 결과를 배열에 저장해준다.
// 4-1. 빈배열일 경우, 빈배열을 반환
// 4-2. 빈배열이 아닌 경우, 배열의 길이만큼 stringifyJSON 함수를 반복 실행 (재귀) 결과값을 새로운 배열에 push
// 4-3. 새로운 배열을 문자열로 변환시켜준후 '[문자열[새로운배열]]' 형태로 반환
// 5. 입력값이 객체일 때, 객체의 속성과 값들에 stringifyJSON함수를 적용해주고 그 결과를 문자열에 저장
// 5-1. 빈 객체인 경우 빈 객체 '{}'를 반환
// 5-2. 빈 객체가 아닌 경우, 객체의 값에 undefined 또는 함수가 들어있으면 -빈 객체{} 반환해주고,
// 아니라면, '속성:값,' 형태의 문자열로 저장
// 5-3. 문자열 마지막에 포함된 ','를 제거하고 '{str}'로 변환.
function stringifyJSON(obj) {
    if (typeof obj === 'function' || typeof obj === 'undefined') {
        return undefined;
    }
    if (typeof obj === 'string') {
        return '"' + obj + '"';
        // return `"${obj}"`;
    }
    if (Array.isArray(obj)) {
        let temp = [];
        if (obj.length === 0) {
            return '[]';
        } else {
            // 여기서 for (let i = 0; i < obj.length; i++) 이렇게 하니까 오류남..
            for (let i of obj) {
                temp.push(stringifyJSON(i));
            }
        }
        return '[' + String(temp) + ']';
    }

    if (typeof obj === 'object' && obj !== null) {
        let str = '';
        if (Object.keys(obj).length === 0) {
            return '{}';
        } else {
            for (let prop in obj) {
                if (typeof obj[prop] !== 'function' && obj[prop] !== undefined) {
                    let stringKey = stringifyJSON(prop);
                    let stringValue = stringifyJSON(obj[prop]);
                    str += `${stringKey}:${stringValue}`;
                    str += ',';
                }
            }
            str = str.slice(0, -1);
            return '{' + str + '}';
            // return `{${str}}`;
        }
    }
    // if (typeof obj === 'boolean' || typeof obj === 'number' || obj === null)
    return String(obj);
};