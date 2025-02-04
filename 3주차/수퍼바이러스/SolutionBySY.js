const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const lines = [];

rl.on('line', (line) => {
    lines.push(line.split(" ").map(BigInt));
}).on('close', () => {
    let [k, p, n] = lines[0];
    const MOD = 1000000007n;

    // 모듈러 거듭제곱 알고리즘
    // base는 곱해주는 값
    // exp는 곱해주는 횟수
    const modPow = (base, exp, mod) => {
        let result = 1n;

        // 지수가 0이 아닐때까지
        while(exp > 0) {
            // 지수가 홀수면 한번만 곱해주기
            if(exp % 2n === 1n) {
                result *= base;
                result %= mod;
            }

            // base를 제곱
            base **= 2n;
            base %= mod;

            // exp를 절반으로
            exp /= 2n;
        }

        return result;
    }

    const exp = n * 10n;
    const pow = modPow(p, exp, MOD);
    const result = (k % MOD * pow) % MOD;

    console.log(result.toString());
});
