import os
import subprocess
import re

# 1. Reset all pages using git restore
print("Resetting src/pages/ to clean state...")
subprocess.run(["git", "restore", "src/pages/"], cwd=r"c:\Users\jasva\Nadhebe")

category_files = [
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
    r"c:\Users\jasva\Nadhebe\src\pages\youtube\index.astro",
    r"c:\Users\jasva\Nadhebe\src\layouts\CategoryLayout.astro"
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

# Standalone floating pill template
floating_pill = """
    <!-- Standalone floating footer pill -->
    <div class="mt-32 flex justify-center">
      <div class="inline-flex items-center gap-8 px-24 py-12 rounded-full border border-border/40 dark:border-border-dark/40 bg-surface/85 dark:bg-surface-dark/85 text-caption font-sans font-medium text-ink2 dark:text-ink2-dark select-none shadow-medium backdrop-blur-md">
        That's all, Love <span class="text-accent dark:text-accent-dark inline-block hover:scale-115 transition-transform duration-150 cursor-default">🧡</span>
      </div>
    </div>"""

for file_path in category_files:
    if not os.path.exists(file_path):
        print(f"Skipping {file_path} (does not exist)")
        continue
    
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    print(f"Processing {file_path}...")
    
    # 1. Update imports
    frontmatter_match = re.search(r"^---\n(.*?)\n---", content, re.DOTALL)
    if not frontmatter_match:
        print(f"  Could not find frontmatter in {file_path}")
        continue
        
    frontmatter = frontmatter_match.group(1)
    
    # Clean up old imports
    frontmatter_lines = frontmatter.split("\n")
    new_lines = []
    has_get_all = False
    for line in frontmatter_lines:
        if "VerdictGauge" in line or "getArticleUrl" in line:
            # Check if this line also has getAllArticles
            if "getAllArticles" in line:
                has_get_all = True
            continue
        new_lines.append(line)
        
    # Re-insert getAllArticles if it was present
    if has_get_all:
        new_lines.insert(2, "import { getAllArticles } from '../../utils/content';")
        
    rel_path = "../../components/FeedList.astro"
    if "CategoryLayout" in file_path:
        rel_path = "@/components/FeedList.astro"
        
    new_lines.insert(2, f"import FeedList from '{rel_path}';")
    
    new_frontmatter = "\n".join(new_lines)
    content = content.replace(frontmatter, new_frontmatter)
    
    # 2. Find grid block and replace it (only for pages, CategoryLayout is handled differently)
    if "CategoryLayout" not in file_path:
        grid_start_match = re.search(r'<div class="grid grid-cols-[^>]+>', content)
        if not grid_start_match:
            # If it's already FeedList, let's find the FeedList tag
            grid_start_match = re.search(r'<FeedList[^>]+>', content)
            
        if not grid_start_match:
            print(f"  Could not find list/grid container start in {file_path}")
            continue
            
        start_pos = grid_start_match.start()
        
        # If it was a grid, find matching div
        if "<FeedList" not in grid_start_match.group(0):
            end_pos = find_matching_div(content, start_pos)
            if end_pos == -1:
                print(f"  Could not find matching closing div for grid in {file_path}")
                continue
            grid_block = content[start_pos:end_pos]
        else:
            grid_block = grid_start_match.group(0)
            
        # Determine variable
        posts_var = "sorted"
        if "news" in file_path:
            posts_var = "page.data"
        elif "tag" in file_path or "use-cases" in file_path or "tools" in file_path or "frameworks" in file_path or "case-studies" in file_path or "best-practices" in file_path:
            posts_var = "posts"
            
        feedlist_replacement = f"<FeedList posts={{{posts_var}}} />"
        content = content.replace(grid_block, feedlist_replacement)
        
    # 3. Add glass panel container wrappers and floating footer pill
    # Find outer page content container:
    # <div class="mx-auto max-w-6xl px-24 py-48 sm:py-64" ...> or similar
    # In CategoryLayout: <div class="mx-auto max-w-content px-24 py-64 sm:py-80" data-reveal>
    container_pattern = r'<div class="mx-auto max-w-(?:6xl|content) px-(?:16 sm:px-)?24 py-(?:48 sm:py-64|64 sm:py-80)[^>]*>'
    container_start_match = re.search(container_pattern, content)
    if not container_start_match:
        print(f"  Could not find outer container div in {file_path}")
        continue
        
    c_start = container_start_match.start()
    c_end = find_matching_div(content, c_start)
    if c_end == -1:
        print(f"  Could not find matching closing div for outer container in {file_path}")
        continue
        
    outer_div_tag = container_start_match.group(0)
    # Adjust padding to px-16 sm:px-24 if px-24
    new_outer_div_tag = re.sub(r'px-24', 'px-16 sm:px-24', outer_div_tag)
    
    # We want to insert the glass-panel inside this outer container, around the content.
    # And we append the floating_pill right before the outer container closes (c_end - 6).
    content_inside = content[container_start_match.end():c_end-6]
    
    # Let's check if CategoryLayout is handled: in CategoryLayout we have grid layout with sidebar
    if "CategoryLayout" in file_path:
        # In CategoryLayout, we want the glass-panel to wrap the main content area (lg:col-span-9)
        # instead of the outer container, so the sidebar stays on the right side!
        # The main content area starts with: <div class="lg:col-span-9 space-y-64">
        main_col_match = re.search(r'<div class="lg:col-span-9[^>]*>', content)
        if main_col_match:
            mc_start = main_col_match.start()
            mc_end = find_matching_div(content, mc_start)
            if mc_end != -1:
                # Wrap inside lg:col-span-9
                mc_div_tag = main_col_match.group(0)
                mc_inside = content[main_col_match.end():mc_end-6]
                wrapped_mc = mc_div_tag + '\n        <div class="glass-panel border border-border dark:border-border-dark rounded-24 p-24 sm:p-32 md:p-40 shadow-medium">\n' + mc_inside + '\n        </div>' + floating_pill + '\n      </div>'
                content = content[:mc_start] + wrapped_mc + content[mc_end:]
            else:
                print(f"  Could not find matching closing div for main column in CategoryLayout")
        else:
            print(f"  Could not find main column in CategoryLayout")
    else:
        # Normal category listing page: wrap the whole inner block in glass-panel, and append the pill at the bottom
        wrapped_content = new_outer_div_tag + '\n    <div class="glass-panel border border-border dark:border-border-dark rounded-24 p-24 sm:p-32 md:p-40 shadow-medium">\n' + content_inside + '\n    </div>' + floating_pill + '\n  </div>'
        content = content[:c_start] + wrapped_content + content[c_end:]
        
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Successfully updated {file_path}")
