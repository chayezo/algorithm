// * 제출한 코드
const insertTop = (matrix, result) => {
    for (let el of matrix[0]) {
        result += el;
    }
    matrix.shift();
    return result;
}
const insertRight = (matrix, result) => {
    for (let i = 0; i < matrix.length; i++) {
        let char = matrix[i].pop();
        result += char;
    }
    return result;
}
const insertBottom = (matrix, result) => {
    matrix[matrix.length - 1].reverse();
    for (let el of matrix[matrix.length - 1]) {
        result += el;
    }
    matrix.pop();
    return result;
}
const insertLeft = (matrix, result) => {
    for (let i = matrix.length - 1; i >= 0; i--) {
        let char = matrix[i].shift();
        result += char;
    }
    return result;
}

const spiralTraversal = function (matrix) {
    // TODO: 여기에 코드를 작성합니다.
    // 매트릭스 모양에서 윗부분을 순서대로 넣어주고
    // 오른쪽 면을 순서대로 넣어준다.
    // 그리고 바닥을 역순으로 넣어주고
    // 왼쪽면을 역순으로 넣어준다.
    let result = '';
    while (true) {
        result = insertTop(matrix, result);
        if (matrix.length === 0) break;
        result = insertRight(matrix, result);
        result = insertBottom(matrix, result);
        if (matrix.length === 0) break;
        result = insertLeft(matrix, result);
    }
    return result;
};

/*
 * 다시 생각해보기.
 */
const spiralTraversal = function (matrix, spiral = []) {
    // base case
    if (!matrix.length) {
        return spiral;
    }
    // top left to top right
    while (matrix[0].length) {
        spiral.push(matrix[0].shift());
    }
    // top right to bottom right
    matrix.forEach(row => {
        spiral.push(row.pop());
    });
    // bottom right to bottom left
    while (matrix[matrix.length - 1].length) {
        spiral.push(matrix[matrix.length - 1].pop());
    }
    // bottom left to top left
    matrix.reverse().forEach(row => {
        spiral.push(row.shift());
    });
    // reverse again 
    matrix.reverse();
    // filter out any empty arrays
    matrix = matrix.filter(el => el.length);
    // recursive case
    spiral = spiralTraversal(matrix, spiral);
    // return spiral and filter any undefined elements
    return spiral.filter(el => el);
};


/*
 * reference code
 */
const spiralTraversal = function (matrix) {
    // 각 방향마다 row와 col의 변화를 저장
    const RIGHT = [0, 1];
    const DOWN = [1, 0];
    const LEFT = [0, -1];
    const UP = [-1, 0];
    // 각 방향을 위한 lookup table
    const MOVES = [RIGHT, DOWN, LEFT, UP];
    const M = matrix.length;
    const N = matrix[0].length;
    const isValid = (row, col) => row >= 0 && row < M && col >= 0 && col < N;

    let cnt = 0;
    let row = 0,
        col = -1;
    let direction = 0;
    let result = '';
    while (cnt < M * N) {
        const move = MOVES[direction];
        const [rd, cd] = move;

        row = row + rd;
        col = col + cd;
        while (isValid(row, col) && matrix[row][col] !== false) {
            result = result + matrix[row][col];
            // 한 요소를 두 번 접근하지 않게 하기 위해서, 접근된 요소를 false로 변경한다.
            matrix[row][col] = false;
            row = row + rd;
            col = col + cd;
            cnt++;
        }
        // row, col 이 행렬의 범위를 벗어났기 때문에,
        // 진행된 방향의 반대로 한 칸 이동한다.
        row = row - rd;
        col = col - cd;

        // 각 방향이 순환되기 때문에 모듈러 연산을 사용한다.
        direction = (direction + 1) % 4;
    }
    return result;
};

/*
 *
 *
 *
 *
 */
const spiralTraversal = function (matrix) {
    let result = '';
    const check = new Array(matrix.length).fill(0).map((el) => el = new Array(matrix[0].length).fill(0));
    // = : 오류 아님

    let i = 0;
    let j = matrix[0].length - 1;
    let h = matrix.length - 1;
    let k = 0;
    while (i < matrix[0].length && j >= 0 && h >= 0 && k < matrix.length) {
        repeatFirstRow(i);
        i++;
        repeatLastCor(j);
        j--;
        repeatLastRow(h);
        h--;
        repeatFirstCor(k);
        k++;
    }
    return result;

    function repeatFirstRow(num) {
        for (let i = 0; i < matrix[num].length; i++) {
            if (check[num][i] === 0) {
                result += matrix[num][i];
                check[num][i] = 1;
            }
        }
    }
    function repeatLastCor(num) {
        for (let j = 0; j < matrix.length; j++) {
            if (check[j][num] === 0) {
                result += matrix[j][num];
                check[j][num] = 1;
            }
        }
    }
    function repeatLastRow(num) {
        for (let h = matrix[0].length - 1; h >= 0; h--) {
            if (check[num][h] === 0) {
                result += matrix[num][h];
                check[num][h] = 1;
            }
        }
    }
    function repeatFirstCor(num) {
        for (let k = matrix.length - 1; k >= 0; k--) {
            if (check[k][num] === 0) {
                result += matrix[k][num];
                check[k][num] = 1;
            }
        }
    }

};