import re

with open('app/page.tsx.part', 'r', encoding='utf-8') as f:
    tsx_content = f.read()

with open('../src/pages/HomePage.vue', 'r', encoding='utf-8') as f:
    vue_content = f.read()

# Extract styles
style_match = re.search(r'<style scoped>(.*?)</style>', vue_content, re.DOTALL)
if style_match:
    css_content = style_match.group(1)
else:
    css_content = ""

# Escape backticks and template strings for JSX
css_content = css_content.replace('`', '\\`')
css_content = css_content.replace('${', '\\${')

# Construct the style block
style_block = f'<style>{{\`{css_content}\`}}</style>'

# Replace the placeholder in the TSX with the style block
final_tsx = tsx_content.replace('{/* VUE_CSS_PLACEHOLDER */}', style_block)

# Write out the final page.tsx
with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(final_tsx)

print("Created app/page.tsx successfully!")
