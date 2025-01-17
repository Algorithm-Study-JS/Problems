function solution(p) {
    // u랑 v로 쪼개기
    const splitting = (str) => {
        let openCount = 0, closeCount = 0;
        let splittingIndex = -1;
        
        for(const ch of str) {
            ch === "(" ? openCount++ : closeCount++;
            
            if(openCount === closeCount) {
                splittingIndex = openCount + closeCount;
                break;
            }
        }
            
        const u = str.slice(0, splittingIndex);
        const v = str.slice(splittingIndex, str.length);
        
        return [u, v];
    }
    
    // 올바른 괄호 문자열인가
    const isCorrect = (str) => {
        // 바로 닫는 괄호 나오면 불가능
        if(str[0] === ')') return false;
        
        const stack = [str[0]];
        
        for(let i = 1; i < str.length; i++) {
            // 여는 괄호가 남아있지 않으면 불가능
            if(stack.length === 0) return false;
            
            if(str[i] === "(") stack.push("(");
            else stack.pop();
        }
        
        return stack.length === 0;
    }
    
    const operation = (str) => {
        // 빈 문자열이면
        if(str === "") return "";
        
        const [u, v] = splitting(str);
        
        // u가 올바르다면
        if(isCorrect(u)) {
            return u + operation(v);
            
        // u가 올바르지 않다면
        } else {
            const sliced = u.slice(1, u.length - 1);
            const reversed = sliced.split("").map((el) => el === "(" ? ")" : "(").join("");
            
            return "(" + operation(v) + ")" + reversed;
        }
    }
    
    return operation(p);
}
