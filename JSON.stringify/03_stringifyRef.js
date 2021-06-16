// reference code임.
function stringifyJSON(obj) {
    if (obj === null) {
        return "null";
    }
    if (typeof obj === "number" || typeof obj === "boolean") {
        return String(obj);
    }
    if (typeof obj === "string") {
        return `"${obj}"`;
    }
    //obj가 배열인 경우
    if (Array.isArray(obj)) {
        const result = [];
        obj.forEach(function (element) {
            result.push(stringifyJSON(element))
        })
        return `[${result}]`;
    }
    //obj가 객체인 경우 (객체에는 배열, 객체 모두 포함되지만 배열인 경우보다 아래에 작성했으므로 배열은 제외된다.)
    if (typeof obj === "object") {
        let result = "";
        for (let key in obj) {
            if (obj[key] === undefined || typeof obj[key] === "function") {
                result = String(result);
            } else {
                result = result + `${stringifyJSON(key)}:${stringifyJSON(obj[key])},`;
            }
        }
        result = result.substr(0, result.length - 1);
        return `{${result}}`;
    }
};