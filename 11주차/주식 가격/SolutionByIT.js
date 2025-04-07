function solution(prices) {
    const answer = new Array(prices.length).fill(0);
    const stack = [];

    for (let i = 0; i < prices.length; i++) {
        while (stack.length > 0 && prices[stack[stack.length - 1]] > prices[i]) {
            const idx = stack.pop();
            answer[idx] = i - idx;
        }
        stack.push(i);
    }

    while (stack.length > 0) {
        const idx = stack.pop();
        answer[idx] = prices.length - 1 - idx;
    }

    return answer;
}
