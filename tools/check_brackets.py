import sys
from pathlib import Path
p=Path('data.js')
s=p.read_text(encoding='utf-8')
pairs={'(':')','[':']','{':'}'}
opens=set(pairs.keys())
closes=set(pairs.values())
stack=[]
for idx,ch in enumerate(s, start=1):
    if ch in opens:
        stack.append((ch, idx))
    elif ch in closes:
        if not stack:
            print('UNEXPECTED_CLOSE', ch, 'at', idx)
            sys.exit(1)
        last, pos = stack[-1]
        if pairs[last] != ch:
            print('MISMATCH', last, 'opened at', pos, 'but closed by', ch, 'at', idx)
            sys.exit(1)
        stack.pop()
if stack:
    last,pos=stack[-1]
    print('UNCLOSED', last, 'opened at', pos)
    sys.exit(2)
print('BRACKETS_OK')
