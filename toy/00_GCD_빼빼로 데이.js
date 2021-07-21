// 최대 공약수(유클리드 호제법: Euclidean algorithm)
function gcd(m, n) {
    if (m % n === 0) return n;
    return gcd(n, m % n);
}

function divideChocolateStick(M, N) {
    const result = [];
    // 최대공약수를 구한다.
    // M, N의 순서는 상관없다.
    const GCD = gcd(M, N);
    let temp = 0; //

    // 약수는 대칭적이므로 제곱근까지만 반복해도 된다.
    // 예) 36의 약수는 1, 2, 3, 4, 6, 9, 12, 18, 36이다.
    // 제곱근을 기준으로 양쪽의 값 하나씩 곱했을 때 36이 되기 때문에
    // 제곱근 보다 큰 약수는 제곱근보다 작은 약수에서 구할 수 있다.
    const sqrt = Math.floor(Math.sqrt(GCD));
    for (let left = 1; left <= sqrt; left++) {
        if (GCD % left === 0) {
            // 최대공약수의 약수인 경우 중 제곱근 보다 작은 약수의 경우
            result.push([left, M / left, N / left]);
            if (left * left < GCD) {
                // 제곱근이 아닌 경우(제곱근 보다 작은)
                right = GCD / left; // 최대 공약수를 제곱근이 아닌 수로 나누면 제곱근 보다 큰 약수를 구할 수 있다.
                result.push([right, M / right, N / right]);
            }
        }
    }

    // '빼빼로를 받게 되는 직원의 수'를 기준으로 오름차순으로 정렬
    result.sort((op1, op2) => op1[0] - op2[0]);

    return result;
}

// -------------------------------------------------------------------------------
// 최대 공약수(유클리드 호제법: Euclidean algorithm)
function gcd(M, N) {
    return (M % N) === 0 ? N : gcd(N, M % N);
}

function divideChocolateStick(A, N) {
    const result = [];
    let value = 0; // 최대공약수를 담을 변수
    let temp = 0; //

    if (M > N) value = gcd(M, N); // A가 N보다 큰 경우
    else value = gcd(N, M); // N이 A보다 큰 경우

    // 제곱근 까지만 반복해도 된다.
    // 최대 공약수가 36이라면 36의 약수는 1, 2, 3, 4, 6, 9, 12, 18, 36이다.
    // 이는 1 * 36 = 2 * 18 = 3 * 12 = 4 * 9 = 6 * 6 이다.
    // 즉, 제곱근을 기준으로 양쪽의 값 하나씩 곱했을 때 36이 되기 때문에
    // 제곱근 보다 큰 약수는 이미 제곱근보다 작은 약수에서 구할 수 있다.
    // 따라서 제곱근까지만 비교해 주면 된다.
    for (let i = 1; i * i <= value; i++) {
        if (value % i === 0) { // 최대공약수의 약수인 경우 중 제곱근 보다 작은 약수의 경우
            result.push([i, M / i, N / i]);
            if (i !== value / i) { // 제곱근이 아닌 경우(제곱근 보다 작은)
                temp = value / i; // 최대 공약수를 제곱근이 아닌 수로 나누면 제곱근 보다 큰 약수를 구할 수 있다.
                result.push([temp, M / temp, N / temp]);
            }
        }
    }
    // '빼빼로를 받게 되는 직원의 수'를 기준으로 오름차순으로 정렬
    result.sort((op1, op2) => op1[0] - op2[0]);
    console.log(result);
    return result;
}
