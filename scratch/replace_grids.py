import os
import re

files_to_update = [
    r"c:\Users\jasva\Nadhebe\src\pages\use-cases\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\tools\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\tag\[tag].astro",
    r"c:\Users\jasva\Nadhebe\src\pages\reviews\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\prompts\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\news\[...page].astro",
    r"c:\Users\jasva\Nadhebe\src\pages\guides\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\frameworks\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\comparisons\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\case-studies\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\best-practices\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\tutorials\index.astro",
    r"c:\Users\jasva\Nadhebe\src\pages\youtube\index.astro"
]

def find_matching_div(html, start_pos):
    pos = start_pos
    depth = 0
    while pos < len(html):
        next_open = html.find("<div", pos)
        next_close = html.find("</div>", pos)
        
        if next_open == -1 and next_close == -1:
            break
            
        if next_open != -1 and (next_close == -1 or next_open < next_close):
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            pos = next_close + 6
            if depth == 0:
                return next_close + 6
    return -1

for file_path in files_to_update:
    if not os.path.exists(file_path):
        print(f"Skipping {file_path} (does not exist)")
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Update imports
    frontmatter_match = re.search(r"^---\n(.*?)\n---", content, re.DOTALL)
    if not frontmatter_match:
        print(f"Could not find frontmatter in {file_path}")
        continue
        
    frontmatter = frontmatter_match.group(1)
    
    # Clean up old imports
    frontmatter_lines = frontmatter.split("\n")
    new_lines = []
    for line in frontmatter_lines:
        if "VerdictGauge" in line or "getArticleUrl" in line:
            continue
        new_lines.append(line)
    
    rel_path = "../../components/FeedList.astro"
    new_lines.insert(2, f"import FeedList from '{rel_path}';")
    
    new_frontmatter = "\n".join(new_lines)
    content = content.replace(frontmatter, new_frontmatter)
    
    # 2. Find grid block and replace it
    grid_start_match = re.search(r'<div class="grid grid-cols-[^>]+>', content)
    if not grid_start_match:
        print(f"Could not find grid container start in {file_path}")
        continue
        
    start_pos = grid_start_match.start()
    end_pos = find_matching_div(content, start_pos)
    if end_pos == -1:
        print(f"Could not find matching closing div for grid in {file_path}")
        continue
        
    grid_block = content[start_pos:end_pos]
    
    # Identify which posts list to pass
    posts_var = "sorted"
    if "news" in file_path:
        posts_var = "page.data"
    elif "tag" in file_path or "use-cases" in file_path or "tools" in file_path or "frameworks" in file_path or "case-studies" in file_path or "best-practices" in file_path:
        posts_var = "posts"
        
    feedlist_replacement = f"<FeedList posts={{{posts_var}}} />"
    content = content.replace(grid_block, feedlist_replacement)
    
    # 3. Add glass panel container wrappers
    # Replace the outer page content div:
    # <div class="mx-auto max-w-6xl px-24 py-48 sm:py-64" data-reveal> or similar
    container_start_match = re.search(r'<div class="mx-auto max-w-6xl px-24 py-48 sm:py-64[^>]*>', content)
    if not container_start_match:
        print(f"Could not find outer container div in {file_path}")
        continue
        
    c_start = container_start_match.start()
    c_end = find_matching_div(content, c_start)
    if c_end == -1:
        print(f"Could not find matching closing div for outer container in {file_path}")
        continue
        
    # Replace outer container start tag to use px-16 sm:px-24 padding, and inject <div class="glass-panel ...">
    outer_div_tag = container_start_match.group(0)
    new_outer_div_tag = re.sub(r'px-24', 'px-16 sm:px-24', outer_div_tag)
    
    content = content[:c_start] + new_outer_div_tag + '\n    <div class="glass-panel border border-border dark:border-border-dark rounded-24 p-24 sm:p-32 md:p-40 shadow-medium">' + content[container_start_match.end():c_end-6] + '\n    </div>\n  </div>' + content[c_end:]
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Successfully updated {file_path}")
