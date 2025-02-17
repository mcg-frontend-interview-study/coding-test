function solution(s){
    const stack = [];
    
    for(let i=0; i<s.length; i++){
        if(s[i] === '(') stack.push(1);
        if(s[i] === ')'){
            if(stack.length === 0) return false;
            stack.pop();
        }
    }

    return stack.length === 0;
}
