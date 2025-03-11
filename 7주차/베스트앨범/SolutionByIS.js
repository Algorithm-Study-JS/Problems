class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this.heap.sort((a, b) => {
      if (b[1] === a[1])
        // 같은 재생 수일 때: 고유 번호 오름차순
        return a[0] - b[0];
      return b[1] - a[1]; // 디폴트: 재생 횟수 내림차순
    });
  }

  pop() {
    return this.heap.shift();
  }

  size() {
    return this.heap.length;
  }
}

function solution(genres, plays) {
  let answer = [];

  let genreMap = new Map(); // 장르별 총 재생 횟수
  let songMap = new Map(); // 장르별 노래 목록

  for (let i = 0; i < genres.length; i++) {
    let genre = genres[i];
    let playCount = plays[i];

    // 장르별 총 재생 횟수
    genreMap.set(genre, (genreMap.get(genre) || 0) + playCount);

    // 장르별 노래 저장
    if (!songMap.has(genre)) {
      songMap.set(genre, new MaxHeap());
    }
    songMap.get(genre).push([i, playCount]); // [고유번호, 재생횟수]
  }

  let sortedGenres = [...genreMap.entries()].sort((a, b) => b[1] - a[1]);

  for (let [genre, count] of sortedGenres) {
    let heap = songMap.get(genre);

    for (let i = 0; i < 2 && heap.size() > 0; i++) {
      answer.push(heap.pop()[0]); // 고유번호 push
    }
  }

  return answer;
}
