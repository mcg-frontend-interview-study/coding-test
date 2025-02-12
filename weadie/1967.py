import sys

n = int(input())

graph = [[] for _ in range(n + 1)]

for _ in range(n - 1):
    a, b, c = map(int, input().split())
    
    graph[a].append((b, c))
    graph[b].append((a, c))
    

def far(start):
    maxNode = None
    maxCost = float('-inf')
    visited = [False] * (n + 1)

    s = []
    s.append((start, 0)) # 시작과 코스트
    visited[start] = True
    
    while len(s) > 0:
        node, cost = s.pop()
        
        for v in graph[node]:
            nextNode, nextCost = v
                
            if not visited[nextNode]:
                s.append((nextNode, nextCost + cost))
                
                if maxCost < nextCost + cost:
                    maxCost = nextCost + cost
                    maxNode = nextNode

                visited[nextNode] = True
                
            
    return(maxNode, maxCost)

if n == 1:
    print(0)
    sys.exit(0)
    
p1, cost1 = far(1)

p2, cost2 = far(p1)

print(cost2)

