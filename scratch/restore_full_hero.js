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
    
    // Find the current service-hero (it should be the first one, or the only one for most pages)
    const heroStartIdx = content.indexOf('<header className="service-hero"');
    if (heroStartIdx !== -1) {
      let heroEndIdx = content.indexOf('</header>', heroStartIdx);
      if (heroEndIdx !== -1) {
        heroEndIdx += '</header>'.length;
        const oldHero = content.substring(heroStartIdx, heroEndIdx);

        // Extract Country Name from the old hero
        const h1Match = oldHero.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
        let countryName = '';
        if (h1Match) {
          const spanMatch = h1Match[1].match(/>([^<]+)<\/em>/) || h1Match[1].match(/>([^<]+)<\/span>/);
          if (spanMatch) {
            countryName = spanMatch[1].trim();
          } else {
            countryName = h1Match[1].replace(/<[^>]+>/g, '').replace('Hire in ', '').trim();
          }
        } else {
          countryName = country.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }

        // Clean up country name if it accidentally captured "Contractor"
        if (country.includes('contractor') && !countryName.includes('Contractor')) {
          countryName = countryName + ' Contractor';
        }

        const imgSrc = `/countries/eor-${country.replace('-contractor', '')}.webp`;
        const isContractor = country.includes('contractor');
        const cNameNoContractor = countryName.replace(' Contractor', '');

        const newHero = `<section className="relative flex flex-col items-center justify-center text-white overflow-hidden min-h-[75vh] sm:min-h-[80vh] lg:min-h-screen pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-36 md:pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="${imgSrc}"
            alt="${countryName} Employer of Record"
            fill
            className="object-cover object-center scale-105"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40" />
          <div className="absolute inset-0 bg-linear-to-t from-[#f7931e]/15 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <div className="mb-6 sm:mb-8">
              <h1 className="font-bold text-white leading-[1.1] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl drop-shadow-2xl">
                Hire in <span className="text-[#f7931e] relative">${cNameNoContractor}</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium max-w-2xl mx-auto drop-shadow-lg mb-4">
              Hire ${isContractor ? 'contractors' : 'employees'} in ${cNameNoContractor} without opening an entity.
            </p>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto drop-shadow-md mb-10 sm:mb-12">
              Employer of Record ${cNameNoContractor}: compliant payroll, ${isContractor ? 'local contracts, fast payments' : 'employment laws 2026, visa support'}. Onboard in 2–3 days. No local entity required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto mb-12 sm:mb-14">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white/90 text-white hover:bg-white/15 hover:border-white transition-all duration-300 rounded-lg px-8 py-3 text-base font-semibold"
                href="/contact?reason=${isContractor ? 'contractor_management' : 'eor_services'}"
              >
                Hire in ${cNameNoContractor}
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {trustBadges.map((b) => {
                const Icon = b.icon
                return (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/95 text-sm font-medium"
                  >
                    <Icon className="w-4 h-4 text-[#f7931e] shrink-0" />
                    {b.label}
                  </span>
                )
              }) || null}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-linear-to-t from-white to-transparent pointer-events-none z-1" aria-hidden />
      </section>`;

        content = content.replace(oldHero, newHero);
        fs.writeFileSync(pagePath, content, 'utf8');
        console.log(`Restored full hero for ${country}`);
      }
    }
  }
});
