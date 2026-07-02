const fs = require('fs');
const path = require('path');

// max-w-300 in Tailwind v4 = 75rem = 1200px - that's actually valid!
// Revert max-w-6xl back to max-w-300 in netherlands page

const netherlandsPage = path.join(__dirname, '..', 'app', 'netherlands', 'page.tsx');
let content = fs.readFileSync(netherlandsPage, 'utf8');

// Revert all max-w-6xl (that we just changed) back to max-w-300
// except the one in the "at a glance" section which should stay max-w-5xl
// The at-a-glance has: max-w-5xl from earlier

// Replace max-w-6xl -> max-w-300 everywhere
content = content.replace(/max-w-6xl/g, 'max-w-300');

fs.writeFileSync(netherlandsPage, content, 'utf8');
console.log('Reverted max-w-6xl -> max-w-300 in netherlands/page.tsx');

// Now also add eor-section class to global.css since it's missing
const globalCss = path.join(__dirname, '..', 'src', 'styles', 'global.css');
let css = fs.readFileSync(globalCss, 'utf8');

if (!css.includes('.eor-section')) {
    css += `
/* === EOR country page section spacing === */
.eor-section {
  padding-top: 64px;
  padding-bottom: 64px;
}

@media (min-width: 768px) {
  .eor-section {
    padding-top: 80px;
    padding-bottom: 80px;
  }
}

@media (min-width: 1024px) {
  .eor-section {
    padding-top: 96px;
    padding-bottom: 96px;
  }
}
`;
    fs.writeFileSync(globalCss, css, 'utf8');
    console.log('Added .eor-section to global.css');
} else {
    console.log('.eor-section already exists in global.css');
}
