function solution(jobs) {
    class MinHeap{
        constructor(){
            this.h = [];
        }
        size(){
            return this.h.length;
        }
        swap(idx1, idx2){
            [this.h[idx1], this.h[idx2]] = [this.h[idx2], this.h[idx1]];
        }
        add(v){
            this.h.push(v);
            this.bubbleU();
        }
        remove(){
            if(this.h.length === 0) return null;
            if(this.h.length === 1) return this.h.pop();
            
            const toRemove = this.h[0];
            this.h[0] = this.h.pop();
            this.bubbleD();
            return toRemove;
        }
        bubbleU(){
            let curIdx = this.h.length -1;
            let pIdx = Math.floor((curIdx - 1) /2);
            
            while(this.h[pIdx] && this.h[pIdx][1] > this.h[curIdx][1]){
                this.swap(pIdx, curIdx); 
                curIdx = pIdx;
                pIdx = Math.floor((curIdx - 1)/2 );
            }
        }
        bubbleD(){
            let curIdx = 0;
            let leftIdx = curIdx * 2 +1;
            let rightIdx = curIdx * 2 + 2;
            
            while(
                (this.h[leftIdx]  && this.h[leftIdx][1] < this.h[curIdx][1])
                ||
                (this.h[rightIdx] && this.h[rightIdx][1] < this.h[curIdx][1])
            ){
                let smallerIdx = leftIdx;
                if(this.h[rightIdx] && this.h[rightIdx][1] < this.h[leftIdx][1]){
                    smallerIdx = rightIdx;
                }
                
                this.swap(curIdx, smallerIdx);
                curIdx = smallerIdx;
                leftIdx = curIdx * 2 + 1;
                rightIdx = curIdx * 2 + 2;
            }
        }
    }
    
    let jobIdx = 0;
    let sum = 0;
    const minH = new MinHeap();
    let curTime = 0;
    
    jobs.sort((a,b) => a[0] - b[0]);
    
    while(jobIdx < jobs.length){ 
        // 현재 실행 가능한 것들을 넣음
        while(jobIdx< jobs.length && jobs[jobIdx][0] <= curTime){
            minH.add(jobs[jobIdx]);
            jobIdx++;
        }
        
        // 우선순위에 맞게 작업 추출
        // 작업할 것이 있는 경우 
        if(minH.size() > 0){
            const [reqTime, spendTime] = minH.remove();
            const turnTime = curTime + spendTime - reqTime;
            sum += turnTime;
            curTime += spendTime;
        }else{
            curTime++;
        }
    }

    return Math.floor(sum / jobs.length);
}
