import os

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

for file_path in category_files:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    lines = content.split("\n")
    new_lines = []
    seen_imports = set()
    in_frontmatter = False
    
    for line in lines:
        if line.strip() == "---":
            in_frontmatter = not in_frontmatter
            new_lines.append(line)
            continue
            
        if in_frontmatter and line.strip().startswith("import "):
            if line.strip() in seen_imports:
                # Skip duplicate import
                continue
            seen_imports.add(line.strip())
            
        new_lines.append(line)
        
    new_content = "\n".join(new_lines)
    if new_content != content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Cleaned up duplicates in {file_path}")
