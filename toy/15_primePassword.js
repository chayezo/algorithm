/*
 * reference code
 *  
 * */
const isPrime = (num) => {
    if (num % 2 === 0) return false;
    let sqrt = parseInt(Math.sqrt(num));
    for (let divider = 3; divider <= sqrt; divider += 2) {
        if (num % divider === 0) {
            return false;
        }
    }
    return true;
};

// 4자리 수를 받아서 각 자리수의 수들의 배열로 변환하는 함수
//  let output = splitNum(3359);
//  console.log(output); // --> [3, 3, 5, 9]
const splitNum = (num) => {
    const digits = num.toString().split('');
    return digits.map((d) => Number(d));
};

// 길이의 4의 수 배열을 받아서, 4자리의 수로 변환하는 함수
//  let output = splitNum([3, 3, 5, 9]);
//  console.log(output); // --> 3359
const joinDigits = (digits) => Number(digits.join(''));

const primePassword = (curPwd, newPwd) => {
    if (curPwd === newPwd) return 0;
    // bfs를 위해 queue를 선언
    let front = 0;
    let rear = 0;
    const queue = [];
    const isEmpty = (queue) => front === rear;
    const enQueue = (queue, item) => {
        queue.push(item);
        rear++;
    };
    const deQueue = (queue) => {
        return queue[front++];
        // const item = queue[front];
        // front++;
        // return item;
    };

    // 각 4자리의 방문 여부를 저장하는 배열
    // 한 번 방문한 수(가장 최소의 동작으로 만든 수)는 다시 방문할 필요가 없다.
    const isVisited = Array(10000).fill(false);
    isVisited[curPwd] = true;
    // bfs를 위한 시작점
    // 큐에는 [필요한 동작 수, 비밀번호]가 저장된다.
    enQueue(queue, [0, curPwd]);
    // bfs는 큐가 빌(empty) 때까지 탐색한다.
    while (isEmpty(queue) === false) {
        const [step, num] = deQueue(queue);
        // 각 자리수 마다 변경이 가능하므로 4번의 반복이 필요하다.
        for (let i = 0; i < 4; i++) {
            const digits = splitNum(num);
            // 0부터 9까지 시도한다.
            for (let d = 0; d < 10; d++) {
                // 각 자리수마다 원래 있던 수(digits[i])는 피해야 한다.
                if (d !== digits[i]) {
                    // 현재 자리수의 수를 변경하고,
                    digits[i] = d;
                    // 변경한 후 4자리 수를 구한다.
                    const next = joinDigits(digits);
                    // 만약 이 수가 새 비밀번호와 같다면 리턴한다.
                    // next는 deQueue된 num으로부터 1단계 다음에 도달한 수이다.
                    if (next === newPwd) return step + 1;
                    // 1,000보다 큰 소수여야 하고, 방문된 적이 없어야 한다.
                    if (next > 1000 && isPrime(next) && isVisited[next] === false) {
                        // 방문 여부를 표시하고,
                        isVisited[next] = true;
                        // 큐에 넣는다.
                        enQueue(queue, [step + 1, next]);
                    }
                }
            }
        }
    }

    // 큐가 빌 때까지, 즉 모든 경우의 수를 탐색할 때까지 리턴되지 않은 경우
    // 현재 비밀번호에서 새 비밀번호를 만들 수 없다.
    return -1;
};



/*
 * 
 * 제출한 코드
 * 주말에 복습해보기...
 * 정리가 안됨 ㅠ
 * 
 * */
const primePassword = (curPwd, newPwd) => {
    const deciArr = Array(10001).fill(true);
    deciArr[0] = false;
    deciArr[1] = false;
    //
    for (let i = 2; i <= 10001; i++) {
        let isDeci = true;
        if (deciArr[i]) {
            for (let j = 2; j <= Math.sqrt(i); j++) {
                if (i === 2 || i === 3) break;
                if (i % j === 0) {
                    isDeci = false;
                    break;
                }
            }
            if (isDeci) {
                for (let k = 2 * i; k <= 10001; k += i) {
                    deciArr[k] = false;
                }
            }
        }
    }

    let q = [[curPwd, 0]];
    while (q.length > 0) {
        const [pwd, num] = q.shift();
        if (pwd === newPwd) return num;
        for (let i = 3; i >= 0; i--) {
            // 한자리만 바꿨을 때 소수인 것들을 찾아라
            const digit = parseInt(pwd / 10 ** i) % 10;
            for (let j = 9; j !== digit, j >= 0; j--) {
                //
                let tempLeft = pwd - (digit - j) * 10 ** i;
                if (tempLeft < 1000) continue;
                if (deciArr[tempLeft]) {
                    q.push([tempLeft, num + 1]);
                    deciArr[tempLeft] = false;
                }
            }
        }
    }

    return -1;
};

