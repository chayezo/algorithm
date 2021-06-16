// 제출한 코드.
function stringifyJSON(obj) {
    if (typeof obj === 'string') {
        return `"${obj}"`;
    } else if (typeof obj === 'boolean' || typeof obj === 'number' || obj === null) {
        return String(obj);
    }
    // obj가 배열인 경우
    if (Array.isArray(obj)) {
        if (obj.length === 0) {
            return '[]';
        } else {
            let strArr = [];
            for (let i of obj) {
                if (obj[i] === undefined || typeof obj[i] === 'function') {
                    strArr.push(stringifyJSON(null));
                } else {
                    strArr.push(stringifyJSON(obj[i]));
                }
            }
            return '[' + strArr.join() + ']';
        }
    }
    // obj가 객체인 경우 - 배열도 객체이지만, 배열인 경우보다 아래에 작성했기 때문에 배열은 제외.
    if (Object.keys(obj).length === 0) {
        return '{}';
    } else {
        let strObj = '';
        for (let prop in obj) {
            if (obj[prop] === undefined || typeof obj[prop] === 'function') {
                delete obj[prop];
                stringifyJSON(obj);
            } else {
                strObj += stringifyJSON(prop) + ':' + stringifyJSON(obj[prop]) + ',';
            }
        }
        strObj = strObj.slice(0, strObj.length - 1);
        return '{' + strObj + '}';
    }

};