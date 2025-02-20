'''
시초가 어디서 발생할 수 있는가?

2백만 * 2백만은 말이 안된다.
2백만으로 끝나야 한다.

상대값으로 생각하자
2분에 +1마리
4분에 +1마리

증을 누적하는 거

그럼 2백만으로 끝낼 수 있다.

주어진 증대로 누적합을 계산하고 최댓값을 찾는다.

핵심: 2차원이 아닌 1차원으로 생각하는거
'''

c = int(input())
lines = []
sets = set()
for _ in range(c):
    s, e = map(int, input().split())
    lines.append((s, e))
    sets.add(s)
    sets.add(e)

# 독립좌표를 넣는다.그리고 거기의 증감을 표시하는거임
cals = sorted(list(sets))

d = {}
for i in range(len(cals) - 1):
    d[str(cals[i])] = {'v': 0, 'next': str(cals[i + 1])}
d[str(cals[len(cals) - 1])] = { 'v': 0, 'next': None }
    
for line in lines:
    s, e = line
    
    d[str(s)]['v'] += 1
    d[str(e)]['v'] -= 1
# 누적합을 반드시 구할 필요가 있나?
'''
양수면 그대로 누적
0이면 그대로 ㄱㄱ
-1 걸리면 끝

근데 추세가 111 00 11 이라면?
11 00 -1 11111111 이 있는 경우는? 앞을 무시해야함
그 반대의 경우에도 좌표가 갱신되면 안된다.
'''
sums = 0
s = 0
e = None
mc = float('-inf')
isIn = False

for i in d:
    v = d[i]['v']
    sums += v
    # 누적합이 더 크다면 모기 들어온거
    if sums > mc:
        mc = sums 
        s = i
        isIn = True
        continue

    if isIn and sums < mc:
        e = i
        isIn = False
    
print(mc)
print(s, e if e != None else cals[len(cals) - 1])
    

    
