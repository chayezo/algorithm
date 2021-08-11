// 총 5개의 작업을 3명이서 작업한다고 가정한다.
// 첫번째 작업자는 최대 3개의 작업을 할 수 있다.
// (jobs, workersNum)으로 표기하면, (jobs는 작업량이 아닌 작업의 인덱스만 표기한다고 한다)
// 처음은 ([0, 1, 2, 3, 4], 3)인 상태이다.
//  1) 첫번째 작업자가 1개의 작업을 하고 나머지 작업을 2명이 작업
//    => ([1, 2, 3, 4], 2)
//  2) 첫번째 작업자가 2개의 작업을 하고 나머지 작업을 2명이 작업
//    => ([2, 3, 4], 2)
//  3) 첫번째 작업자가 3개의 작업을 하고 나머지 작업을 2명이 작업
//    => ([3, 4], 2)
// 아래 두 가지 경우를 통해, 문제가 중복되어 계산된다는 것을 알 수 있다.
//  1-1) 첫번째 작업자가 1개의 작업을 하고, 그 다음 작업자가 2개의 작업을 한 경우
//    => ([3, 4], 1)
//  2-1) 첫번째 작업자가 2개의 작업을 하고, 그 다음 작업자가 1개의 작업을 한 경우
//    => ([3, 4], 1)
// 메모이제이션을 통해 중복 계산을 피한다.
const jobAllocation = function (jobs, workersNum) {
    // memo[i][j]는 i번째 worker가 j번째 job부터 작업한다고 할 때,
    // 최대 작업량이 최소가 되는 분배에서의 최대 작업량을 저장한다.
    // i, j 모두 인덱스이므로 0부터 시작
    const memo = [];
    for (let i = 0; i < workersNum; i++) memo.push(Array(jobs.length).fill(-1));
    // 마지막 작업자는 남아있는 모든 작업을 다 해야하므로 쉽게 계산이 가능하다.
    // 마지막 작업자는 최대 나머지 작업자의 수만큼을 제외한 일만 할 수 있다.
    let workload = 0;
    for (let i = jobs.length - 1; i >= workersNum - 1; i--) {
        workload = workload + jobs[i];
        memo[workersNum - 1][i] = workload;
    }

    const aux = (workerIdx, jobIdx, jobs, left) => {
        // 이미 계산한 적이 있는 경우, 다시 풀지 않는다
        // 마지막 작업자의 작업량을 전부 계산했으므로, 탈출 조건을 굳이 작성하지 않아도 된다.
        if (memo[workerIdx][jobIdx] !== -1) return memo[workerIdx][jobIdx];

        let workload = 0;
        let min = Number.MAX_SAFE_INTEGER;
        for (let i = jobIdx; i < jobs.length - left; i++) {
            workload = workload + jobs[i];
            // 가장 많이 일하는 사람의 작업량을 구한다.
            const hardest = Math.max(
                workload,
                aux(workerIdx + 1, i + 1, jobs, left - 1)
            );
            // 그 작업량이 최소화되는 분배에서 최대 작업량을 구한다.
            min = Math.min(min, hardest);
        }
        memo[workerIdx][jobIdx] = min;
        return min;
    };

    return aux(0, 0, jobs, workersNum - 1);
};