/*
 * 
 * 
 * 
 */
const primePassword = (curPwd, newPwd) => {
    // TODO: 여기에 코드를 작성합니다.
    if (curPwd === newPwd) return 0;

    //소수판별용 함수
    const isPrime = (num) => {
        if (num < 2) return result;

        for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    };


    //숫자 배열화형 함수
    const destructNum = (num) => {
        return String(num)
            .split("")
            .map((e) => +e);
    };

    //숫자 재조합 함수
    const joinNumber = (numArr) => {
        return +numArr.join("");
    };

    let first = 0;
    let rear = 0;
    const queue = [];
    const enque = (target) => {
        queue.push(target);
        rear++;
    };
    const deque = () => {
        //shift는 비용이 너무 드는 작업이므로,
        //저렇게 처음과 뒤를 기록해두어 뺄 때마다 이를 기록한다.
        return queue[first++];
    };

    //번호를 바꿔서 큐에 넣다보면, 분명히 어느순간 이미 확인을 했던 내용을 또 하게 되는 경우가 생긴다 = 코스트가 비쌈
    //그것을 방지하기 위해, 한번 확인을 했던 숫자는 확인이 끝났다고 기록에 남겨두고
    //기록에 없는 내용만 돌리도록 한다.
    enque([0, curPwd]);
    const isVisited = Array(10000).fill(false);
    isVisited[curPwd] = true;

    while (first !== rear) {
        const [count, currentPass] = deque();

        for (let [idx, value] of destructNum(currentPass).entries()) {
            // forEach를 쓸 수도 있었겠지만 안쓴 이유는
            // forEach의 콜백함수 안에서 리턴을 해도, 그 콜백함수가 종료되기만 하고 return값도 어딘가 따로 담아야 하는 불편함이 생김
            // 따라서 for문을 쓴다.
            // 자릿수에 있는 것이 값이 같다면 굳이 바꿀 필요는 없으니 제외한다
            const target = destructNum(currentPass);

            for (let i = 0; i <= 9; i++) {
                if (value !== i) {
                    target[idx] = i;
                    const next = joinNumber(target);

                    //재귀 베이스
                    //각 자릿수에 있는 숫자를 0~9까지 변경해보고
                    //그게 만약 바꾸려는 숫자와 같다면, count를 하나 더에서 리턴하면 함수전체가 종료되며 카운트 리턴
                    //그게 아니라면 그냥 큐에 집어넣어서 확인시키라고 둔다
                    //만일, 이미 앞에서 자릿수 바꾼 숫자가 이미 존재해서 확인하고 트루가 되있을경우라면 큐에 넣을 필요가 없다.
                    if (next === newPwd) return count + 1;

                    if (next > 1000 && isPrime(next) && isVisited[next] === false) {
                        // 만든 조합의 숫자가 1000 이상이고, 소수인데, 체크된 적이 없다면
                        isVisited[next] = true;
                        enque([count + 1, next]);
                    }
                }
            }
        }
    }

    //다 while 다 돌려서 queue가 비었을때까지 못찾았으면 -1;
    return -1;
};

/*
 * 
 * 음......다시 정리 해보기.. 
 * 
 * 
 */

const primePassword = (curPwd, newPwd) => {
    // 소수 확인
    const isPrime = (num) => {
        if (num % 2 === 0) {
            return false;
        }
        let sqrt = parseInt(Math.sqrt(num));
        for (let i = 3; i <= sqrt; i = i + 2) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }
    // 숫자 배열로 만들어주는
    const makeNumArr = (num) => {
        let numStrArr = String(num).split('');
        return numStrArr.map((el) => Number(el));
    }
    // 숫자로 만들어주는 모듈
    const makeNum = (arr) => {
        return Number(arr.join(''));
    }
    // BFS 시작
    const check = new Array(10000).fill(false);
    check[curPwd] = true;
    const queue = [];
    queue.push([0, curPwd]);
    while (queue.length) {
        let [count, now] = queue.shift();
        if (now === newPwd) {
            return count;
        }

        for (let i = 0; i < 4; i++) {
            let nowArr = makeNumArr(now);
            for (let j = 0; j < 10; j++) {
                if (j !== nowArr[i]) {
                    nowArr[i] = j;
                    let nowNum = makeNum(nowArr);
                    if (nowNum > 1000 && isPrime(nowNum) && check[nowNum] === false) {
                        check[nowNum] = true;
                        queue.push([count + 1, nowNum]);
                    }
                }
            }
        }
    }
    return -1;
}