const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const excludedDirs = ['api', 'components', 'globals.css', 'layout.tsx', 'page.tsx'];

function updateCountryFacts(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!excludedDirs.includes(file)) {
                updateCountryFacts(fullPath);
            }
        } else if (file === 'page.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Find the "Country Facts" section and fix max-w-300 to max-w-5xl
            content = content.replace(/<div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">(\s*<h2 className="section-title.*?at a glance)/gs, '<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">$1');
            
            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

updateCountryFacts(appDir);
console.log('Fixed container width for Country Facts in all country pages!');
