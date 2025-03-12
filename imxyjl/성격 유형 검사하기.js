function solution(survey, choices) {
    var answer = '';
    const typeArr = ['R', 'T', 'C', 'F', 'J', 'M', 'A', 'N'];
    const resMap = new Map();
    typeArr.forEach(type => resMap.set(type, 0));
    
    choices.forEach((score, idx)=>{
        if(score <=3){
            const type = survey[idx][0]; 
            const beforeScore = resMap.get(type);
            if(score === 1) resMap.set(type, beforeScore + 3);
            if(score === 2)resMap.set(type, beforeScore + score);
            if(score === 3) resMap.set(type, beforeScore + 1);
        }else if(score === 4){
            return;
        }else{
             const type = survey[idx][1];
             const beforeScore = resMap.get(type);
             resMap.set(type, beforeScore + score-4);
        }
    });
    
     for(let i=0; i<typeArr.length; i+=2){
        const firstScore = resMap.get(typeArr[i]);
        const secondScore = resMap.get(typeArr[i+1]);
         
         if(firstScore >= secondScore) answer += typeArr[i];
         else answer += typeArr[i+1];
    }

    
    return answer;
}
