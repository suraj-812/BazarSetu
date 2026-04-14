import os
import glob

# 1. Update index.html which is now at the root
index_path = r"c:\Users\hp\OneDrive\Desktop\BazarSetu\portfolio\index.html"
with open(index_path, "r", encoding="utf-8") as f:
    idx_content = f.read()

idx_replacements = {
    'href="../css/': 'href="css/',
    'src="../Script/': 'src="Script/',
    'src="../images/': 'src="images/',
    'href="terms.html"': 'href="html/terms.html"',
    'href="privacy.html"': 'href="html/privacy.html"',
    'href="refund.html"': 'href="html/refund.html"',
    'href="security.html"': 'href="html/security.html"',
}

for old, new in idx_replacements.items():
    idx_content = idx_content.replace(old, new)

with open(index_path, "w", encoding="utf-8") as f:
    f.write(idx_content)

# 2. Update subpages to point back to ../index.html
html_dir = r"c:\Users\hp\OneDrive\Desktop\BazarSetu\portfolio\html"
subpages = glob.glob(os.path.join(html_dir, "*.html"))

for sp in subpages:
    with open(sp, "r", encoding="utf-8") as f:
        sp_content = f.read()
    
    # We replace href="index.html with href="../index.html
    sp_content = sp_content.replace('href="index.html', 'href="../index.html')
    
    with open(sp, "w", encoding="utf-8") as f:
        f.write(sp_content)

print("All links fixed based on new structural layout!")
