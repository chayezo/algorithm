/*
 * 기본 코드 (여기에 advanced 추가해야함)
 * 테스트 12개 중에 8개 통과.
 */
const rotateMatrix = function (matrix) {
    // TODO: 2차원 N x N 배열을 시계 방향으로 90도 회전시킨 배열
    // 그냥 배열의 위치를 재정의 해주면 된다.
    // 배열을 만들어서 안에 넣어주자.
    let result = [];
    let m = matrix.length;
    let n = matrix[0] && matrix[0].length;
    for (let i = 0; i < n; i++) {
        let newArr = [];
        for (let j = m - 1; j >= 0; j--) {
            newArr.push(matrix[j][i]);
        }
        result.push(newArr);
    }
    return result;
};

/*
 * 제출한 코드.
 * advanced까지 통과.
 */
const rotateMatrix = function (matrix, k = 1) {
    if (matrix.length === 0) return matrix;
    for (let i = 0; i < k; i++) {  // k번 실행
        matrix = rotate(matrix);
    }
    return matrix;
};

const rotate = (matrix) => {
    let result = [];
    for (let i = 0; i < matrix[0].length; i++) {
        let newArr = [];
        for (let j = matrix.length - 1; j >= 0; j--) {
            newArr.push(matrix[j][i]);
        }
        result.push(newArr);
    }
    return result;
};

/*
 * reference code
 */
// const rotateMatrix = function (matrix) {
//   const N = matrix.length;
//   const M = matrix[0] && matrix[0].length;
//   let output = [];

//   for (let row = 0; row < M; row++) {
//     output[row] = [];
//     for (let col = 0; col < N; col++) {
//       output[row][col] = matrix[N - col - 1][row];
//     }
//   }

//   return output;
// };

const rotateMatrix = function (matrix, rotateNum = 1) {
    // rotateNum 이 0일 수 있으므로 아래와 같은 초기화는 지양해야 함
    // rotateNum = rotateNum || 1
    const N = matrix.length;
    // 빈 배열을 입력받을 수 있다.
    const M = matrix[0] && matrix[0].length;

    rotateNum = rotateNum % 4;
    // 회전하지 않는다.
    if (rotateNum === 0) return matrix;

    const rotated = [];
    // 홀수번 회전 시 M x N, 짝수번 회전 시 N x M
    const RC = rotateNum % 2 === 1 ? [M, N] : [N, M];

    for (let row = 0; row < RC[0]; row++) {
        rotated[row] = [];
        for (let col = 0; col < RC[1]; col++) {
            if (rotateNum === 1) rotated[row][col] = matrix[N - col - 1][row];
            else if (rotateNum === 2)
                rotated[row][col] = matrix[N - row - 1][M - col - 1];
            else rotated[row][col] = matrix[col][M - row - 1];
        }
    }

    return rotated;
};
/*
 * 공부해보기 !
 */
const rotateMatrix = function (matrix, k = 1) {
    // ----------------------------------------------------------- Bare Minimum
    // const result = new Array(matrix.length).fill(0).map((el) => el = new Array(matrix.length).fill(0));

    // for(let i=0; i<matrix.length; i++) {
    //   for(let j=0; j<matrix.length; j++) {
    //     result[i][j] = matrix[matrix.length-j-1][i];
    //   }
    // }

    // return result;


    // ------------------------------------------------------------ Advanced
    let num = k % 4;
    let result = [];

    if (matrix.length === 0) {
        return result;
    }

    if (num === 0) {
        result = matrix;
    }

    else if (num === 1) {
        result = new Array(matrix[0].length).fill(0).map((el) => el = new Array(matrix.length).fill(0));
        for (let i = 0; i < matrix[0].length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                result[i][j] = matrix[matrix.length - j - 1][i];
            }
        }
    }

    else if (num === 2) {
        result = new Array(matrix.length).fill(0).map((el) => el = new Array(matrix[0].length).fill(0));
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                result[i][j] = matrix[matrix.length - i - 1][matrix[0].length - j - 1];
            }
        }
    }

    else if (num === 3) {
        result = new Array(matrix[0].length).fill(0).map((el) => el = new Array(matrix.length).fill(0));
        for (let i = 0; i < matrix[0].length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                result[i][j] = matrix[j][matrix[0].length - i - 1];
            }
        }
    }

    return result;
};