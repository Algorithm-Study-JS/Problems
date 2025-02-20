function hanoi(answer, k, cur, sub, main) {
    if (k === 1) {
        answer.push([cur, main]);
        return;
    }

    hanoi(answer, k - 1, cur, main, sub);
    answer.push([cur, main]);
    hanoi(answer, k - 1, sub, cur, main);
}

function solution(n) {
    let answer = [];
    hanoi(answer, n, 1, 2, 3);
    return answer;
}
