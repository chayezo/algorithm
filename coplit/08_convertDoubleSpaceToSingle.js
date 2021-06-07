function convertDoubleSpaceToSingle(str) {
    return str.split('  ').join(' ');
}

// reference code
function convertDoubleSpaceToSingle(str) {
    let result = '';
    let before = '';
    for (let i = 0; i < str.length; i++) {
        // 직전의 문자가 공백이고, 현재의 문자도 공백인 경우
        // 즉, 현재의 문자가 두 번째 공백인 경우(에만), 무시한다.
        if (before !== ' ' || str[i] !== ' ') {
            result = result + str[i];
        }
        before = str[i];
    }
    return result;
}
