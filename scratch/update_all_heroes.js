const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'app');
const excludedDirs = ['api', 'components', 'globals.css', 'layout.tsx', 'page.tsx'];

function updateHeroCSS(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!excludedDirs.includes(file)) {
                updateHeroCSS(fullPath);
            }
        } else if (file === 'page.tsx') {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Find the hero section and replace the gradients and min-h-screen
            
            // 1. Replace min-h-screen with min-h-[75vh]
            content = content.replace(/min-h-\[75vh\] sm:min-h-\[80vh\] lg:min-h-screen pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-16/g, 'min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] pt-32 pb-24');

            // 2. Replace the gradients block
            const oldGradientsRegex = /<div className="absolute inset-0 bg-linear-to-b.*?<\/div>\s*<div className="absolute inset-0 bg-linear-to-r.*?<\/div>\s*<div className="absolute inset-0 bg-linear-to-t.*?<\/div>/s;
            const newGradients = `<div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/50 to-black/90" />`;
            
            if (oldGradientsRegex.test(content)) {
                content = content.replace(oldGradientsRegex, newGradients);
            }

            // Also check for the single gradient I already applied to netherlands
            const singleGradientRegex = /<div className="absolute inset-0 bg-linear-to-b from-black\/10 via-black\/50 to-black\/90" \/>/g;
            if (!singleGradientRegex.test(content) && content.includes('bg-linear-to-b from-black/50 via-black/60 to-black/80')) {
                // If it only has the dark gradient but not the other two (like if someone manually edited it)
                content = content.replace(/<div className="absolute inset-0 bg-linear-to-b from-black\/50 via-black\/60 to-black\/80" \/>/g, newGradients);
            }

            // 3. Update the bottom white fade gradient
            content = content.replace(/<div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-linear-to-t from-white to-transparent pointer-events-none z-1" aria-hidden \/>/g, '<div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" aria-hidden />');
            content = content.replace(/<div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-linear-to-t from-white to-transparent pointer-events-none z-10" aria-hidden \/>/g, '<div className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" aria-hidden />');

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

updateHeroCSS(appDir);
console.log('Finished updating hero UI for all country pages!');
