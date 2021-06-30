# 너비 우선 탐색(Breadth-first search, BFS)
<br>
<img src=https://media.vlpt.us/images/513sojin/post/fac1b4e5-c8c5-4d05-9e98-0bb3fb0534e7/bfs.png>
<img src=https://t1.daumcdn.net/cfile/tistory/997183445C7625B921>
<br>
<br>

**그래프 탐색이란?**<br>
*하나의 정점에서 시작해서 그래프의 모든 정점들을 한번씩 탐색하는 것*.<br>

<br>

**BFS**는 *그래프* 전체를 탐색하는 방법 중 하나.<br>

루트 노드 (혹은 다른 임의의 노드)에서 시작해서 인접한 노드를 먼저 탐색하는 방법.<br>
시작 정점으로부터 가까운 정점을 먼저 방문하고 멀리 떨어져 있는 정점을 나중에 방문하는 순회방법.<br>
종이에 먹물이 퍼지는 것과 같음.<br>
즉, 깊게(*deep*) 탐색하기 전에 넓게(*wide*) 탐색한다 !<br>
BFS가 진행될수록 탐색 범위는 출발점에서 멀어진다.<br>

**주로 두 노드 사이의 최단 경로 혹은 임의의 경로를 찾고 싶을 때 사용하는 방법**이다. (최단경로, 길찾기)<br>
방문한 노드들을 차례대로 저장한 후 꺼낼 수 있는 자료구조인 **Queue**를 사용한다.

Queue는 **선입선출(FIFO, Fisrt In First Out)** 자료구조.<br>
먼저 들어온 것이 먼저 나간다. *고속도로 톨게이트*를 생각하자.

- 특징
  - 재귀적으로 동작하지 않는다.
  - 어떤 노드를 방문했었는지 여부를 반드시 검사해야 한다.<br>
    -> 검사하지 않을 경우 무한루프에 빠질 위험이 있다.

- 장점
  - 로직이 단순하다.
  - 최초 발견 루트를 최단 경로라고 보장할 수 있다.
  - 노드의 숫자가 적고, 깊이가 얕은 경우 -> 단순검색속도가 DFS보다 빠르다.
- 단점
  - 비교적 많은 저장 공간이 필요하다.

## BFS 알고리즘 구현방식
큐를 활용해서 구현.<br>

<img src=https://gmlwjd9405.github.io/images/algorithm-dfs-vs-bfs/bfs-example.png>
<br>

1. a노드(시작 노드)를 방문. / 방문한 노드 체크
   - 큐에 방문한 노드를 삽입. `enqueue`
   - 초기 상태의 큐에는 시작 노드만 저장되어 있다.
     - 즉, a노드의 이웃 노드를 모두 방문한 다음에 이웃의 이웃들을 방문한다 !
2. 큐에서 꺼낸 노드와 인접한 노드들을 모두 차례대로 방문.
   - 큐에서 꺼낸 노드를 방문
   - 큐에서 꺼낸 노드와 인접한 노드들을 방문
     - 인접한 노드가 없다면 큐의 앞에서 노드를 꺼낸다. `dequeue`
   - 큐에 방문된 노드를 삽입. `enqueue`
3. 큐가 다 소진될 때까지 반복.   

```js
let bfs = function (node) {
    // TODO: 노드의 탐색을 treeBFS 탐색 순으로 배열에 담아내자
    let result = [];
    let queue = [node]; // 조회할 노드를 순차적으로 넣는다.

    // 조회할 노드가 없을때까지
    while (queue.length) {
        let target = queue.shift();
        result.push(target.value);
        // 자식 노드들을 순차적으로 queue에 쌓아준다.
        for (let i in target.children) {
            queue.push(target.children[i])
        }

    }
    return result;
};
// 이 아래 코드는 변경하지 않아도 됩니다. 자유롭게 참고하세요.
let Node = function (value) {
    this.value = value;
    this.children = [];
};

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리입니다.
// membership check(중복 확인)를 따로 하지 않습니다.
Node.prototype.addChild = function (child) {
    this.children.push(child);
    return child;
};
```

## 너비 우선 탐색(BFS)의 시간 복잡도
- 인접 리스트로 표현된 그래프 : O(N+E)
- 인접 행렬로 표현된 그래프 : O(N^2)
- 깊이 우선 탐색(DFS)과 마찬가지로 그래프 내에 적은 숫자의 간선만을 가지는 `희소 그래프(Sparse Graph)`의 경우 인접 행렬보다 인접 리스트를 사용하는 것이 유리하다.
