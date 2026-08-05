import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if no Link import
    if 'import { Link' not in content and 'import { useParams, Link' not in content and 'import { Link,' not in content:
        return

    # Replace import { Link } from 'react-router-dom'
    content = re.sub(r'import\s*{\s*Link\s*}\s*from\s*[\'"]react-router-dom[\'"]\s*\n?', '', content)
    # Remove Link from other imports from react-router-dom
    content = re.sub(r'(import\s*{[^}]*?)\bLink\b\s*,?\s*([^}]*}\s*from\s*[\'"]react-router-dom[\'"])', r'\1\2', content)
    # Cleanup empty imports
    content = re.sub(r'import\s*{\s*}\s*from\s*[\'"]react-router-dom[\'"]\s*\n?', '', content)

    # Replace <Link to="..."> with <a href="...">
    content = re.sub(r'<Link\b', '<a', content)
    content = re.sub(r'</Link>', '</a>', content)
    
    # Replace to= with href= inside <a> tags
    # This is slightly tricky, we just replace all to= that belong to the <a we just created.
    # Since we replaced <Link, the remaining attributes might have 	o=". We can replace \bto= with href= 
    # but that might break if there's a prop named 	o elsewhere. But it's relatively safe in this context.
    content = re.sub(r'\bto\s*=', 'href=', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath}")

for root, dirs, files in os.walk('react-app/src'):
    for file in files:
        if file.endswith('.jsx'):
            replace_in_file(os.path.join(root, file))
