function solution(p) {
    if (p === "") return "";

    let u = "", v = "", balance = 0;

    for (let i = 0; i < p.length; i++) {
        if (p[i] === '(') balance++;
        else balance--;

        u += p[i];
        
        if (balance === 0) {
            v = p.slice(i + 1);
            break;
        }
    }

    if (isValid(u)) {
        return u + solution(v);
    } else {
        let result = "(" + solution(v) + ")";
        u = u.slice(1, u.length - 1);
        result += reverse(u);
        return result;
    }
}

function isValid(str) {
    let balance = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(') balance++;
        else balance--;

        if (balance < 0) return false;
    }
    return balance === 0;
}

function reverse(s) {
    let result = "";
    for (let i = 0; i < s.length; i++) {
        result += s[i] === '(' ? ')' : '(';
    }
    return result;
}
