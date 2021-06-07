function letterCapitalize(str) {
    // 1. 무조건 첫 자리는 대문자로 바꿔주기
    // 2. 공백확인
    if (str === '') {
        return '';
    }

    let result = str[0].toUpperCase();

    for (let i = 1; i < str.length; i++) {
        if (str[i - 1] === ' ') {
            result += str[i].toUpperCase();
        } else {
            result += str[i];
        }
    }
    return result;
}
