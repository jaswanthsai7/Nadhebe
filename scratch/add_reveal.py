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
    <div class="mt-32 flex justify-center animate-reveal">
      <div class="inline-flex items-center gap-12 px-32 py-16 rounded-2xl border border-border/40 dark:border-border-dark/40 bg-surface/85 dark:bg-surface-dark/85 text-body font-sans font-semibold text-ink2 dark:text-ink2-dark select-none shadow-medium backdrop-blur-md">
        That's all, Love <span class="text-accent dark:text-accent-dark inline-block hover:scale-115 transition-transform duration-150 cursor-default">🧡</span>
      </div>
    </div>"""

replacement_new = """    <!-- Standalone floating footer pill -->
    <div class="mt-32 flex justify-center" data-reveal>
      <div class="inline-flex items-center gap-12 px-32 py-16 rounded-2xl border border-border/40 dark:border-border-dark/40 bg-surface/85 dark:bg-surface-dark/85 text-body font-sans font-semibold text-ink2 dark:text-ink2-dark select-none shadow-medium backdrop-blur-md hover:scale-[1.03] transition-all duration-300 hover:shadow-large cursor-default">
        That's all, Love <span class="text-accent dark:text-accent-dark inline-block hover:scale-120 transition-transform duration-150 cursor-default">🧡</span>
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
        print(f"Added reveal and hover animation to {file_path}")
    else:
        # Fallback normalization just in case
        normalized_content = content.replace('animate-reveal', 'data-reveal').replace('rounded-16', 'rounded-2xl').replace('rounded-full', 'rounded-2xl')
        if normalized_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(normalized_content)
            print(f"Normalized/updated layout in {file_path}")
