function solution(n, k, enemy) {
    let idx = 0, len = enemy.length;

    while(idx <= len) {
        let mid = Math.floor((idx + len) / 2);
        if(check(n, k, mid, enemy)) idx = mid + 1;
        else len = mid - 1;
    }

    return idx - 1;
}

const check = (n, k, mid, enemy) => {
    if (mid <= k) return true;

    let t = enemy.slice(0, mid).sort((a, b) => b - a);
    let sum = 0;

    for (let i = k; i < t.length; i++) {
        sum += t[i];
        if (sum > n) return false;
    }
    
    return true;

}
