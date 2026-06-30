const fs = require('fs');
const path = require('path');

const tsxContent = fs.readFileSync(path.join(__dirname, 'app/compliance/page.tsx.part'), 'utf-8');
const vueContent = fs.readFileSync(path.join(__dirname, '../src/pages/CompliancePage.vue'), 'utf-8');

const styleMatch = vueContent.match(/<style scoped>([\s\S]*?)<\/style>/g);
let cssContent = '';
if (styleMatch) {
  cssContent = styleMatch.map(block => block.replace(/<style scoped>/, '').replace(/<\/style>/, '')).join('\n');
}

// Escape backticks and template strings for JSX
cssContent = cssContent.replace(/`/g, '\\`');
cssContent = cssContent.replace(/\$\{/g, '\\${');

const styleBlock = `<style>{\`${cssContent}\`}</style>`;

const finalTsx = tsxContent.replace('{/* VUE_CSS_PLACEHOLDER */}', styleBlock);

fs.writeFileSync(path.join(__dirname, 'app/compliance/page.tsx'), finalTsx, 'utf-8');
console.log('Created app/compliance/page.tsx successfully!');
