'''
주어진 시작 + 1 에서 끝 의 sum을 구하면 된다.

누적합을 구한다.
1 3 6 7 9 12 ...

좌표를 이동시킨다. 
사이클있는지 확인한다.
사이클이 없으면 그냥 sum
사이클이 있으면 left, right, cycle로 

'''

def getSums(arr):
    sums = [arr[0]]
    
    for i in range(1, len(arr)):
        sums.append(sums[i - 1] + arr[i])
        
    return sums

def getNormalized(a, b, p):
    a -= 1
    b -= 1
    
    diff = abs(a - b)
    
    if a >= 0: 
        if a > p - 1:
            na = a
            while True:
                if na <= p - 1:
                    break

                na -= p

            return na, na + diff
        else:
            return a, b    

    na = a
    while True:
        if na >= 0:
            break
            
        na += p
    
    return na, na + diff

def nz(v, p):
    return v % p
    
p = int(input())
lst = list(map(int, input().split()))
ll, rr = map(int, input().split())

sums = getSums(lst)
l, r = getNormalized(ll, rr, p)

# 오버플러
if r > p - 1:
    left = sums[p - 1] - sums[l]
    cycle = (r - l) // p
    
    right = sums[nz(r, p)]
    print(left + right + sums[p - 1] * cycle)
else:
    print(sums[r] - sums[l])
