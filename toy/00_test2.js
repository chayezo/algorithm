/*
 * 최종 제출 코드. 다 통과 ! 
 */
function test2(arr, id) {
    // TODO: 객체를 요소로 갖는 배열과 id를 입력받아, 해당 id값을 가지고 있는 객체를 리턴
    // *** 재귀 ***
    // 먼저, 각 배열의 요소를 for문으로 탐색해서
    // 그 안에 객체의 값으로 id가 있으면 요소를 리턴해주자.
    // 찾고자하는 id값을 가지고 있지 않고, 자식 노드를 가지고 있으면 자식 노드까지 탐색.
    // 자식 노드 탐색하면서 null 생각해주기 -> 추가하니까 마지막 테스트 통과.
    let result = null;
    for (let el of arr) {
        if (el.id === id) {
            return el;
        }
        else if (Array.isArray(el.children)) {
            let recursive = test2(el.children, id);
            if (recursive !== null) {
                return recursive;
            }
        }
    }
    return result;

}

/*
 * 내 코드 인데..
 * 마지막 테스트 하나 통과 안됨. 
 */
function test2(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        for (let key in arr[i]) {
            if (arr[i][key] === id) {
                return arr[i];
            }
            else if (Array.isArray(arr[i][key])) {
                return test2(arr[i][key], id);
            }
        }
    }
    return null;
}

// 2. 얘도 마지막 테스트 통과 안됨.
function test2(arr, id) {
    for (let i = 0; i < arr.length; i++) {
        // 찾는 id값을 가진 객체를 찾으면 바로 리턴.
        if (arr[i]['id'] === id) {
            return arr[i];
        }
        else {
            // 찾고자하는 id값을 가지고 있지 않고, 자식 노드를 가지고 있으면 자식 노드까지 탐색.
            if (Object.keys(arr[i]).includes('children')) {
                return test2(arr[i]['children'], id);
            }
        }
    }
    return null;
}




