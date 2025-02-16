function solution(s){
    const stack = [];
    
    for(let i=0; i<s.length; i++){
        if(s[i] === '(') stack.push(1);
        if(s[i] === ')'){
            if(stack.pop() === undefined) return false;
            stack.pop();
        }
    }

    return stack[0] === undefined;
}
