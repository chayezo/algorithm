// Advanced가 포함된 레퍼런스 코드입니다.
const rockPaperScissors = function (rounds) {

    // rounds 매개변수를 임의로 넣습니다.
    // rounds 변수가 있을 경우 그대로 사용하고, 없다면 3(기본)을 사용합니다.
    rounds = rounds || 3;
    const rps = ['rock', 'paper', 'scissors'];

    // 결과를 담을 배열 선언
    const outcomes = [];

    // 재귀를 사용할 함수 선언
    // rounds를 넣을 변수 roundsToGo, 일회용 배열인 playedSoFar 변수를 선언합니다.

    // 재귀를 사용하는 이유는, 배열의 모든 요소의 경우의 수를 훑기 위한 적절한 방법이기 때문입니다.
    // 간단히 말하자면, 이 함수는 rounds 숫자를 기준으로, 일회용 배열에 rps 요소를 rounds 숫자만큼 넣게 됩니다.
    // 이 로직을 잘 이해할 수 있을 때까지 하단의 함수 로직을 연구해야 합니다.
    let permutate = function (roundsToGo, playedSoFar) {

        // rounds가 0일 경우 outcones 배열에 삽입하고, 재귀에서 빠져나옵니다.
        if (roundsToGo === 0) {
            outcomes.push(playedSoFar);
            return;
        }

        // rps 배열을 한 번씩 순회합니다.
        for (let i = 0; i < rps.length; i++) {
            // rps의 i번째 요소를 변수에 담아서
            let currentPlay = rps[i];
            // permutate(본인)에 기존 rounds에서 하나 뺀 숫자와, 일회용 배열 playedSoFar에 currentPlay를 삽입하여 재귀를 실행합니다.
            // rounds에서 하나를 빼는 이유는, 일회용 배열의 크기를 rounds만큼 맞춰주기 위함입니다. [rock, rock, rock]

            // Q. playedSoFar.push(currentPlay)로 할 수 있을 텐데, 왜 concat을 사용할까요?
            permutate(roundsToGo - 1, playedSoFar.concat(currentPlay));
            /**
             * 이 재귀의 로직은 이렇습니다. 처음 실행된 반복문은 rps를 전부 순회해야 끝이 납니다.
             * 그러나 한 번 반복할 때마다 permutate 함수가 실행되고, rounds의 숫자는 짧아지며, playedSoFar에 요소가 계속 쌓일 것입니다.
             * 결국, roundsToGo가 0이 될 때까지 이 반복문은 rps[i]가 0일 것이며, playedSoFar에는 [rock, rock, rock]이 되어 outcones에 Push하고, 종료하게 됩니다.
             * return이 되었으니, 한 번의 재귀 호출이 끝났습니다. 마지막 호출 바로 전으로 돌아가,
             * for문은 i = 1을 가리키게 될 것이고, [rock, rock, paper]을 삽입한 뒤 호출을 하게 됩니다.
             * roundsToGo가 0이 되어, 해당 배열은 outcomes 배열에 삽입됩니다.
             * 이런 식으로 모든 호출의 반복문이 끝날 때까지 반복하며 outcomes에 경우의 수 요소들이 담기게 됩니다.
             */
        }
    };

    // 함수를 실행합니다.
    permutate(rounds, []);

    // outcomes를 반환합니다.
    return outcomes;
};

const rockPaperScissors = function (rounds) {
    // TODO: Your code here!
    rounds = rounds || 3;

    let status = ['rock', 'paper', 'scissors']
    let allCases = []
    let arr = []

    function Recursive(currnum) {
        if (currnum >= num) {
            allCases.push(arr.slice())
        } else {
            for (let i = 0; i < status.length; i++) {
                arr.push(status[i])
                Recursive(currnum + 1)
                arr.pop(status[i])
            }
        }
        return
    }

    Recursive(0)

    return allCases
}

const rockPaperScissors = function (rounds) {
    rounds = rounds || 3;
    let status = ['rock', 'paper', 'scissors'];
    let result = [];

    // m = 일회용 배열
    // rounds 숫자를 기준으로 일회용 배열에 status 요소를 rounds 숫자만큼 넣는다.
    function recur(m = []) {
        // rounds가 = 0인경우
        // 일회용 배열에 삽입하고 재귀탈출
        if (m.length === rounds) {
            result.push(m);
            return;
        }
        // status 배열 순회
        // 반복할때마다 rounds의 숫자는 짧아지고
        // m 일회용배열에 요소가 계속 쌓임
        for (let i = 0; i < status.length; i++) {
            let copy = m.slice();
            copy.push(status[i]);
            recur(copy);
        }
    }
    recur();
    return result;
}