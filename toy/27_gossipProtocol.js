/*
 * 제출한 코드.
 */
const createMatrix = (village) => {
  const matrix = [];
  village.forEach((line) => {
    const row = [];
    for (let i = 0; i < line.length; i++) row.push(line[i]);
    matrix.push(row);
  });
  return matrix;
};
/**
 * count(depth)를 언제 어떻게 측정할지 ***
 * 큐를 활용한 bfs
 * queue가 추가될 때마다 카운트되는 것이 아니라,
 * 4방향으로 퍼질 때 마다 카운트해준다.
 */
const gossipProtocol = function (village, row, col) {
  const DIR = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];
  let day = 0;
  const queue = [[row, col]];
  const visit = Array(village.length).fill(0).map(() => Array());
  visit[row][col] = day;

  while (queue.length !== 0) {
    const now = queue.shift();
    const [y, x] = now;
    if (visit[y][x] > day) {
      day = visit[y][x];
    }
    for (let i = 0; i < 4; i++) {
      const dy = y + DIR[i][0];
      const dx = x + DIR[i][1];
      if (dy < 0 || dx < 0 || dy >= village.length || dx >= village[0].length) continue;
      if (visit[dy][dx] || village[dy][dx] === '0') continue;
      visit[dy][dx] = visit[y][x] + 1;
      queue.push([dy, dx]);
    }
  }
  return day;
};



// reference code.
const createMatrix = (village) => {
  const matrix = [];
  village.forEach((line) => {
    const row = [];
    for (let i = 0; i < line.length; i++) row.push(line[i]);
    matrix.push(row);
  });
  return matrix;
};

const gossipProtocol = function (village, row, col) {
  // bfs 구현을 위해 큐를 선언한다.
  // enQueue, deQueue시마다 인덱싱을 다시 하지 않기 위해
  // 순환 큐(circular queue)로 구현한다.
  // queue의 가능한 최대 크기만큼 배열을 선언한다.
  // 문제의 특성에 따라 큐에는 좌표 평면의 한 점이 삽입되고, 한번 삽입된 요소는 두 번 다시 삽입되지 않는다.
  const R = village.length;
  const C = village[0].length;
  const matrix = createMatrix(village);
  const MOVES = [
    [-1, 0], // UP
    [1, 0], // DOWN
    [0, 1], // RIGHT
    [0, -1], // LEFT
  ];
  const MAX_SIZE = R * C; // 가능한 모든 좌표의 크기만큼 큐가 선언되었으므로, 사실 순환큐일 필요는 없다.
  const isValid = (row, col) => row >= 0 && row < R && col >= 0 && col < C;
  const queue = Array(MAX_SIZE);
  let front = 0;
  let rear = 0;
  const isEmpty = (queue) => front === rear;
  const enQueue = (queue, pos) => {
    // 실행 중에 큐가 가득차지는 않기 때문에 별도의 조건문을 작성할 필요가 없다.
    queue[rear] = pos;
    // 모듈러스 연산을 할 필요도 사실 없다.
    rear = (rear + 1) % MAX_SIZE;
  };
  const deQueue = (queue) => {
    const pos = queue[front];
    // 모듈러스 연산을 할 필요도 사실 없다.
    front = (front + 1) % MAX_SIZE;
    return pos;
  };

  let cnt = 0;
  enQueue(queue, [row, col]);
  // 소문이 퍼지는 데 걸리는 시간을 저장한다.
  matrix[row][col] = 0;
  while (isEmpty(queue) === false) {
    // 큐의 가장 앞 자리의 좌표를 얻는다.
    const [row, col] = deQueue(queue);
    cnt = matrix[row][col];

    // 현재 지점을 기준으로 네 방향을 검토한다.
    MOVES.forEach((move) => {
      const [rDiff, cDiff] = move;
      const nextRow = row + rDiff;
      const nextCol = col + cDiff;
      if (isValid(nextRow, nextCol) && matrix[nextRow][nextCol] === '1') {
        enQueue(queue, [nextRow, nextCol]);
        matrix[nextRow][nextCol] = matrix[row][col] + 1;
      }
    });
  }
  return cnt;
};

/*
 * 
 * BFS : 전형적인 큐를 활용한 bfs 알고리즘 문제.
 * 연결된 모든 정점들을 x로 바꾸면서 카운트를 ++ 해주면
 * 나중에 반복문이 종료되었을 때 카운트를 리턴
 * 
 * 
 * dfs는 안되는 이유 : 해당 문제에서 하루가 지날 때마다 상/우/하/좌로 한칸씩만 소문이 퍼진다.
 * 만약 dfs라면 1인 요소가 발견되었을 때 계속 이어나가면서 카운트를 올려나가기 때문에
 * 생각보다 더 큰값이 리턴된다. => dfs: 이어져 있으면, 더 깊이 들어가야지!
 */
const createMatrix = (village) => {
  const matrix = [];
  village.forEach((line) => {
    const row = [];
    for (let i = 0; i < line.length; i++) row.push(Number(line[i]));
    matrix.push(row);
  });
  return matrix;
};
// 주어진 함수 행렬(Matrix)를 만들어주는 모듈

const gossipProtocol = function (village, row, col) {
  const matrix = createMatrix(village);
  let count = 0;
  let start = [row, col, count];

  return bfs(start);

  function bfs(location) {
    const queue = [location];
    const bag = [];
    matrix[location[0]][location[1]] = 1;

    while (queue.length > 0) {
      let [Y, X, count] = queue.shift();
      if (Y < 0 || X < 0 || Y >= matrix.length || X >= matrix[0].length) continue;
      if (matrix[Y][X] === 1) {
        matrix[Y][X] = 'x';
        bag.push(count);
      } else {
        continue;
      }

      queue.push([Y - 1, X, count + 1]);
      queue.push([Y + 1, X, count + 1]);
      queue.push([Y, X - 1, count + 1]);
      queue.push([Y, X + 1, count + 1]);
    }
    return Math.max(...bag);
  }
}