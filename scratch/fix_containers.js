const fs = require('fs');
const path = require('path');

// Fix all country page sections:
// 1. Replace max-w-300 with max-w-6xl everywhere (proper content width)
// 2. Fix the section vertical spacing (eor-section class is already set but let's make sure)

const netherlandsPage = path.join(__dirname, '..', 'app', 'netherlands', 'page.tsx');

let content = fs.readFileSync(netherlandsPage, 'utf8');

// Replace ALL max-w-300 occurrences with max-w-6xl
// This is the main culprit causing layout issues - max-w-300 is not a standard Tailwind class
content = content.replace(/max-w-300/g, 'max-w-6xl');

fs.writeFileSync(netherlandsPage, content, 'utf8');
console.log('Fixed max-w-300 -> max-w-6xl in netherlands/page.tsx');
console.log('Count of fixes:', (content.match(/max-w-6xl/g) || []).length);
