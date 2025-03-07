const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split('\n');

const money = Number(input[0]);
const rateList = input[1].split(' ').map(Number);

const jun = () =>{
    let curMoney = money;
    let stockCount = 0;

    rateList.forEach((rate)=>{
        const gainable = stockCount * rate;

        if(curMoney + gainable >= rate){
            curMoney += gainable;
            stockCount = 0;
        }
        while(curMoney >= rate){
            curMoney -= rate;
            stockCount++;
        }
    });
    return curMoney + rateList.at(-1) * stockCount;
};

const sung = () =>{
     let curMoney = money;
    let stockCount = 0;

    const getState = (idx) =>{
        if(rateList[idx-1] === rateList[idx]) return 0;
        
        if(rateList[idx-2] < rateList[idx-1] && rateList[idx-1] < rateList[idx]) return 1;
        else if(rateList[idx-2] > rateList[idx-1] && rateList[idx-1] > rateList[idx]) return -1;
        else return 0;
    }

    for(let i=3; i<rateList.length; i++){
        const state = getState(i-1);
        if(state === 1 && stockCount > 0){ // 매도 
            curMoney += rateList[i] * stockCount;
            stockCount = 0;
        }
        if(state===-1){ // 매수
            while(curMoney >= rateList[i]){
                curMoney -= rateList[i];
                stockCount++
            }
        }
    }

    return curMoney + stockCount * rateList.at(-1);
};

const Sung = sung();
const Jun = jun();
if(Sung === Jun) console.log("SAMESAME");
if(Sung > Jun) console.log("TIMING");
if(Sung < Jun) console.log("BNP");
