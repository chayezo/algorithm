/**
 * 
 * Error: Timeout of 2000ms exceeded. For async tests and hooks, 
 * ensure "done()" is called; if returning a Promise, ensure it resolves. (/submission/index.test.js)
 * at processImmediate (internal/timers.js:456:21) ... 
 * 
 * 1번 코드 돌리니까 나온 테스트 에러..
 * 그냥 시간복잡도를 생각하지 않은, 효율적이지 않은 코드임.
 */
function power(base, exponent) {
    // todo: 거듭제곱을 리턴
    // 시간복잡도를 생각하지 않는다면 ?
    let result = 1;
    for (let i = 0; i < exponent; i++) {
        result *= base;
        if (result >= 94906249) {
            result %= 94906249
        }
    }
    return result;
}

// 제출한 내 코드.
function power(base, exponent) {
    // todo: 거듭제곱을 리턴
    // 최대치의 절반값을 구해서 서로 곱해준다.
    if (exponent === 0) return 1;
    let half = power(base, Math.floor(exponent / 2));
    let result = (half * half) % 94906249;
    if (exponent % 2 === 0) {
        return result;
    } else {
        return (result * base) % 94906249;
    }
}

// reference code
function power(base, exponent) {
    if (exponent === 0) return 1;

    const half = parseInt(exponent / 2);
    const temp = power(base, half);
    const result = (temp * temp) % 94906249;

    if (exponent % 2 === 1) return (base * result) % 94906249;
    else return result;
}