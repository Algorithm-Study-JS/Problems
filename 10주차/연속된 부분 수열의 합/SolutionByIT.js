function solution(sequence, k) {
    let start = 0, sum = 0, result = [-1, -1], minLength = Infinity;

    for (let end = 0; end < sequence.length; end++) {
        sum += sequence[end];

        while (sum >= k) {
            if (sum === k && (end - start) < minLength) {
                minLength = end - start;
                result = [start, end];
            }
            
            sum -= sequence[start++];
        }
    }

    return result;
}
