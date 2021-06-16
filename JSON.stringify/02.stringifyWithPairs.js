function stringifyJSON(obj) {
    if (typeof obj === undefined || typeof obj === 'function') {
        return undefined;
    }
    if (obj === null) return 'null';
    if (typeof obj === 'string') return `"${obj}"`;
    if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]';

        let arr = [];
        for (let e of obj) {
            // 4-2. 빈배열이 아닌 경우, 배열의 길이만큼 stringifyJSON 함수를 반복 실행 (재귀) 결과값을 새로운 배열에 push
            arr.push(stringifyJSON(e));
        }
        // 4-3. 새로운 배열을 문자열로 변환시켜준후 '[문자열[새로운배열]]' 형태로 반환
        return '[' + String(arr) + ']'; // -> ["a", true"] -> ["a", true]
    }

    // 5. 입력값이 객체일 때, 객체의 속성과 값들에 stringifyJSON함수를 적용해주고 그 결과를 문자열에 저장
    if (typeof obj === 'object') {
        let str = '';
        // ! undefined { x: 5, y: undefined} -> '{"x":5}'
        // 5-1. 빈 객체인 경우 빈 객체 '{}'를 반환n
        if (Object.keys(obj).length === 0) return '{}';
        else {
            Object.keys(obj).forEach((key, _) => {
                if (typeof obj[key] !== 'undefined' && typeof obj[key] !== 'function') {
                    const stringKey = stringifyJSON(key);
                    const stringValue = stringifyJSON(obj[key]);
                    str += `${stringKey}:${stringValue}`;
                    str += ',';
                }
            });
            str = str.slice(0, -1);
            return `{${str}}`;
        }
    }
    // 5-2. 빈 객체가 아닌 경우, 객체의 값에 undefined 또는 함수가 들어있으면 -빈 객체{} 반환해주고,
    // 아니라면, '속성:값,' 형태의 문자열로 저장
    // 5-3. 문자열 마지막에 포함된 ','를 제거하고 '{str}'로 변환.

    // 6. 입력값이 문자열이 아닌 데이터 - 숫자, boolean, null 일때는 입력값에 String()메서드를 적용해서 반환한다.
    return String(obj);
};