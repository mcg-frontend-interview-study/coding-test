const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const n = Number(input[0]);
const bd = input.slice(1).map(line => line.split(' ').map(Number));

const getMax = (bd) => Math.max(...bd.flat());

// 한 줄을 왼쪽으로 이동 & 합치는 함수
const moveRow = (row) => {
    let filtered = row.filter(num => num !== 0);
    let newRow = Array(n).fill(0);
    let index = 0;

    for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
            newRow[index++] = filtered[i] * 2;
            i++; 
        } else {
            newRow[index++] = filtered[i];
        }
    }

    return newRow;
};

const moveUp = (board) => {
    let newBoard = Array.from({ length: n }, () => Array(n).fill(0));

    for (let j = 0; j < n; j++) {
        let col = [];
        for (let i = 0; i < n; i++) {
            if (board[i][j] !== 0) col.push(board[i][j]);
        }

        let newCol = moveRow(col);
        for (let i = 0; i < n; i++) {
            newBoard[i][j] = newCol[i];
        }
    }
    return newBoard;
};

const moveDown = (board) => {
    let newBoard = Array.from({ length: n }, () => Array(n).fill(0));

    for (let j = 0; j < n; j++) {
        let col = [];
        for (let i = n - 1; i >= 0; i--) {
            if (board[i][j] !== 0) col.push(board[i][j]);
        }

        let newCol = moveRow(col);
        newCol.reverse(); // 아래쪽에서 쌓이므로 뒤집어야 함
        for (let i = 0; i < n; i++) {
            newBoard[i][j] = newCol[i];
        }
    }
    return newBoard;
};

const moveLeft = (board) => {
    let newBoard = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        newBoard[i] = moveRow(board[i]);
    }

    return newBoard;
};

const moveRight = (board) => {
    let newBoard = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        let reversedRow = [...board[i]].reverse(); // 오른쪽 이동을 위해 뒤집기
        let newRow = moveRow(reversedRow);
        newBoard[i] = newRow.reverse(); // 다시 원래 방향으로 돌려놓기
    }

    return newBoard;
};

let max = 0;
const dfs = (depth, board) => {
    max = Math.max(max, getMax(board));
    if (depth === 5) return;

    let moves = [moveUp, moveDown, moveLeft, moveRight];
    for (let move of moves) {
        let newBoard = move(board.map(row => [...row])); // 깊은 복사
        dfs(depth + 1, newBoard);
    }
};

dfs(0, bd);
console.log(max);
