function insertDash(str) {
    // 문자열 중에 [홀수 + 홀수]가 오면 '-'를 추가해준다.
    let result = '';
    for (let i in str) {
        if (parseInt(str[i - 1]) % 2 && parseInt(str[i]) % 2) {
            result += '-';
        }
        result += str[i];
    }
    return result;
}
