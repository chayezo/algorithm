
/*
 * 배열 크기가 커지면 매 글자를 완전 탐색으로 구하기에는 비효율적임.
 * 그렇기 때문에 먼저 들어오는 배열을 sort를 이용해서 정렬를 해줌.
 * 문자열의 문자를 순차적으로 검색하면서
 * 해당 글자가 없으면 바로 false 처리
 * 
 */

const isSubsetOf = function (base, sample) {
    // 1. base와 sample을 크기에 따라 정렬
    base.sort((a, b) => a - b);
    sample.sort((a, b) => a - b);

    const findItemInSortedArr = (item, arr, from) => {
        for (let i = from; i < arr.length; i++) {
            if (item === arr[i]) return i;
            else if (item < arr[i]) return -1;
        }
        return -1;
    };

    let baseIdx = 0;
    for (let i = 0; i < sample.length; i++) {
        baseIdx = findItemInSortedArr(sample[i], base, baseIdx);
        if (baseIdx === -1) return false;
    }
    return true;

    // 내 1번 코드
    // 실행 시간을 초과하였음. 왜지?.. -> n의 갯수를 생각하지 않으면 가능함!
    // return sample.every(el => (base.includes(el)) ? true : false);

    // 내 2번 코드
    // 1. 변수 resultdp 0 할당
    // 2. sample을 for문 통해서 인자 하나씩 확인
    // 3. 중첩 for문 사용해서 base 인자를 확인
    // 4. 2-3이 같으면 result ++
    // 5. result, sample.length+1 ? true: false;
    // let result = 0;
    // base.sort((a, b) => a - b);
    // sample.sort((a, b) => a - b);

    // for(let i=0; i<sample.length; i++) {
    //   for(let j=0; j<base.length; j++) {
    //     if(sample[i] === base[j]) result++;
    //   }
    // }
    // if(result === sample.length +1) {
    //   return true;
    // } else {
    //   return false;
    // }

};

// ! -------------------------------------
const isSubsetOf = function (base, sample) {
    // 1. base와 sample을 크기에 따라 정렬
    base.sort((a, b) => a - b);
    sample.sort((a, b) => a - b);
    // EdgeCase 제거
    // if (sample[0] > base[base.length - 1] || sample[sample.length - 1] < base[0]) {
    //   return false;
    // }
    // 2. for loop을 이용해 전체 순회
    let result = false;
    for (let i = 0; i < sample.length; i++) {
        // 이때, i보다 앞에있는 n은 애초에 범위 밖이기에 n=i
        for (let n = i; n < base.length; n++) {
            if (sample[i] === base[n]) {
                result = true;
                break; // true면 멈추셈
            } else {
                result = false;
            }
        }
    }
    return result;
}