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

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Match: <span className="faq-toggle"[^>]*>{CONDITION ? '−' : '+'}</span>
  const regex = /<span className="faq-toggle"[^>]*>\{(.+?)\s*\?\s*['"]−['"]\s*:\s*['"]\+['"]\}<\/span>/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, (match, condition) => {
      return `<span className="faq-toggle-circle" aria-hidden="true" style={{ transform: ${condition} ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>`;
    });
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated: ' + f);
  }
});
