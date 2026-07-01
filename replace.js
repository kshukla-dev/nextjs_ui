const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
  const pth = path.join(dataDir, file);
  let content = fs.readFileSync(pth, 'utf8');
  content = content.replace(/"80\+"/g, '"160+"');
  fs.writeFileSync(pth, content, 'utf8');
});

console.log('JSON files updated.');
