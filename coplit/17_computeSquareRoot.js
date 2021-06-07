function computeSquareRoot(num) {
    // 바빌로니아 법
    // Math.sqrt()를 사용하지 않고 제곱근을 구할 때, 
    // 예상값을 조금씩 올려 그 제곱을 계산해보면, 제곱근에 근사한 값으로 계산해낼 수 있다. 
    // 제곱근을 구하는 법 : x = ( x + ( num / x )) / 
    let closestNum = 1;
    while (closestNum * closestNum < num) {
        closestNum++;
    }
    if (closestNum * closestNum === num) {
        return closestNum;
    }
    for (let i = 0; i < 3; i++) {
        closestNum = (closestNum + num / closestNum) / 2;
    }
    return Number(closestNum.toFixed(2));
}

// reference code
function computeSquareRoot(num) {
    const diffs = [1, 0.1, 0.01, 0.001];
    let base = 1;
    for (let i = 0; i < diffs.length; i++) {
        while (base * base < num) {
            base = base + diffs[i];
        }

        if (base * base === num) {
            return base;
        } else {
            base = base - diffs[i];
        }
    }
    return Number(base.toFixed(2));
}