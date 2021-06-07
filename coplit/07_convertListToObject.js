function convertListToObject(arr) {
    // 빈 객체를 변수로 선언
    // arr.length 만큼 for문 돌리기
    // 조건 : 중복 되는 키가 없고 && arr[i]의 길이가 0이 아닌 경우에
    // arr[i]의 첫번째 요소를 키, 두번째 요소를 값으로 넣어준다.
    // newObj[arr[i][0]] = arr[i][1];
    const newObj = {};
    for (let i in arr) {
        if (arr[i].length && !(arr[i][0] in newObj)) {
            newObj[arr[i][0]] = arr[i][1];
        }

    }
    return newObj;
}
