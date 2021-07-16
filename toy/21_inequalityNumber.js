const inequalityNumber = function (signs) {
    // TODO: 부등호 기호들을 입력받아 부등호를 만족하는 최대 부등호 수와 최소 부등호 수의 차이를 리턴
    // 부등호 기호 : string => 배열 타입으로 변환해서 활용
    // 배열 순서대로 부등호가 조건에 부합하는지 확인하는 함수를 만들어서 재귀 호출
    const aux = (index, signs, nums, digits, isVisited) => {
        if (index === signs.length) {
            return parseInt(nums.join(''));
        }
        const sign = signs[index];
        for (let i = 0; i < digits.length; i++) {
            const right = digits[i];
            if (isVisited[right]) continue;
            if (index >= 0) {
                const left = nums[nums.length - 1];
                if (sign === '<' && left >= right) continue;
                if (sign === '>' && left <= right) continue;
            }
            isVisited[right] = true;
            const target = aux(index + 1, signs, nums.concat(right), digits, isVisited);
            if (target !== undefined) {
                return target;
            }
            isVisited[right] = false;
        }
        return undefined;
    };
    signs = signs.split(' ');
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const min = aux(-1, signs, [], digits, Array(10).fill(false));
    const max = aux(-1, signs, [], digits.reverse(), Array(10).fill(false));
    return max - min;
};

/*
 * Reference Code
 * 
 */
const inequalityNumber = function (signs) {
    const aux = (idx, signs, nums, digits, isVisited) => {
        if (idx === signs.length) {
            // 부등호 수를 만든 경우
            return parseInt(nums.join(''));
        }

        const sign = signs[idx];
        for (let i = 0; i < digits.length; i++) {
            // 숫자를 차례대로 검토한다.
            // max를 구할 때는 9부터, min을 구할 때는 0부터
            const right = digits[i];
            // 이전 단계에서 사용한 숫자인 경우 스킵
            if (isVisited[right]) continue;

            // 첫번째 숫자가 아닌 경우에는 조건이 중요하다.
            if (idx >= 0) {
                // 항상 바로 직전의 숫자와 비교하면 된다.
                const left = nums[nums.length - 1];
                if (sign === '<' && left >= right) continue;
                if (sign === '>' && left <= right) continue;
            }

            // 조건을 만족하거나 첫번째 숫자인 경우
            isVisited[right] = true;
            const target = aux(idx + 1, signs, nums.concat(right), digits, isVisited);
            if (target !== undefined) {
                // 부등호 수를 이미 찾은 경우 탐색을 더 할 필요가 없다.
                return target;
            }
            // 탐색에 실패한 경우, 시도한 숫자의 상태(사용중)를 원래대로(사용안함) 바꿔놔야 한다.
            isVisited[right] = false;
        }

        return undefined;
    };

    signs = signs.split(' ');
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // arr.reverse()는 in-place 함수(데이터 직접 변경)이므로 min과 max의 순서는 중요하다.
    const min = aux(-1, signs, [], digits, Array(10).fill(false));
    const max = aux(-1, signs, [], digits.reverse(), Array(10).fill(false));
    return max - min;
};