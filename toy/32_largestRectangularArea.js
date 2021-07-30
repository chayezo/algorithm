const largestRectangularArea = function (histogram) {
    // 구간트리 => 가장 작은 값의 '인덱스'를 구하기 위한 구간트리를 만들어보자
    const createMinTree = (arr, ts, te) => {
        if (ts === te) return { idx: ts, val: arr[ts] };

        const mid = parseInt((ts + te) / 2);
        const left = createMinTree(arr, ts, mid);
        const right = createMinTree(arr, mid + 1, te);

        return {
            val: Math.min(left.val, right.val),
            idx: left.val < right.val ? left.idx : right.dix,
            left,
            right,
        };
    };
    const tree = createMinTree(histogram, 0, histogram.length - 1);

    // 특정 구간에서도 가장 작은 값의 인덱스를 뽑을 수 있는 모듈
    const getMinIdx = (ts, te, rs, re, tree) => {
        if (rs <= ts && te <= re) return tree.idx;
        if (te < rs || re < ts) return rs;

        const mid = parseInt((ts + te) / 2);
        const left = getMinIdx(ts, mid, rs, re, tree.left);
        const right = getMinIdx(mid + 1, te, rs, re, tree.right);
        return histogram[left] < histogram[right] ? left : right;
    };
    // 1. 구간 중, 가장 작은 막대를 찾는다.
    // 2. 작은 막대의 높이를 기준으로 구간 길이를 곱해서 사각형 만든다. => 후보
    // 3. 작은 막대를 기준으로 왼쪽 오른쪽 나눈다.
    // 4. 첫번째 후보와 왼쪽 , 오른쪽 후보 중 가장 큰 값 리턴
    // 5. 4의 왼쪽 후보와 오른쪽 구간 후보는 각각 1~4과정을 거친 값 => 재귀
    const getRangeArea = (start, end) => {
        if (start > end) return 0;

        const midIdx = getMinIdx(0, histogram.length - 1, start, end, tree);
        return Math.max(
            (end - start + 1) * histogram[midIdx],
            getRangeArea(start, midIdx - 1),
            getRangeArea(midIdx + 1, end)
        );
    };
    return getRangeArea(0, histogram.length - 1);
}






  // 시간 초과됨...
  // const largestRectangularArea = function (histogram) {
  //   // 높이를 기준으로 해서 밑변을 늘려 넓이를 구해본다.
  //   // 다음 막대의 높이가 기준 높이보다 낮으면, 기준을 낮은 막대의 높이로 바꾼다.
  //   let largestArea = 0;
  //   for(let start = 0; start < histogram.length; start++) {
  //     // 기준 : 높이
  //     let baseHeight = histogram[start];

  //     for(let end = start; end < histogram.length; end++) {
  //       if(histogram[end] < baseHeight) {
  //         baseHeight = histogram[end];
  //       }
  //       let area = baseHeight * (end - start + 1);
  //       // 높이 * 가로 : 넓이
  //       if(area > largestArea) {
  //         largestArea = area;
  //       }
  //     }
  //   }
  //   return largestArea;
  // };
