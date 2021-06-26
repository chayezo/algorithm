# 거듭제곱
거듭제곱이란 주어진 수를 주어진 횟수만큼 곱하는 연산이다.

<img src=https://t1.daumcdn.net/cfile/tistory/995472415B16A67D12>

만약 거듭제곱을 구하는 알고리즘을 작성해야 한다면, 쉽게 구현할 수 있을 것이다.<br>
일반적으로 재귀함수와 반복문을 활용해서 작성해 볼 수 있다.

<br>
<br>

1. 재귀 함수 거듭제곱
```js
function power(base, exponent) {
    return exponent===0 ? 1 : (base* power(base, exponent-1));
}
```

2. 반복문 거듭제곱
```js
function power(base, exponent) {
    let result = 1;
    for (let i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}
```
위와 같은 방식은 문제점은 ???<Br>
**바로 n이 클수록 성능이 낮다.**<br>
=> **시간 복잡도**를 줄여, 개선된 *효율적인 코드* 를 만들어 보자.<br>
: 분할 정복(문제를 작은 부분으로 쪼개나가면서 해결하는 방식)을 이용해서 개선 가능.

<br>

<img src=https://t1.daumcdn.net/cfile/tistory/999B393F5B66884E1B>
<br>
<br>

```js
function power(base, exponent) {
    if (exponent === 0) return 1;
    let half = power(base, Math.floor(exponent / 2));
    let result = half * half;
    if (exponent % 2 === 0) {
        return result;
    } else {
        return base * result;
    }
}

```

```js
function power(base, exponent) {
    if (exponent === 0) return 1;

    const half = parseInt(exponent / 2);
    const temp = power(base, half);
    const result = temp * temp;

    if (exponent % 2 === 1) return base * result;
    else return result;
}
```

결과적으로 시간복잡도가 O(n) => O(log n)으로 줄여졌다.<br>

---
알고리즘 문제를 풀어볼수록 핵심은 시간복잡도를 줄이는 것 같다.