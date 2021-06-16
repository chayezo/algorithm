// 내코드
const base = [0, 1];
function fibonacci(n) {
    // TODO: 피보나치 수열 중 n번째 항의 수를 리턴
    // base -> 0
    // return (n<=1) ? n : fibonacci(n-1) + fibonacci(n-2);
    if (base[n] !== undefined) {
        return base[n];
    }
    base[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return base[n];
}

/*
 *  전에 풀어봤던 방식으로는 조금 비효율적이다....? 
 *  그래서 새롭게 풀어봄
 *  대충 레퍼런스랑 비슷하게 된듯...
 *  ! 동적-계획법 >> 블로깅 하기 !
 */

// reference code
// naive solution: O(2^N)
// let fibonacci = function (n) {
//   if (n <= 1) return n;
//   return fibonacci(n - 1) + fibonacci(n - 2);
// };

// dynamic with meoization: O(N)
// 이미 해결한 문제의 정답을 따로 기록해두고,
// 다시 해결하지 않는 기법
// fibo(10)
// = fibo(9) + fibo(8)
// = fibo(8) + fibo(7) + fibo(7) + fibo(6)
// 여기까지만 보아도 동일한 문제가 중복으로 계산되는 것을 알 수 있다.
let fibonacci = function (n) {
    const memo = [0, 1];
    const aux = (n) => {
        // 이미 해결한 적이 있으면, 메모해둔 정답을 리턴한다.
        if (memo[n] !== undefined) return memo[n];
        // 새롭게 풀어야하는 경우, 문제를 풀고 메모해둔다.
        memo[n] = aux(n - 1) + aux(n - 2);
        return memo[n];
    };
    return aux(n);
};