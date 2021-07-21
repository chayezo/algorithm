/*
 * 제출한 코드.
 * 
 */
const robotPath = function (room, src, dst) {
    // 세로 M 가로 N <=20
    // 1: 장애물 0: 이동이 가능한 통로
    // robot: 일분에 한칸씩 상하좌우 이동
    // TODO: 목표지점까지 도달하는데 걸리는 최소 시간 -> dfs..bfs.. 완전 탐색인데 

    const visit = Array(room.length).fill(0).map(() => Array());
    const queue = [[...src, 1]];
    visit[src[0]][src[1]] = 1;
    const DIR = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];
    const ny = room.length - 1;
    const nx = room[0].length - 1;

    while (queue.length !== 0) {
        let result = queue.shift();
        let [y, x, cnt] = result;
        for (let i = 0; i < 4; i++) {
            let dy = y + DIR[i][0];
            let dx = x + DIR[i][1];
            if (dx < 0 || dy < 0 || dx > nx || dy > ny) continue;
            if (room[dy][dx] === 1) continue;
            if (visit[dy][dx]) continue;
            visit[dy][dx] = 1;
            queue.push([dy, dx, cnt + 1]);
            if (dy === dst[0] && dx === dst[1]) return result[2];
        }
    }
};

/*
 * reference code.
 */
const robotPath = function (room, src, dst) {
    const aux = (M, N, candi, step) => {
        // 현재 위치
        const [row, col] = candi;

        // 배열의 범위를 벗어난 경우
        if (row < 0 || row >= M || col < 0 || col >= N) return;

        if (room[row][col] === 0 || room[row][col] > step) {
            room[row][col] = step;
        } else {
            // 장애물(1)이거나 이미 최소 시간(1)으로 통과가 가능한 경우
            return;
        }

        // dfs로 4가지 방향에 대해 탐색을 한다.
        // 완전탐색을 해야하므로 bfs나 dfs가 큰 차이가 없다.
        // bfs의 경우 목적지에 도착하는 경우 탐색을 중단해도 되므로,
        // 약간 더 효율적이다.
        aux(M, N, [row + 1, col], step + 1); // 상
        aux(M, N, [row - 1, col], step + 1); // 하
        aux(M, N, [row, col - 1], step + 1); // 좌
        aux(M, N, [row, col + 1], step + 1); // 우
    };

    // 로봇이 서 있는 위치를 1로 초기화하면 (다시 방문하지 않기 위해서),
    // 바로 옆 통로는 2가 된다.
    // 계산이 완료된 후에 최종값에 1을 빼주면 된다.
    aux(room.length, room[0].length, src, 1);

    const [r, c] = dst;
    return room[r][c] - 1;
};