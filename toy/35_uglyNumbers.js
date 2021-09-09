// 제출한 코드. (O(n))
const uglyNumbers = function (n) {
  // ugly number는 2, 3, 5로만 나누어 떨어지는 수
  // 그럼 result에 들어있는 수들에 2, 3, 5를 곱해서 나오는 수들은 전부 uglyNumber가 될수 있음
  // result의 0번째 인덱스 : 1, 반복문으로 2, 3, 5를 곱하면서 인덱스 더하기
  // 오름차순 -> 대소 비교하면서
  const result = [1];
  let idx2 = 0, idx3 = 0, idx5 = 0;

  while (result.length < n) {
    const two = 2 * result[idx2];
    const three = 3 * result[idx3];
    const five = 5 * result[idx5];
    const minNum = Math.min(two, three, five);
    result.push(minNum);

    if (minNum === two) idx2++;
    if (minNum === three) idx3++;
    if (minNum === five) idx5++;
  }
  return result[n - 1];
};

const uglyNumbers = function (n) {
  // TODO: 여기에 코드를 작성합니다.
  const uglyNumbers = [1];
  let twos = 2;
  let threes = 3;
  let fives = 5;
  let idx2 = 0, idx3 = 0, idx5 = 0;

  for (let i = 1; i < n; i++) {
    uglyNumbers[i] = Math.min(twos, threes, fives);
    if (uglyNumbers[i] === twos) {
      idx2++;
      twos = uglyNumbers[idx2] * 2;
    }
    if (uglyNumbers[i] === threes) {
      idx3++;
      threes = uglyNumbers[idx3] * 3;
    }
    if (uglyNumbers[i] === fives) {
      idx5++;
      fives = uglyNumbers[idx5] * 5;
    }
  }
  return uglyNumbers[uglyNumbers.length - 1];
};

// not advanced.
const uglyNumbers = function (n) {
  // TODO: 여기에 코드를 작성합니다.
  const isUgly = (num) => {
    num = recur(num, 2);
    num = recur(num, 3);
    num = recur(num, 5);
    return num === 1;
  };

  const recur = (num, factor) => {
    while (num % factor === 0) num = num / factor;
    return num;
  };
  let num = 0;
  let count = 0;
  while (n > count) {
    num++;
    if (isUgly(num)) count++;
  }
  return num;
};

/*
 * O(n)
 * ugly number는 2, 3, 5로만 나누어 떨어지는 수이다.
 * 1은 1번째 ugly number 이다.
 * 
 */
const uglyNumbers = function (n) {
  // TODO : ugly numbers 중 n번째 수를 리턴
  // 매번 나눗셈 연산을 하는 것이 비효율적이기 때문에
  // 이미 구한 수에서부터 구해준다.
  const uglyNumbers = [1];
  let idx2 = 0;
  let idx3 = 0;
  let idx5 = 0;

  // 1. 가장 작은 수인 1에 2, 3, 5를 곱한 수 중에 가장 작은 수를 구한다.
  // 2. 2가 선택됨.
  // 3. 2는 가장 작은 수 1에 곱해졌으므로
  //   3.1. 이제 2는 그 다음 작은 수인 2에 곱해진다.
  //   3.2. 3, 5는 여전히 가장 작은 수에 곱해진다.
  // 4. 3에서 가장 작은수는 3. 3은 이제 다음으로 작은 수인 2에 곱해진다.
  // 5. 반복한다.
  for (let i = 0; i < n; i++) {
    const nextMultipleOf2 = uglyNumbers[idx2] * 2;
    const nextMultipleOf3 = uglyNumbers[idx3] * 3;
    const nextMultipleOf5 = uglyNumbers[idx5] * 5;
    const nextUglyNum = Math.min(
      nextMultipleOf2,
      nextMultipleOf3,
      nextMultipleOf5
    );
    uglyNumbers.push(nextUglyNum);

    // 같은 수를 중복해서 저장할 수 있기 때문에
    // 각각 별도의 조건문으로 작성해야 한다.
    // 2 * 3 = 6
    // 3 * 2 = 6
    if (nextUglyNum === nextMultipleOf2) idx2++;
    if (nextUglyNum === nextMultipleOf3) idx3++;
    if (nextUglyNum === nextMultipleOf5) idx5++;
  }
  return uglyNumbers[n - 1];
};

