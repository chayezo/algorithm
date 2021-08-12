/*
 * 제출한 코드.
 * dfs
 */
const countIslands = function (grid) {
    if (grid.length === 0) return 0;

    let numIslands = 0;
    const rowCount = grid.length;
    const colCount = grid[0].length;

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            if (grid[i][j] === '0') continue;
            numIslands++;
            dfs(i, j);
        }
    }
    function dfs(row, col) {
        if (row < 0 || row >= rowCount || col < 0 || col >= colCount) return;
        if (grid[row][col] === '0') return;
        grid[row][col] = '0';
        dfs(row - 1, col);
        dfs(row + 1, col);
        dfs(row, col - 1);
        dfs(row, col + 1);
    }
    return numIslands;
};

// bfs
const countIslands = grid => {
    let numIslands = 0;
    const queue = [];

    const row = grid.length;
    const col = grid[0].length;

    const dirs = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] == '1') {
                numIslands++;
                bfs(i, j);
            }
        }
    }

    function bfs(i, j) {
        queue.push([i, j]);

        while (queue.length !== 0) {
            const [r, c] = queue.shift();
            if (r < 0 || c < 0 || c >= col || r >= row) continue;
            if (grid[r][c] === '0') continue;
            grid[r][c] = '0';

            for (let [x, y] of dirs) {
                if (grid[r + x] && grid[r + x][c + y] === '1') {
                    queue.push([r + x, c + y]);
                }
            }
        }
    }
    return numIslands;
};

// reference code.
const countIslands = function (grid) {
    // dfs solution
    const HEIGHT = grid.length;
    const WIDTH = HEIGHT && grid[0].length;
    let count = 0;

    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            if (grid[row][col] === '0') continue;
            count++;
            searchIsland(row, col);
        }
    }

    function searchIsland(row, col) {
        if (row < 0 || col < 0 || row >= HEIGHT || col >= WIDTH) return;
        if (grid[row][col] === '0') return;

        grid[row][col] = '0';
        searchIsland(row - 1, col);
        searchIsland(row + 1, col);
        searchIsland(row, col - 1);
        searchIsland(row, col + 1);
    }

    return count;
};

