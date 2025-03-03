const fs = require("fs");
const [input, ...rest] = fs.readFileSync(0, "utf8").trim().split("\n");

const [n, m] = input.split(" ").map(Number);
const farms = Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }).fill(0));

rest.forEach((line) => {
  let [x, y, l, f] = line.split(" ").map(Number);
  x++;
  y++;

  for (let i = x; i < x + l; i++) {
    for (let j = y; j < y + l; j++) {
      farms[i][j] = f;
    }
  }
});

const prefixSumBySeed = Array.from({ length: 8 }, () =>
  Array.from({ length: n + 1 }, () => Array.from({ length: n + 1 }).fill(0))
);

// 씨앗 별 누적합 구하기
for (let seed = 0; seed < 8; seed++) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      prefixSumBySeed[seed][i][j] =
        prefixSumBySeed[seed][i][j - 1] +
        prefixSumBySeed[seed][i - 1][j] -
        prefixSumBySeed[seed][i - 1][j - 1] +
        (farms[i][j] === seed ? 1 : 0);
    }
  }
}

// 특정 씨앗의 범위 누적합 구하는 함수
const getPrefixSumBySeed = (seed, a, b, c, d) => {
  const sum = prefixSumBySeed[seed];
  return sum[c][d] - sum[c][b - 1] - sum[a - 1][d] + sum[a - 1][b - 1];
};

// k * k 최댓값
let answer = 0;

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= n; j++) {
    // 특정 좌표가 0이라면 스킵
    if (farms[i][j] === 0) continue;

    let left = 1;
    let right = n;

    while (left < right) {
      let mid = Math.floor((left + right + 1) / 2);

      let a = i;
      let b = j;
      let c = i + mid - 1;
      let d = j + mid - 1;

      if (c > n || d > n) {
        right = mid - 1;
        continue;
      }

      if (getPrefixSumBySeed(0, a, b, c, d)) {
        right = mid - 1;
        continue;
      }

      let cnt = 0;
      for (let seed = 1; seed < 8; seed++) {
        if (getPrefixSumBySeed(seed, a, b, c, d) > 0) cnt++;
      }

      if (cnt <= 2) left = mid;
      else right = mid - 1;
    }

    answer = Math.max(answer, right * right);
  }
}

console.log(answer);
