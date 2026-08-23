import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # 1. replace react-router-dom imports
    # Handle specific imports
    if 'from \'react-router-dom\'' in content or 'from "react-router-dom"' in content:
        content = re.sub(r'import\s+\{([^}]+)\}\s+from\s+[\'"]react-router-dom[\'"]', 
                         lambda m: handle_router_imports(m.group(1)), 
                         content)

    # 2. replace <Link to="..."> with <Link href="...">
    content = re.sub(r'<Link([^>]+)to=', r'<Link\1href=', content)
    content = re.sub(r'<NavLink([^>]+)to=', r'<Link\1href=', content) # fallback
    content = re.sub(r'</NavLink>', r'</Link>', content)

    # 3. Add use client to any file using hooks if not present
    hooks = ['useState', 'useEffect', 'useRef', 'usePathname', 'useParams']
    if any(hook in content for hook in hooks) and '"use client"' not in content and "'use client'" not in content:
        content = '"use client";\n' + content

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

def handle_router_imports(imports_str):
    imports = [i.strip() for i in imports_str.split(',')]
    res = []
    if 'Link' in imports or 'NavLink' in imports:
        res.append("import Link from 'next/link';")
    
    nav_imports = []
    if 'useParams' in imports:
        nav_imports.append('useParams')
    if 'useLocation' in imports:
        nav_imports.append('usePathname') # not perfect but a start
    
    if nav_imports:
        res.append(f"import {{ {', '.join(nav_imports)} }} from 'next/navigation';")
        
    return '\n'.join(res)

for root, _, files in os.walk('app'):
    for f in files:
        if f.endswith('.jsx'):
            process_file(os.path.join(root, f))

for root, _, files in os.walk('components'):
    for f in files:
        if f.endswith('.jsx'):
            process_file(os.path.join(root, f))
