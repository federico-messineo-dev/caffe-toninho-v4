import re

with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Find all rules with background-color that are not vars or dark
# Look for white-ish colors
matches = re.findall(r'[^{}]*?background-color\s*:\s*[^;}]+;?[^}]*}', css, re.DOTALL)
for m in matches:
    m = m.strip()
    # Check for white or light colors
    if any(c in m.lower() for c in ['white', '#fff', '#f3e8d8', '#f5f', '#f3e8d8', 'var(--black', 'var(--white']):
        print(m)
        print('---')
