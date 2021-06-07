function powerOfTwo(num) {
    // 2의 n 제곱수면, true
    // 아니면 false
    // Math.floor 사용했는데 통과못함....
    // 그럼 곱해서 비교해보자..
    // num이 1일 때는 2의 0승이니까 true
    // 다음은 2씩 곱해서 num과 같아지면 true
    // 커지면 false
    if (num === 1) {
        return true;
    }
    let result = 1;
    while (true) {
        result *= 2;
        if (result === num) {
            return true;
        } else if (result > num) {
            return false;
        }
    }

}