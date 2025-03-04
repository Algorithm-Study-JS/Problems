function solution(order) {
    let idx = 0, result = 0;
    let queue = 1;
    let stack = [];

    while (queue <= order.length || stack.length > 0) {
        if (queue <= order.length && queue === order[idx]) {
            result++;
            idx++;
            queue++;
        }
        else if (stack.length > 0 && stack[stack.length - 1] === order[idx]) {
            stack.pop();
            result++;
            idx++;
        }
        else if (queue <= order.length) {
            stack.push(queue);
            queue++;
        }
        else {
            break;
        }
    }

    return result;
}
