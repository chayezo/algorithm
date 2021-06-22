// * ........
// * 생각보다 어렵진 않은데, 어렵다,,,,뭔소리야

const sudoku = function (board) {
    // TODO: 가로와 세로의 길이가 모두 9인 2차원 배열을 리턴
    // 아홉 가로줄, 세로줄, 3X3 칸에 1에서 9까지의 숫자를 중복되지 않게 한 번씩만 넣으면 됩니다.
    // 값이 0인 자리는 아직 숫자가 입력 되지 않은 칸
    const N = board.length; // board의 길이를 설정.
    const boxes = [
        // 3 x 3을 표현하기 위해 box 배열을 선언해준다. 
        [0, 0, 0, 1, 1, 1, 2, 2, 2],
        [0, 0, 0, 1, 1, 1, 2, 2, 2],
        [0, 0, 0, 1, 1, 1, 2, 2, 2],
        [3, 3, 3, 4, 4, 4, 5, 5, 5],
        [3, 3, 3, 4, 4, 4, 5, 5, 5],
        [3, 3, 3, 4, 4, 4, 5, 5, 5],
        [6, 6, 6, 7, 7, 7, 8, 8, 8],
        [6, 6, 6, 7, 7, 7, 8, 8, 8],
        [6, 6, 6, 7, 7, 7, 8, 8, 8],
    ];
    // 행과 열의 값으로 box의 값을 가져온다.
    const getBoxNum = (row, col) => boxes[row][col];

    const blanks = []; // 비어있는 (값이 0인) 칸의 위치값이 저장.
    const rowUsed = []; // n번째 행에 m이라는 숫자가 존재하는 지의 여부가 true, false로 저장.
    const colUsed = []; // i번째 행에 m이라는 숫자가 존재하는 지의 여부가 true, false로 저장.
    const boxUsed = []; // j번째 박스에 m이라는 숫자가 존재하는 지의 여부가 true, false로 저장.

    for (let row = 0; row < N; row++) {
        rowUsed.push(Array(N + 1).fill(false)); // 모든 값을 false로 초기화한다.
        colUsed.push(Array(N + 1).fill(false));
        boxUsed.push(Array(N + 1).fill(false));
    }

    for (let row = 0; row < N; row++) {
        // 행과 열을 board의 길이만큼 순회해준다.
        for (let col = 0; col < N; col++) {
            if (board[row][col] === 0) {
                // 2차원 배열을 순회하면서 특정 위치의 값이 0이라면,
                // 해당 위치(행,열)를 blanks 배열에 추가해준다. (나중에 재귀를 통해 blanks에 저장되어 있는 위치들을 하나씩 탐색.)
                blanks.push([row, col]);
            } else { // *********** board[행,열]이 값을 가지고 있다면,
                // 해당 값을 가져오고,
                const num = board[row][col];
                // box 번호도 가져오고,
                const box = getBoxNum(row, col);
                // 해당 행,열, box에 해당 값이 있다는 것을 표시해준다.
                rowUsed[row][num] = true;
                colUsed[col][num] = true;
                boxUsed[box][num] = true;
            }
        }
    }

    // =============================== 여기까지가 이미 입력된 board에 대한 초기 셋팅.
    // =============================== 지금부터는 본격적인 로직.

    // isValid 함수를 선언해준다리.
    // row번째 행, col번째 열, box에 num을 입력이 가능한 지 확인한다.
    const isValid = (row, col, num) => {
        const box = getBoxNum(row, col); // box 값을 가져오고
        return (
            rowUsed[row][num] === false && // 해당 행에 num가 없으면, ==> 해당 행에 num을 입력할 수 있고
            colUsed[col][num] === false && // 해당 열에 num을 입력할 수 있고
            boxUsed[box][num] === false // 해당 box에 num을 입력할 수 있으면, num은 입력이 가능한 숫자(true 리턴). 셋 중 하나라도 false라면 false가 리턴된다.
        );
    };

    // toggleNum 함수를 선언.
    // board에 num을 입력해주고, 해당 행,열,box의 num에 대한 값이 true면 false로, false면 true로 바꿔준다.
    // ??? 입력이 가능한 숫자인 줄 알았다가 나중에 확인해보니 아닌 경우도 있기 때문에 ....toggle 형식으로 구현을 해준다.
    const toggleNum = (row, col, num) => {
        const box = getBoxNum(row, col);
        // 실제적으로 board에 값을 입력하는 부분.
        board[row][col] = num;
        rowUsed[row][num] = !rowUsed[row][num];
        colUsed[col][num] = !colUsed[col][num];
        boxUsed[box][num] = !boxUsed[box][num];
    };

    // 재귀적으로 호출이 될 보조함수를 선언.
    const aux = (idx, blanks, board) => {
        // blank 배열의 모든 요소를 탐색했을 때, 즉 모든 탐색이 끝났을 때 true를 리턴.
        if (idx === blanks.length) {
            return true;
        }

        // 비어 있는(0으로 채워진) 자리의 위치값을 *구조분해할당*을 통해 row와 col 변수에 할당해준다.
        const [row, col] = blanks[idx];

        // 1~9의 숫자를 순회하며 비어 있는 자리에 num을 입력할 수 있는 지 확인한다.
        for (let num = 1; num <= 9; num++) {
            // isValid하면, 즉 num을 해당 행,열,box에 입력이 가능하다면
            if (isValid(row, col, num) === true) {
                // toggleNum 함수를 통해 board에 num을 입력 !
                toggleNum(row, col, num);
                // 다음으로 비어 있는 칸을 조회하기 위한 재귀적 호출. true 리턴 시(blanks의 모든 요소를 탐색 완료했을 시) true를 리턴.
                if (aux(idx + 1, blanks, board) === true) {
                    return true;
                }
                // 재귀함수가 false를 리턴했을 시, true였던 값을 모두 false 처리해주고 그 다음 숫자 입력 !
                toggleNum(row, col, num);
            }
        }
        // 1~9의 숫자가 모두 입력이 불가능 할 시에, false 리턴한다 ~~~~~! 
        // 그렇다면 이전으로 돌아가 toggleNum 함수를 호출하여 true였던 값을 false로 바꿔주고, 그 다음 숫자를 선택해 탐색을 진행. 반복반복 재귀재귀
        return false;
    };

    aux(0, blanks, board); // 최초 함수를 실행하는 부분. 인덱스 0, blanks, board를 인자로 전달한다.
    return board; // 최종 스도쿠 판을 리턴.


};
