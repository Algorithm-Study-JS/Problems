function solution(number, k) {

    let removed = 0, stack = [];
    
    for(let i = 0; i < number.length; i++) { 
        while(stack.length > 0 && removed < k && stack[stack.length - 1] < number[i]) {
            stack.pop();
            removed++;
        }
        stack.push(number[i]);
    }
    
    while(removed < k) {
        stack.pop();
        removed++;
    }
    
    return stack.join("");
}
