const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map((x) => +x);
const n = input[0];
const findLocationNumber = input[1];
const findLocation = [];
const grid = [];

// 격자 만들기
for (let row = 0; row < n; row++) {
  const arr = [];
  for (let column = 0; column < n; column++) {
    arr.push(1);
  }
  grid.push(arr);
}

// 달팽이 그리기
const rotation = (n - 1) / 2;
const center = [Math.floor(n / 2), Math.floor(n / 2)];
// let start = [Math.floor(n/2) - 1, Math.floor(n/2)];
let endLocation = [Math.floor(n / 2), Math.floor(n / 2)];
let endNumber = 1;
for (let number = 1; number <= rotation; number++) {
  // number이 1이면 row column = 2까지만 가능함.
  if (findLocationNumber === endNumber)
    findLocation.push(endLocation[0], endLocation[1]);
  // 윗쪽
  for (let column = endLocation[1]; column <= center[1] + number; column++) {
    endNumber += 1;
    if (findLocationNumber === endNumber)
      findLocation.push(endLocation[0] - 1, column);
    grid[endLocation[0] - 1][column] = endNumber;
  }
  endLocation = [endLocation[0] - 1, center[1] + number];

  // 오른쪽
  for (let row = endLocation[0] + 1; row <= center[0] + number; row++) {
    endNumber += 1;
    if (findLocationNumber === endNumber)
      findLocation.push(row, endLocation[1]);
    grid[row][endLocation[1]] = endNumber;
  }
  endLocation = [center[0] + number, endLocation[1]];

  // 아랫쪽
  for (
    let column = endLocation[1] - 1;
    column >= center[1] - number;
    column--
  ) {
    endNumber += 1;
    if (findLocationNumber === endNumber)
      findLocation.push(endLocation[0], column);
    grid[endLocation[0]][column] = endNumber;
  }
  endLocation = [endLocation[0], center[1] - number];

  // 왼쪽
  for (let row = endLocation[0] - 1; row >= center[0] - number; row--) {
    endNumber += 1;
    if (findLocationNumber === endNumber)
      findLocation.push(row, endLocation[1]);
    grid[row][endLocation[1]] = endNumber;
  }
  endLocation = [center[0] - number, endLocation[1]];
}

grid.map((x) => console.log(x.join(' ')));
console.log(findLocation[0] + 1, findLocation[1] + 1);
