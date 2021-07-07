// 제출한 내 코드.
const balancedBrackets = function (str) {
    // TODO: 여기에 코드를 작성합니다.
    // stack
    // open: 0,2,4 --- close: 1,3,5
    const compareArr = '(){}[]';
    // edge case
    if (str === '') return true;
    if (str.length % 2 !== 0) return false;

    const stack = [];
    for (let i in str) {
        let compareIdx = compareArr.indexOf(str[i]);
        if (compareIdx % 2 === 0) {
            // 짝수(open)라면
            // 클로즈 해줘야함
            stack.push(compareIdx + 1);
        } else {
            // 홀수(close)라면
            // 이전값이랑 인덱스랑 같지 않으면
            if (stack.pop() !== compareIdx) return false;
        }
    }
    if (stack.length === 0) return true;
};



/*
 * reference code.
 * 1. naive solution
 * 2. 
 * 
 * * --- 수도 코드 --- * 
 * str[i]가 opener이면 stack 에 넣고
 * str[i]가 closer이면
 * 1. stack에서 마지막 요소를 제거하고 이를 top이라고 한다.
 * 2. top과 str[i]가 짝이 맞으면 true를 반환한다.
 * 즉, stack에 쌓이는 것은 opener이고, str[i]가 closer일 때에는 이 closer가 stack에 가장 마지막에 넣은 요소와 짝이 맞는지 확인한다.
 * 결과적으로 stack에 아무것도 남지 않게 되면 true 리턴.
 * 
 */
const balancedBrackets = function (str) {
    const stack = [];
    const opener = '(';
    const closer = ')';

    for (let i = 0; i < str.length; i++) {
        if (str[i] === opener) {
            stack.push(str[i]);
        } else if (str[i] === closer) {
            const top = stack.pop();
            if (top !== opener) {
                return false;
            }
        }
    }

    return stack.length === 0;
};

const balancedBrackets = function (str) {
    const stack = [];
    const opener = {
        '{': '}',
        '[': ']',
        '(': ')',
    };
    const closer = '}])';

    for (let i = 0; i < str.length; i++) {
        if (str[i] in opener) {
            stack.push(str[i]);
            // closer가 나오면 opener와 짝이 맞는지 확인하기 위해 
        } else if (closer.includes(str[i])) {
            // 가장 마지막에 넣은 opener를 꺼내서 top이라고 해준다.
            const top = stack.pop();
            // 꺼낸 opener(top)에 해당하는 closer를 pair라고 할 때
            const pair = opener[top];
            // 그 pair가 입력받은 closer(str[i])가 아니라면
            if (pair !== str[i]) {
                // 바로 false를 반환하고 for문을 나온다.
                return false;
            }
        }
    }
    // stack이 비었다면 true 반환
    return stack.length === 0;
};