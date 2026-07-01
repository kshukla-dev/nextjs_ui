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
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const dirs = [path.join(process.cwd(), 'app'), path.join(process.cwd(), 'src')];
let files = [];
dirs.forEach(d => {
  files = files.concat(walk(d));
});

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;
  
  // Replace 80+ with 160+
  content = content.replace(/80\+/g, '160+');
  // Replace 150+ countries with 160+ countries
  content = content.replace(/150\+\s*countries/gi, '160+ countries');
  // Replace 150+ currencies with 90+ currencies
  content = content.replace(/150\+\s*currencies/gi, '90+ currencies');
  // Replace <div className="stat-value">150+</div>...Countries
  content = content.replace(/<div className="stat-value">150\+<\/div>(\s*)<div className="stat-label">Countries/g, '<div className="stat-value">160+</div>$1<div className="stat-label">Countries');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Updated ${f}`);
  }
});
console.log('TSX files updated.');
