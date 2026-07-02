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

            // Find the "Country Facts" section
            const oldSectionRegex = /\{\/\* 2\. Country Facts \*\/\}\s*<section className="eor-section md:py-16 bg-white">\s*<div className="max-w-[a-zA-Z0-9\-]+ mx-auto px-4 sm:px-6 lg:px-8">.*?<\/section>/s;

            if (oldSectionRegex.test(content)) {
                const newSection = `{/* 2. Country Facts */}
      <section className="eor-section md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            {countryName} at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-10 leading-relaxed">
            {countryName} is a leading destination for global expansion. With strong employment laws, high English proficiency, and a business-friendly environment, it is a top choice for Employer of Record and {countryName} payroll outsourcing.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {countryFacts.map((fact, index) => {
              const IconComponent = fact.icon
              return (
                <div key={index} className="flex flex-col items-center justify-center text-center py-6 px-4 rounded-xl bg-white border border-gray-200 hover:border-primary/30 transition-all shadow-sm">
                  <IconComponent className={\`w-6 h-6 mb-3 \${fact.iconColor}\`} />
                  <p className="text-xs text-gray-500 mb-1">{fact.label}</p>
                  <p className="text-[15px] font-semibold text-gray-900">{fact.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>`;

                // We need to dynamically extract the country name because we are replacing the description text.
                // Or wait, the original description text is better! Let's just modify the HTML structure, not the text!
                
                // Let's do a more precise replacement using regex.
                
                // Replace the max-w-300 wrapper
                content = content.replace(/<div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">(\s*<h2 className="section-title.*?at a glance)/g, '<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">$1');
                
                // Fix the description bottom margin
                content = content.replace(/mb-8 (leading-relaxed">\s*[\s\S]*?<\/p>\s*<div className="grid grid-cols-2 md:grid-cols-4 gap-)6 max-w-5xl mx-auto">/g, 'mb-10 $14 sm:gap-6">');
                
                // Replace the card content
                content = content.replace(/<div key=\{index\} className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-primary\/20 transition-colors">\s*<div className=\{`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 \$\{fact\.iconColor\}`\}>\s*<IconComponent className="w-5 h-5" \/>\s*<\/div>\s*<p className="text-xs text-gray-600 mb-1">\{fact\.label\}<\/p>\s*<p className="font-semibold text-gray-900">\{fact\.value\}<\/p>\s*<\/div>/g, 
                `<div key={index} className="flex flex-col items-center justify-center text-center py-6 px-4 rounded-xl bg-white border border-gray-200 hover:border-primary/30 transition-all shadow-sm">\n                  <IconComponent className={\`w-6 h-6 mb-3 \${fact.iconColor}\`} />\n                  <p className="text-xs text-gray-500 mb-1">{fact.label}</p>\n                  <p className="text-[15px] font-semibold text-gray-900">{fact.value}</p>\n                </div>`);
            }

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

updateCountryFacts(appDir);
console.log('Finished updating Country Facts UI for all country pages!');
