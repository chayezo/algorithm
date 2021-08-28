/*
* 제출한 코드.
*/

const LSCS = function (arr) {
  // 연속된 부분들의 합 중 가장 큰 값을 리턴 !
  // 시간 복잡도 O(n) => 이중 반복문 사용하지 말자
  // sum에 0을 할당해주고,
  // max를 arr[0]으로 할당하고 arr의 요소를 모두 더해주고
  // 음수를 만나면 최대값을 max에 담아준 상태에서 sum을 0으로 만들어준다.
  // 그리고 다시 sum을 구해준다.
  let max = arr[0];
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    max = Math.max(max, sum);
    if (sum < 0) sum = 0;
  }
  return max;
};

const LSCS = function (arr) {
  // 음수가 더해지면 더이상 최대값이 아니고, 음수를 더하기 직전 값이 최대값
  // => 음수가 나오기 전까지의 수를 더한 값이 최대값
  // max에 할당해주고 음수가 나오면 합을 0으로 만들어주고 계속 더해가자.
  let max = -100000;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (sum > max) {
      max = sum;
    }
    if (sum < 0) {
      sum = 0;
    }
  }
  return max;
};

// LSCS: 주어진 배열의 연속된 부분 배열의 합을 구한다고 할 때, 이 중 가장 큰 값(Largest Sum of Contiguous Subarray)
// 연속 부분 배열 ex) [1,2,3] => [1], [2], [3], [1,2], [2,3], [1,2,3]
const LSCS = function (arr) {
  let sumItem = 0;
  let max = Number.MIN_SAFE_INTEGER;
  // JavaScript에서 안전한 최소 정수값 (-(253 - 1)) 음수가 나올 수 있으므로 가장 안전한 수를 max에 우선 넣어주기

  for (let i = 0; i < arr.length; i++) {
    // 연속 부분 배열의 합 중 제일 큰 값을 찾는 값이므로 합을 찾기 위해 더해준다.
    sumItem = sumItem + arr[i];
    //만약 더한 값 중 제일 큰 값을 반환해야하므로 max라는 변수에 따로 빼둔다.
    if (max < sumItem) max = sumItem;
    // 만약 더한 값이 음수가 된다면 다음 값에 더해도 작아지므로 끊어주기!
    if (sumItem < 0) sumItem = 0
  }
  //최종적으로 제일 큰 값을 담은 max를 리턴해준다!
  return max;
}

/*
 * reference code.
 */

// naive solution: O(N^2)
const LSCS = function (arr) {
  let max = -100000;
  for (let i = 0; i < arr.length; i++) {
    let sum = arr[i];
    if (sum > max) max = sum;
    for (let j = i + 1; j < arr.length; j++) {
      sum = sum + arr[j];
      if (sum > max) max = sum;
    }
  }
  return max;
};

// dynamic programming: O(N)
const LSCS = function (arr) {
  let subArrSum = 0; // 연속 배열의 합
  let max = Number.MIN_SAFE_INTEGER; // 정답의 후보를 저장
  for (let i = 0; i < arr.length; i++) {
    subArrSum = subArrSum + arr[i];
    if (subArrSum > max) max = subArrSum;

    // 연속된 구간의 합이 음수인 경우,
    // 해당 부분은 버리고 다시 시작해도 된다.
    if (subArrSum < 0) {
      subArrSum = 0;
    }
  }

  return max;
};

// also dynamic 2: O(N)
const LSCS = function (arr) {
  let subArrSum = arr[0];
  let max = arr[0]; // 정답의 후보를 저장
  for (let i = 1; i < arr.length; i++) {
    // subArrSum는 바로 직전의 요소까지 검토했을 때 가장 연속합
    // 연속합에 추가로 검토하는 요소, 즉 arr[i]를 더하는 것보다
    // arr[i] 하나의 값이 더 큰 경우 (subArrSum가 음수일 경우)
    // subArrSum를 버리는 게 좋다.
    // 쭉 더해서 음수인 부분은 굳이 더할 필요가 없다.
    subArrSum = Math.max(subArrSum + arr[i], arr[i]);
    max = Math.max(max, subArrSum);
  }

  return max;
};