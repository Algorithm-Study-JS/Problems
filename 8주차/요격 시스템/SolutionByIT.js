function solution(targets) {

    targets.sort((a, b) => a[1] - b[1]);

    let missile = 0, last = -1;

    targets.forEach(([start, end]) => {
        if(start >= last) {
            missile++;
            last = end;
        }
    })

    return missile;
}
