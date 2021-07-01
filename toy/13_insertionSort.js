// 제출한 advanced 코드.
const insertionSort = function (arr, callback = (temp) => temp) {
    // TODO: 배열을 입력받아 오름차순으로 정렬
    // 삽입 정렬 구현
    for (let i = 1; i < arr.length; i++) {
        let temp = arr[i];
        let aux = i - 1;

        while (aux >= 0 && callback(arr[aux]) > callback(temp)) {
            arr[aux + 1] = arr[aux];
            aux--;
        }
        arr[aux + 1] = temp;
    }
    return arr;
};
// 제출한 naive code  
const insertionSort = function (arr) {
    // TODO: 배열을 입력받아 오름차순으로 정렬
    // 삽입 정렬 구현
    let result = [...arr];

    // 모든 배열의 두번째 숫자부터 끝까지
    for (let i = 1; i < arr.length; i++) {
        // 위치를 찾아 넣을 대상
        let temp = result[i];
        // 대상이 있는 위치의 앞의 위치
        let aux = i - 1;
        // 배열 요소가 0보다 같거나 크고, 왼쪽 값(대상의 앞)이 더 클 때마다 계속해서 바꿔나간다.
        while (aux >= 0 && result[aux] > temp) {
            // 다음 위치에 대상의 앞 숫자를 삽입
            result[aux + 1] = result[aux];
            // 인덱스 한칸 앞으로
            aux--;
        }
        // 대상이 대상의 앞 숫자랑 같거나 크다면, 대상의 다음에 숫자를 넣어준다.
        result[aux + 1] = temp;
    }
    return result;
};


// 2번
function insertionSort(items) {
    for (i = 0; i < items.length; i++) {
        let value = items[i];
        for (let j = i - 1; j > -1 && items[j] > value; j--)
            items[j + 1] = items[j];

        items[j + 1] = value;
    }

    return items;
}

// naive solution
// const insertionSort = function (arr) {
//   let sorted = [arr[0]];
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] >= sorted[i - 1]) {
//       sorted.push(arr[i]);
//     } else {
//       for (let j = 0; j < i; j++) {
//         if (arr[i] <= sorted[j]) {
//           const left = sorted.slice(0, j);
//           const right = sorted.slice(j);
//           sorted = left.concat(arr[i], right);
//           break;
//         }
//       }
//     }
//   }

//   return sorted;
// };

// reference code : advanced
const insertionSort = function (arr, transform = (item) => item) {
    let sorted = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        if (transform(arr[i]) >= transform(sorted[i - 1])) {
            sorted.push(arr[i]);
        } else {
            for (let j = 0; j < i; j++) {
                if (transform(arr[i]) <= transform(sorted[j])) {
                    const left = sorted.slice(0, j);
                    const right = sorted.slice(j);
                    sorted = left.concat(arr[i], right);
                    break;
                }
            }
        }
    }

    return sorted;
};
