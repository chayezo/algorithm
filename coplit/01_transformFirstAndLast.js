function transformFirstAndLast(arr) {
    // 배열의 첫 요소와 마지막 요소를 키와 value로 하는 객체를 리턴 !
    // 빈 객체를 만들어 준다 ! why? 객체를 반환해야 하니까
    let result = {};
    if (arr.length > 0) {
        // 0번째 인덱스와 마지막 인덱스에 넣기
        result[arr[0]] = arr[arr.length - 1];
    }
    return result;
}