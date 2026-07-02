const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'app');
const nonCountryDirs = ['api', 'contact', 'about', 'employer-of-record', 'payroll', 'compliance', 'immigration', 'global-hiring-guide', 'contractor-management', 'case-studies', 'testimonials', 'blog', 'career', 'cost-calculator', 'press', 'resources', 'solutions', 'privacy-policy', 'terms-of-service', 'layout.tsx', 'globals.css'];
const dirs = fs.readdirSync(appDir).filter(f => {
  const stat = fs.statSync(path.join(appDir, f));
  return stat.isDirectory() && !nonCountryDirs.includes(f) && !f.startsWith('[');
});

dirs.forEach(country => {
  const pagePath = path.join(appDir, country, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    let originalContent = content;

    // 1. Fix the Hero Section
    // The hero section is the first <section> in the file.
    const startIdx = content.indexOf('<section');
    if (startIdx !== -1) {
      let endIdx = content.indexOf('</section>', startIdx);
      if (endIdx !== -1) {
        endIdx += '</section>'.length;
        const oldHero = content.substring(startIdx, endIdx);

        // Don't replace if it's already the proper service-hero grid format we want
        // Wait, if it has 'service-hero' we might want to ensure it has the fixed height etc.
        // Let's just always replace it if we can extract the needed data.

        // Extract Country Name from the old hero
        const h1Match = oldHero.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
        let countryName = '';
        if (h1Match) {
          const spanMatch = h1Match[1].match(/>([^<]+)<\/span>/);
          if (spanMatch) {
            countryName = spanMatch[1].trim();
          } else {
            countryName = h1Match[1].replace(/<[^>]+>/g, '').replace('Hire in ', '').trim();
          }
        } else {
          // If no h1 in hero, skip this file or use folder name
          countryName = country.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }

        // Clean up country name if it accidentally captured "Contractor"
        if (country.includes('contractor') && !countryName.includes('Contractor')) {
          countryName = countryName + ' Contractor';
        }

        // Extract the image source from old hero
        const imgMatch = oldHero.match(/<Image[^>]*src="([^"]+)"[^>]*fill[^>]*>/);
        let imgSrc = imgMatch ? imgMatch[1] : `/countries/eor-${country.replace('-contractor', '')}.webp`;

        // Extract CTAs
        // Some might only have one CTA. Let's find all buttons.
        const ctas = [];
        const buttonRegex = /<Button[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/Button>/g;
        let match;
        while ((match = buttonRegex.exec(oldHero)) !== null) {
          ctas.push({ href: match[1], text: match[2].trim() });
        }
        
        let cta1Text = `Hire in ${countryName}`;
        let cta1Href = `/contact?reason=eor_services`;
        let cta2Text = `Learn about EOR`;
        let cta2Href = `/employer-of-record`;

        if (ctas.length > 0) {
          cta1Href = ctas[0].href;
          cta1Text = ctas[0].text;
          if (ctas.length > 1) {
            cta2Href = ctas[1].href;
            cta2Text = ctas[1].text;
          }
        }

        const isContractor = country.includes('contractor');
        const descText = isContractor 
          ? `Hire and manage contractors in ${countryName} compliantly. Local contracts, fast payments in local currency, and misclassification protection. No local entity required.`
          : `Hire employees in ${countryName} without opening an entity. Employer of Record ${countryName}: compliant payroll, employment laws 2026, visa support. Onboard in 2–3 days. No local entity required.`;

        const newHero = `<header className="service-hero" style={{ paddingTop: '120px' }}>
        <div className="service-hero-copy">
          <h1 style={{ marginBottom: '24px' }}>
            Hire in <em className="text-[#f7931e] not-italic">${countryName.replace(' Contractor', '')}</em>
          </h1>
          <p className="service-hero-lede" style={{ marginBottom: '40px' }}>
            ${descText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gh-btn-primary"
              href="${cta1Href}"
            >
              ${cta1Text}
            </Button>
            ${ctas.length > 1 ? `<Button
              size="lg"
              variant="outline"
              href="${cta2Href}"
            >
              ${cta2Text}
            </Button>` : ''}
          </div>
        </div>
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl hidden md:block">
          <Image
            src="${imgSrc}"
            alt="${countryName} Employer of Record"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </header>`;

        // Replace it
        content = content.replace(oldHero, newHero);
      }
    }

    // Fix other sections padding
    content = content.replace(/<section className="py-\d+\s+([^"]+)"/g, '<section className="eor-section $1"');
    content = content.replace(/<section className="py-\d+"/g, '<section className="eor-section"');

    // Fix Section Titles
    content = content.replace(/<h2 className="(text-[^"]+font-bold[^"]*)"/g, (match, p1) => {
      if (!p1.includes('section-title')) {
        return `<h2 className="section-title ${p1}"`;
      }
      return match;
    });

    if (content !== originalContent) {
      fs.writeFileSync(pagePath, content, 'utf8');
      console.log(`Updated ${country}`);
    }
  }
});
console.log('Finished fixing country pages');
