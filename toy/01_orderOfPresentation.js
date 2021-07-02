const orderOfPresentation = (n, k) => {
    const results = [];

    const pool = [];
    for (let i = 1; i <= n; i++) {
        pool.push(i);
    }

    const backTrack = (args, tempArr) => {
        if (tempArr.length === pool.length) {
            results.push([...tempArr]);
        }

        args.forEach(arg => {
            if (!tempArr.includes(arg)) {
                tempArr.push(arg);
                backTrack(args, tempArr);
                tempArr.pop(arg);
            }
        });
    }

    backTrack(pool, []);

    if (typeof k === 'number') {
        return results[k];
    }

    if (Array.isArray(k)) {
        for (let i = 0; i < results.length; i++) {
            if (results[i].every((arg, index) => arg === k[index])) {
                return i;
            }
        }
    }
};

//
function orderOfPresentation(n, k) {
    // TODO: 여기에 코드를 작성합니다.
    //1. 경우의수배열을 만들어서 모든경우의수 배열에 넣어준다.
    //2.1 맨앞 요소를 박고, 나머지는 재귀돌려서 경우의수배열에 넣어준다.
    //2.2 끝까지 다 넣으면 모든경우의수배열에 push한다.
    //2.3 위를 재귀로 반복
    let group = [];
    for (let i = 1; i <= n; i++) {
        group.push(i);
    }

    let listAll = [];
    let list;

    const recur = (arr, list = []) => {
        if (arr.length === 0) {
            listAll.push(list);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let newArr = arr.slice();
                let cur = newArr.splice(i, 1);
                let temp = newArr.slice();
                recur(temp, list.concat(cur));
            }
        }
    };

    recur(group);

    if (typeof k === 'number') {
        return listAll[k];
    } else {
        for (let i = 0; i < listAll.length; i++) {
            if (`${k}` === `${listAll[i]}`) return i;
        }
    }
}


//
function orderOfPresentation(N, K) {
    const factorial = (n) => {                           // 조의 개수에 따른 순서에 대한 경우의 수는 팩토리얼로 구해야 하므로 팩토리얼 함수를 따로 만들어 둔다.
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    };

    // N = 3 , K = [2,3,1]
    let order = 0;                                       // K가 몇번 째 수인지 구하기 위한 카운터의 개념
    const isUsed = new Array(N + 1).fill(false);             // 특정 조가 사용되었다는 것을 체킹하기 위한 배열 / 인덱스는 0부터 시작하지만 조는 1부터 시작하기 때문에 0번째 자리에 더미 데이터를 만들어 둔다.
    // [false, false, false, false]
    for (let i = 0; i < K.length; i++) {
        const num = K[i];                                  // num은 K 배열 내의 특정 조가 하나씩 할당된다.
        isUsed[num] = true;                                // 해당 조가 사용될 때마다 체킹을 해준다.
        const candidates = isUsed.slice(1, num);           // 0번째 인덱스는 더미 데이터이기 때문에 제외하고, num에 할당된 조보다 작은 수들의 순서에 대한 경우의 수를 구하기 위해 자른다.
        const validCnt = candidates.filter((el) => el === false).length;             // 사용되지 않은 조들의 개수를 구한다.
        const formerCnt = validCnt * factorial(N - i - 1);
        order = order + formerCnt;
    }

    return order;
}

/**
 * 설명을 덧붙이자면,
 * 만약 K가 [2, 3, 1]이라고 가정했을 때, 첫 번째 num은 2가 될 것입니다.
 * 2가 제일 앞에 있다고 가정한다면, 앞자리가 2의 차례가 오기 전에 1의 모든 경우의 수를 구했을 것이고,
 * 1의 모든 경우의 수를 지금부터 구하게 됩니다.
 * 
 * 그렇다면, IsUsed 배열은 이렇게 됩니다. [false(더미), false, true, false]
 * candidates 배열은 이렇게 됩니다. => [false]
 * validCnt는 이렇게 됩니다. => 1
 * formerCnt는 이렇게 됩니다. => 1 * factorial(3 - 0 - 1) // i는 0부터 시작하기 때문에 N에서 남아 있는 수를 구할 때 - 1이 추가로 필요합니다.
 * order는 2를 추가합니다.
 * 
 * 두 번째를 순회했을 땐, num이 3이 됩니다.
 * 그렇다면, IsUsed 배열은 이렇게 됩니다. [false(더미), false, true, true]
 * candidates 배열은 이렇게 됩니다. => [false]
 * validCnt는 이렇게 됩니다 => 1
 * formerCnt는 이렇게 됩니다 => 1 * factorial(3 - 1 - 1)
 * order는 1을 추가합니다. (3)
 * 
 * 세 번째를 순회했을 땐, num이 1이 됩니다.
 * IsUsed 배열은 이렇게 됩니다. [false, true, true, true]
 * candidates 배열은 []이고, validCnt는 0이 되어, formerCnt는 0이 됩니다.
 * 
 * 발표 순서는 0부터 시작하기 때문에 0, 1, 2, 3으로
 * 결과적으로, 값은 3이 됩니다.
 */
function orderOfPresentation(N, K) {
    // 조의 개수 N, 발표 순서 K

    // N은 최대 12입니다.
    // 발표 순서를 만드는 것은 순열(permutation)이므로, 발표 순서의 최대 크기는 12!입니다.
    // 순열을 전부 생성하는 것은 올바른 접근 방법이 아닙니다.
    const factorial = (n) => {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    };

    // 발표 순서를 담는 변수 생성
    let order = 0;
    // N개의 조 중에, 어떠한 조가 이미 포함되었는지 확인하기 위해 배열을 생성합니다.
    // 만약 N이 3이라면 [false, false, false, false]로 생성됩니다.
    // 제일 첫 번째는 더미 데이터입니다. (인덱스는 0부터 시작하지만 조는 1부터 시작하기 때문에)
    const isUsed = Array(N + 1).fill(false);

    for (let i = 0; i < K.length; i++) {
        // K의 i번째 조를 변수에 담습니다.
        const num = K[i];
        // 사용했는지 판별하기 위해 isUsed에 체크합니다. (중복이 아니기 때문에)
        isUsed[num] = true;
        // num보다 앞에 올 수 있는 수들의 배열을 복제해서,
        const candidates = isUsed.slice(1, num);
        // 이 중에서 아직 사용되지 않은 수의 개수를 구합니다.
        const validCnt = candidates.filter((el) => el === false).length;
        // 아직 사용되지 않은 수, 그 전까지의 모든 경우의 수를 카운트합니다.
        const formerCnt = validCnt * factorial(N - i - 1);
        // order에 추가합니다.
        order = order + formerCnt;
    }
    return order;
}