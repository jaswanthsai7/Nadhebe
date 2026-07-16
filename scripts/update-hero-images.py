import os
import re

content_dir = r"c:\Users\jasva\Nadhebe\src\content"

print("Starting frontmatter heroImage migration...")
updated_count = 0

for root, dirs, files in os.walk(content_dir):
    for file in files:
        if file.endswith(".md"):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                
                if content.startswith("---"):
                    parts = content.split("---", 2)
                    if len(parts) >= 3:
                        frontmatter = parts[1]
                        body = parts[2]
                        
                        # Find youtubeVideoId or videoId
                        video_id_match = re.search(r'^(youtubeVideoId|videoId):\s*["\']?([^"\'\n\r]+)["\']?', frontmatter, re.MULTILINE)
                        if video_id_match:
                            video_id = video_id_match.group(2).strip()
                            new_thumbnail_url = f"https://img.youtube.com/vi/{video_id}/maxresdefault.jpg"
                            
                            # Update heroImage
                            if re.search(r'^heroImage:', frontmatter, re.MULTILINE):
                                frontmatter = re.sub(
                                    r'^heroImage:\s*.*$',
                                    f'heroImage: "{new_thumbnail_url}"',
                                    frontmatter,
                                    flags=re.MULTILINE
                                )
                            else:
                                # Inject heroImage at the beginning of the frontmatter block
                                frontmatter = f"\nheroImage: \"{new_thumbnail_url}\"" + frontmatter
                            
                            new_content = f"---{frontmatter}---{body}"
                            with open(filepath, "w", encoding="utf-8") as f:
                                f.write(new_content)
                            print(f"Updated {file} (Video ID: {video_id})")
                            updated_count += 1
            except Exception as e:
                print(f"Error processing {file}: {e}")

print(f"Migration completed. Updated {updated_count} files.")
