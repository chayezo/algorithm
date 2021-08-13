// 제출한 코드.
let longestPalindrome = function (str) {
    if (str.length === 1) {
        return str.length;
    }
    const expandAroundCenter = (str, L, R) => {
        while (L >= 0 && R < str.length && str[L] === str[R]) {
            L--;
            R++;
        }

        return R - L - 1;
    }

    let start = 0;
    let end = 0;
    for (let i = 0; i < str.length; i++) {
        let len1 = expandAroundCenter(str, i, i);
        let len2 = expandAroundCenter(str, i, i + 1);
        let maxLen = Math.max(len1, len2);

        if (maxLen > end - start) {
            start = Math.ceil(i - (maxLen - 1) / 2);
            end = Math.floor(i + maxLen / 2);
        }
    }

    return str.substring(start, end + 1).length;
};

let longestPalindrome = function (str) {
    // str을 반복문으로 돌면서 기준(i)을 옮겨간다.
    // 각 기준(i)을 중심으로 왼쪽, 오른쪽으로 퍼져나가며, str[왼쪽]과 str[오른쪽]이 같은지를 판별해 나간다.
    // 같을 경우 계속 퍼져나가고, 그 길이가 최대인 값을 리턴해준다.

    // str의 길이가 1이거나, 반대로 해도 같을 경우 그냥 str.length를 리턴한다.
    if (str.length < 2 || str === str.split('').reverse().join('')) return str.length;

    let result = 0;
    for (let i = 0; i < str.length - 2; i++) {
        result = Math.max(result, iToExpand(i, i + 1).length, iToExpand(i, i + 2).length);
    }

    // 기준 i를 중심으로 퍼져나가는 함수
    function iToExpand(left, right) {
        while (left >= 0 && right <= str.length - 1 && str[left] === str[right]) {
            left--;
            right++;
        }
        return str.slice(left + 1, right);
    }
    return result;
};



// naive solution: O(N^3)
function longestPalindrome(str) {
    if (str.length <= 1) return str.length;

    const checkPalindrome = function (str) {
        const half = parseInt(str.length / 2);
        for (let i = 0; i < half; i++) {
            if (str[i] !== str[str.length - 1 - i]) return false;
        }
        return true;
    };

    // 길이가 긴 순서대로 부분 문자열을 만들어 검사한다.
    for (let len = str.length; len >= 1; len--) {
        // 길이 len인 부분 문자열들의 시작 인덱스를 구한다.
        // 예. 전체 길이가 100이고, 부분 문자열의 길이가 10인 경우,
        // 부분 문자열 (시작인덱스 ~ 마지막 인덱스)
        //  90 ~ 99, 89 ~ 98, 88 ~ 97, ..., 1 ~ 10, 0 ~ 9
        for (let startIdx = str.length - len; startIdx >= 0; startIdx--) {
            // slice의 특성을 고려한 마지막 인덱스 + 1 을 저장
            const endIdx = startIdx + len;
            const subStr = str.substring(startIdx, endIdx);
            const result = checkPalindrome(subStr);
            if (result === true) return len;
        }
    }
}

// reference code.
function longestPalindrome(str) {
    if (str.length < 2) return str.length;

    const LENGTH = str.length;
    const isPalindrome = Array(LENGTH)
        .fill(false)
        .map((_) => Array(LENGTH).fill(false));
    // 언더바는 잘못된 코드가 아닙니다.
    // 언더바는 어떤 매개변수는 전달되어도 무시하겠다는 의미로 사용됩니다.

    let maxLen = 1;
    // 길이가 1인 회문
    for (let i = 0; i < LENGTH; i++) isPalindrome[i][i] = true;

    // 길이가 2인 회문
    for (let i = 0; i < LENGTH - 1; i++) {
        if (str[i] === str[i + 1]) {
            isPalindrome[i][i + 1] = true;
            maxLen = 2;
        }
    }

    // 길이가 3 이상인 회문
    for (let len = 3; len <= LENGTH; len++) {
        for (let startIdx = 0; startIdx <= LENGTH - len; startIdx++) {
            const endIdx = startIdx + len - 1;
            if (
                isPalindrome[startIdx + 1][endIdx - 1] === true &&
                str[startIdx] === str[endIdx]
            ) {
                isPalindrome[startIdx][endIdx] = true;
                maxLen = len;
            }
        }
    }

    return maxLen;
}