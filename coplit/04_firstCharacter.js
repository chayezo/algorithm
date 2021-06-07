function firstCharacter(str) {
    // str이 빈 문자열일 때 빈 문자열을 리턴
    if (str === '') {
        return '';
    }
    // 공백을 기준으로 나눠서 첫글자를 가져오자
    let letter = str.split(' ');
    // letter를 반복문으로 돌려서
    // 각 단어의 첫 글자만 뽑아낸다.
    // 그리고 그 문자열을 리턴.
    let first = '';
    for (let i = 0; i < letter.length; i++) {
        first += letter[i][0];
    }
    return first;

}
