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

target_old = """    <!-- Standalone floating footer pill -->
    <div class="mt-32 flex justify-center">
      <div class="inline-flex items-center gap-8 px-24 py-12 rounded-full border border-border/40 dark:border-border-dark/40 bg-surface/85 dark:bg-surface-dark/85 text-caption font-sans font-medium text-ink2 dark:text-ink2-dark select-none shadow-medium backdrop-blur-md">
        That's all, Love <span class="text-accent dark:text-accent-dark inline-block hover:scale-115 transition-transform duration-150 cursor-default">🧡</span>
      </div>
    </div>"""

replacement_new = """    <!-- Standalone floating footer pill -->
    <div class="mt-32 flex justify-center animate-reveal">
      <div class="inline-flex items-center gap-12 px-32 py-16 rounded-16 border border-border/40 dark:border-border-dark/40 bg-surface/85 dark:bg-surface-dark/85 text-body font-sans font-semibold text-ink2 dark:text-ink2-dark select-none shadow-medium backdrop-blur-md">
        That's all, Love <span class="text-accent dark:text-accent-dark inline-block hover:scale-115 transition-transform duration-150 cursor-default">🧡</span>
      </div>
    </div>"""

for file_path in category_files:
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    if target_old in content:
        content = content.replace(target_old, replacement_new)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated pill in {file_path}")
    else:
        # Try finding a slightly different spacing variant if any
        # normalize spaces
        normalized_content = content.replace("rounded-full", "rounded-16").replace("px-24 py-12", "px-32 py-16").replace("text-caption font-sans font-medium", "text-body font-sans font-semibold").replace("gap-8", "gap-12")
        if normalized_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(normalized_content)
            print(f"Normalized/updated pill in {file_path}")
