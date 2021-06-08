function removeExtremes(arr) {
    // 최소 길이가 20, 최대 길이가 0이라고 해주자
    let maxLen = 0;
    let minLen = 20;
    let maxIdx = 0;
    let minIdx = 0;

    for (let i = 0; i < arr.length; i++) {
        // 요소의 길이를 최대 길이와 비교한다
        // => 길면 길이와 인덱스 값을 저장
        if (arr[i].length >= maxLen) {
            maxLen = arr[i].length;
            maxIdx = i;
        }
        // 요소의 길이를 최소 길이와 비교해준다.
        // => 짧으면 그 길이와 인덱스 값을 저장
        if (arr[i].length <= minLen) {
            minLen = arr[i].length;
            minIdx = i;
        }
    }

    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (i !== minIdx && i !== maxIdx) {
            result.push(arr[i]);
        }
    }
    return result;
}
