const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');
const affectedCountries = ['belgium', 'czech-republic', 'france', 'germany', 'india', 'italy', 'netherlands'];

const paragraphs = {
  'belgium': "Belgium is strategically located in the heart of Europe and serves as a major hub for international business, EU institutions, and logistics. A highly skilled multilingual workforce and strong labor protections make it a key market for Employer of Record and Belgium payroll outsourcing.",
  'czech-republic': "The Czech Republic is a prime destination for IT, manufacturing, and shared services in Central Europe. Its strategic location, competitive talent pool, and EU membership make it a strong choice for Employer of Record and Czech payroll outsourcing.",
  'france': "France is a leading European economy and a major hub for technology, luxury, and manufacturing. Despite its complex labor laws (Code du travail), a highly educated workforce and government incentives make it an attractive market for Employer of Record and France payroll outsourcing.",
  'germany': "Germany is Europe's largest economy and a global powerhouse for engineering, automotive, and technology. Strong union presence and strict labor regulations make compliance essential, driving demand for Employer of Record and Germany payroll outsourcing.",
  'india': "India is the world's second-most populous country and one of the fastest-growing major economies. With a vast talent pool, strong IT infrastructure, and competitive costs, it is a top choice for Employer of Record and India payroll outsourcing.",
  'italy': "Italy is a major European economy known for its strong manufacturing, design, and fashion industries. Navigating its regional labor laws and national collective agreements (CCNL) makes it a vital market for Employer of Record and Italy payroll outsourcing.",
  'netherlands': "The Netherlands is a leading European tech and logistics hub known for its business-friendly environment and English proficiency. Its highly skilled workforce and strategic location make it a top destination for Employer of Record and Netherlands payroll outsourcing."
};

affectedCountries.forEach(country => {
  const pagePath = path.join(appDir, country, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Find the second instance of <header className="service-hero"
    const firstHeroIdx = content.indexOf('<header className="service-hero"');
    if (firstHeroIdx !== -1) {
      const secondHeroIdx = content.indexOf('<header className="service-hero"', firstHeroIdx + 10);
      if (secondHeroIdx !== -1) {
        // Find the end of the second hero
        let secondHeroEnd = content.indexOf('</header>', secondHeroIdx);
        if (secondHeroEnd !== -1) {
          secondHeroEnd += '</header>'.length;
          
          const oldSecondHero = content.substring(secondHeroIdx, secondHeroEnd);

          const countryName = country.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

          const newCountryFacts = `<section className="eor-section md:py-16 bg-white">
        <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-5 leading-tight text-left">
            ${countryName} at a glance
          </h2>
          <p className="text-base text-gray-600 text-left max-w-3xl mb-8 leading-relaxed">
            ${paragraphs[country]}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {countryFacts.map((fact, index) => {
              const IconComponent = fact.icon
              return (
                <div key={index} className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-primary/20 transition-colors">
                  <div className={\`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2 \${fact.iconColor}\`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{fact.label}</p>
                  <p className="font-semibold text-gray-900">{fact.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>`;

          content = content.replace(oldSecondHero, newCountryFacts);
          fs.writeFileSync(pagePath, content, 'utf8');
          console.log(`Restored country facts for ${country}`);
        }
      }
    }
  }
});
