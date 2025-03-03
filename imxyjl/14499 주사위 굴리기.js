const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');
const [n, m, x, y, k] = input[0].split(' ').map(Number);

const bd = input.slice(1, n + 1).map(row => row.split(' ').map(Number));
const cmd = input[input.length - 1].split(' ').map(Number);

const dice = Array(6).fill(0);
const DICE_INFO = { front: 0, back: 1, top: 2, bottom: 3, west: 4, east: 5 };
const CMD_INFO = { north: 3, west: 2, east: 1, south: 4 };

const move = (x, y, cmd) => {
    switch (cmd) {
        case CMD_INFO.north: return [x - 1, y];
        case CMD_INFO.west: return [x, y - 1];
        case CMD_INFO.east: return [x, y + 1];
        case CMD_INFO.south: return [x + 1, y];
    }
};

const isMoveable = (x, y, cmd) => {
    switch (cmd) {
        case CMD_INFO.north: return x - 1 >= 0;
        case CMD_INFO.west: return y - 1 >= 0;
        case CMD_INFO.east: return y + 1 < m;
        case CMD_INFO.south: return x + 1 < n;
        default: return false;
    }
};

const rollDice = (cmd) => {
    let temp = [...dice]; 

    switch (cmd) {
        case CMD_INFO.north:
            dice[DICE_INFO.top] = temp[DICE_INFO.front];
            dice[DICE_INFO.front] = temp[DICE_INFO.bottom];
            dice[DICE_INFO.bottom] = temp[DICE_INFO.back];
            dice[DICE_INFO.back] = temp[DICE_INFO.top];
            break;
        case CMD_INFO.south:
            dice[DICE_INFO.top] = temp[DICE_INFO.back];
            dice[DICE_INFO.back] = temp[DICE_INFO.bottom];
            dice[DICE_INFO.bottom] = temp[DICE_INFO.front];
            dice[DICE_INFO.front] = temp[DICE_INFO.top];
            break;
        case CMD_INFO.west:
            dice[DICE_INFO.top] = temp[DICE_INFO.east];
            dice[DICE_INFO.east] = temp[DICE_INFO.bottom];
            dice[DICE_INFO.bottom] = temp[DICE_INFO.west];
            dice[DICE_INFO.west] = temp[DICE_INFO.top];
            break;
        case CMD_INFO.east:
            dice[DICE_INFO.top] = temp[DICE_INFO.west];
            dice[DICE_INFO.west] = temp[DICE_INFO.bottom];
            dice[DICE_INFO.bottom] = temp[DICE_INFO.east];
            dice[DICE_INFO.east] = temp[DICE_INFO.top];
            break;
    }
};


let curX = x, curY = y;
cmd.forEach(cmd => {
    if (!isMoveable(curX, curY, cmd)) return;

    rollDice(cmd);
    [curX, curY] = move(curX, curY, cmd);

    if (bd[curX][curY] === 0) {
        bd[curX][curY] = dice[DICE_INFO.bottom];
    } else {
        dice[DICE_INFO.bottom] = bd[curX][curY];
        bd[curX][curY] = 0;
    }

    console.log(dice[DICE_INFO.top]);
});
