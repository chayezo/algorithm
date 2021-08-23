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
 * 제출한 코드 2.
 * 
 */
const rotateMatrix = function (matrix, k) {
    // TODO: 세로와 가로의 길이가 각각 M, N인 2차원 M X N 배열을 시계방향으로 90도씩 K번 회전시킨 배열을 리턴
    // 회전수 ->
    // k 4로 나눴을 때 나머지가 1, 2, 3, 0
    // 1 :
    //   90도 회전 후의 배열 : result
    //   matrix의 한 요소 길이가 result 배열의 길이
    //   그 길이만큼 빈배열
    //   이중 반복문으로 요소를 하나하나 90도 회전한 위치에 넣어준다.
    //   matrix는 0번째 요소부터 추출하지만 result에서는 끝에서부터 채워지므로
    //   일단 result에 0부터 채워넣은 다음 reverse를 해준다!(이 문제의 포인트)****    
    // 2 : matrix reverse 두번
    // 3 : 1의 결과를 reverse 두번
    // 0 : matrix 그대로
    if (matrix.length === 0) return [];
    let result = [];
    for (let i = 0; i < matrix[0].length; i++) {
        result.push([]);
    }
    for (let j = 0; j < matrix[0].length; j++) {
        for (let k = 0; k < matrix.length; k++) {
            // matrix의 세로 방향 요소들을 result의 가로방향 요소들로 import
            result[j].push(matrix[k][j]);
        }
        // 그리고 result의 요소들은 reverse 해준다.
        result[j].reverse();
    } // 90도 돌렸을 때 result 배열 만들기.

    if (k % 4 === 0) {
        return matrix;
    }
    else if (k === undefined || k % 4 === 1) {
        return result;
    }
    else if (k % 4 === 2) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].reverse(); // 행렬의 각 요소를 reverse
        }
        matrix.reverse(); // 행렬 전체도 reverse
        return matrix;
    }
    else {
        for (let i = 0; i < result.length; i++) {
            result[i].reverse();
        }
        result.reverse();
        return result;
    }
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