const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') && file !== path.join(process.cwd(), 'app', 'page.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'app'));
const newCss = `.faq-toggle-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--ink-muted);
  flex-shrink: 0;
  margin-left: auto;
  transition: color 0.3s, border-color 0.3s;
}

.faq-item.open .faq-toggle-circle {
  color: var(--accent);
  border-color: var(--accent);
}`;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Match `.faq-toggle { ... }` and `.faq-item.open .faq-toggle { ... }` blocks
  const regex1 = /\.faq-toggle\s*\{[^}]+\}/g;
  const regex2 = /\.faq-item\.open\s*\.faq-toggle\s*\{[^}]+\}/g;
  
  if (regex1.test(content) || regex2.test(content)) {
    content = content.replace(regex1, '');
    content = content.replace(regex2, '');
    // Insert new CSS right where we deleted
    content = content.replace(/\.faq-q\s*\{/, newCss + '\n\n.faq-q {');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated CSS in: ' + f);
  }
});
