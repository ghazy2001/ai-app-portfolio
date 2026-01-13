import os
from PIL import Image

TARGET_DIR = r"d:\Marketing Agency\MN\src\assets"
MAX_SIZE_MB = 1.0  # Threshold to optimize
MAX_WIDTH = 1200   # Max width for banner images

def optimize_images():
    print(f"Scanning {TARGET_DIR} for heavy images...")
    count = 0
    saved_space = 0

    for filename in os.listdir(TARGET_DIR):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(TARGET_DIR, filename)
            size_mb = os.path.getsize(filepath) / (1024 * 1024)

            if size_mb > MAX_SIZE_MB:
                print(f"Optimizing {filename} ({size_mb:.2f} MB)...")
                
                try:
                    with Image.open(filepath) as img:
                        # Calculate new size
                        ratio = min(MAX_WIDTH / img.width, 1.0)
                        if ratio < 1.0:
                            new_width = int(img.width * ratio)
                            new_height = int(img.height * ratio)
                            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                        
                        # Save optimization
                        # For PNGs, we might want to convert to JPEG if transparency isn't used, 
                        # but safe to keep PNG with optimize=True.
                        # Actually many of these are .png but fully opaque (photos). 
                        # IF they are photos, JPG is better. But I won't change extension to avoid breaking imports.
                        
                        if filename.lower().endswith('.jpg') or filename.lower().endswith('.jpeg'):
                            img.save(filepath, optimize=True, quality=85)
                        else:
                            # PNG optimization
                            img.save(filepath, optimize=True)
                            
                    new_size_mb = os.path.getsize(filepath) / (1024 * 1024)
                    saved = size_mb - new_size_mb
                    saved_space += saved
                    count += 1
                    print(f" -> Done! Now {new_size_mb:.2f} MB (Saved {saved:.2f} MB)")
                except Exception as e:
                    print(f" -> Error optimizing {filename}: {e}")

    print(f"\nSummary: Optimized {count} images and saved {saved_space:.2f} MB of space.")

if __name__ == "__main__":
    optimize_images()
