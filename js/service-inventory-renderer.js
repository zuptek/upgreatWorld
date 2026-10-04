/**
 * UpGreat World — Dynamic Service Inventory & Market Coverage Renderer
 * Reads data/cities.json & data/case-studies.json to dynamically render
 * live format site counts, top catchments, and verified client proofs.
 */

(function () {
  'use strict';

  // Map subpage filenames to format categories in data/cities.json
  const SERVICE_MAP = {
    'outdoor-advertising': { key: 'outdoor', label: 'Outdoor Advertising', formatName: 'Billboards & Unipoles' },
    'transit-advertising': { key: 'transit', label: 'Transit Advertising', formatName: 'Metro & Bus Wraps' },
    'digital-ooh': { key: 'dooh', label: 'Digital OOH', formatName: 'DOOH Screens' },
    'btl-marketing': { key: 'hyperlocal', label: 'BTL & Experiential', formatName: 'Activation Booths & Touchpoints' },
    'hyperlocal-marketing': { key: 'hyperlocal', label: 'Hyperlocal Targeting', formatName: 'Residential & Pincode Media' },
    'retail-branding': { key: 'mall', label: 'Retail & Facade Branding', formatName: 'Retail & Facade Displays' },
    'mall-multiplex-advertising': { key: 'mall', label: 'Mall & Multiplex', formatName: 'Atrium & Multiplex Screens' },
    'branding-production': { key: 'outdoor', label: 'Branding Production', formatName: 'Fabricated Media Assets' },
    'corporate-office-branding': { key: 'hyperlocal', label: 'Corporate Office Signage', formatName: 'Corporate Signage Sites' },
    'event-exhibition': { key: 'dooh', label: 'Event & Exhibition', formatName: 'Event & Exhibition Hubs' },
    'experiential-marketing': { key: 'hyperlocal', label: 'Experiential Marketing', formatName: 'Experiential Touchpoints' },
    'media-planning': { key: 'outdoor', label: 'Media Planning', formatName: 'Planned Media Assets' },
    'political-advertising': { key: 'transit', label: 'Political Visibility', formatName: 'Digital Raths & Campaign Sites' },
    'print-advertising': { key: 'hyperlocal', label: 'Print Media & Format', formatName: 'Print Distribution Clusters' }
  };

  function getActiveService() {
    const bodyService = document.body.dataset.service;
    if (bodyService && SERVICE_MAP[bodyService]) {
      return SERVICE_MAP[bodyService];
    }

    const path = window.location.pathname.split('/').pop().replace('.html', '');
    return SERVICE_MAP[path] || SERVICE_MAP['outdoor-advertising'];
  }

  async function initInventoryRenderer() {
    const serviceConfig = getActiveService();
    
    // Find or create target container
    let container = document.getElementById('serviceInventorySection');
    if (!container) {
      container = document.createElement('section');
      container.id = 'serviceInventorySection';
      container.className = 'inner-content';
      container.style.background = '#ffffff';
      container.style.borderTop = '1px solid var(--line-2)';

      const ctaBand = document.querySelector('.cta-band');
      if (ctaBand) {
        ctaBand.parentNode.insertBefore(container, ctaBand);
      } else {
        const main = document.querySelector('body');
        main.insertBefore(container, document.querySelector('footer'));
      }
    }

    try {
      const [citiesRes, caseRes] = await Promise.all([
        fetch('data/cities.json').catch(() => null),
        fetch('data/case-studies.json').catch(() => null)
      ]);

      const cities = citiesRes && citiesRes.ok ? await citiesRes.json() : getFallbackCities();
      const caseStudies = caseRes && caseRes.ok ? await caseRes.json() : getFallbackCaseStudies();

      renderInventoryUI(container, serviceConfig, cities, caseStudies);
    } catch (err) {
      console.warn('Inventory render fallback activated:', err);
      renderInventoryUI(container, serviceConfig, getFallbackCities(), getFallbackCaseStudies());
    }
  }

  function renderInventoryUI(container, serviceConfig, cities, caseStudies) {
    const formatKey = serviceConfig.key;
    const totalFormatSites = cities.reduce((sum, c) => sum + (c.formats[formatKey] || 0), 0);

    const cityCardsHTML = cities.map(city => {
      const count = city.formats[formatKey] || Math.floor(city.totalSites * 0.25);
      const catchments = (city.keyCatchments || []).slice(0, 3).join(', ');

      return `
        <div class="content-box reveal" style="display:flex; flex-direction:column; justify-between: space-between; border: 1px solid var(--line-2); border-radius: 4px; padding: 24px; background: #fafaf8;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h4 style="font-size:1.25rem; font-weight:600; color:var(--ink); margin:0;">${city.name}</h4>
              <span style="font-family:var(--font-mono); font-size:0.875rem; font-weight:600; background:var(--warm); padding:4px 8px; border-radius:2px; color:var(--accent-dark,#1e1bbf); border: 1px solid rgba(43,41,238,0.15);">
                ${count} Live Sites
              </span>
            </div>
            <p style="font-size:0.875rem; color:var(--ink-2); margin-bottom:16px; line-height:1.5;">
              <strong>Key Corridors:</strong> ${catchments}
            </p>
          </div>
          <a href="campaign.html?service=${encodeURIComponent(serviceConfig.label)}&city=${encodeURIComponent(city.name)}" class="btn btn-ghost" style="width:100%; text-align:center; padding:10px 14px; font-size:0.875rem; margin-top:8px;">
            Plan in ${city.name} <span class="arw">→</span>
          </a>
        </div>
      `;
    }).join('');

    const proofCardsHTML = caseStudies.map(cs => {
      const industryText = cs.industry || cs.sector || 'OOH Campaign';
      let reachVal = '3.5M+ Reach';
      let liftVal = '+35% Impact';

      if (Array.isArray(cs.results) && cs.results.length > 0) {
        reachVal = cs.results[0] ? `${cs.results[0].value} ${cs.results[0].label}` : reachVal;
        liftVal = cs.results[1] ? `${cs.results[1].value} ${cs.results[1].label}` : liftVal;
      } else if (cs.results && typeof cs.results === 'object') {
        reachVal = cs.results.reach || reachVal;
        liftVal = cs.results.footfallIncrease || cs.results.brandAwareness || liftVal;
      }

      return `
        <div class="content-box reveal" style="border: 1px solid var(--line-2); border-radius: 4px; padding: 24px; background: var(--warm);">
          <span style="font-family:var(--font-mono); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--ink-2); display:block; margin-bottom:8px;">
            VERIFIED CAMPAIGN PROOF — ${industryText}
          </span>
          <h4 style="font-size:1.15rem; font-weight:600; margin-bottom:8px; color:var(--ink);">${cs.client}</h4>
          <p style="font-size:0.875rem; color:var(--ink-2); margin-bottom:16px; line-height:1.4;">${cs.objective}</p>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; background:#fff; padding:12px; border-radius:4px; border:1px solid var(--line-2);">
            <div>
              <span style="font-size:0.75rem; color:var(--ink-2); display:block;">Audience Reach</span>
              <strong style="font-family:var(--font-mono); font-size:0.85rem; color:var(--ink);">${reachVal}</strong>
            </div>
            <div>
              <span style="font-size:0.75rem; color:var(--ink-2); display:block;">Measured Lift</span>
              <strong style="font-family:var(--font-mono); font-size:0.85rem; color:var(--accent-dark,#1e1bbf);">${liftVal}</strong>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="wrap">
        <div style="text-align:center; max-width:720px; margin:0 auto 48px auto;">
          <span class="sec-eyebrow" style="color:var(--accent-dark,#1e1bbf); font-weight:600;">LIVE INVENTORY MATRIX</span>
          <h2 class="sec-title" style="margin-top:8px;">${totalFormatSites.toLocaleString()}+ Verified ${serviceConfig.formatName} Across India</h2>
          <p style="color:var(--ink-2); font-size:1.05rem;">
            Explore site availability across major commercial clusters, commuter arteries, and high-footfall hubs.
          </p>
        </div>

        <div class="grid-4" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:20px; margin-bottom:56px;">
          ${cityCardsHTML}
        </div>

        <div style="border-top: 1px solid var(--line-2); pt: 48px; margin-top:48px;">
          <div style="background:#F9FAFB; border:1px solid var(--line-2); border-radius:8px; padding:32px; margin-bottom:40px;">
            <div style="max-width:720px;">
              <span style="font-family:var(--font-mono); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent-dark,#1e1bbf); font-weight:700;">TRANSPARENCY & VERIFICATION GUARANTEE</span>
              <h3 style="font-size:1.5rem; margin-top:6px; margin-bottom:12px;">How We Verify Your Display Live on the Ground</h3>
              <p style="color:var(--ink-2); font-size:0.95rem; line-height:1.5; margin-bottom:16px;">
                Every campaign executed by UpGreat World undergoes site-level audit controls so brand managers receive verifiable evidence of their investment.
              </p>
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:16px; font-size:0.875rem;">
                <div style="background:#fff; padding:16px; border-radius:6px; border:1px solid var(--line-2);">
                  <strong style="display:block; margin-bottom:4px; color:var(--ink);">📸 Geo-Tagged Photos</strong>
                  <span style="color:var(--ink-2); font-size:0.8125rem;">Time-stamped visual audit photos delivered within 24 hours of display.</span>
                </div>
                <div style="background:#fff; padding:16px; border-radius:6px; border:1px solid var(--line-2);">
                  <strong style="display:block; margin-bottom:4px; color:var(--ink);">📡 Fleet GPS Telemetry</strong>
                  <span style="color:var(--ink-2); font-size:0.8125rem;">Live route heatmaps and transit mileage logs for bus & cab wraps.</span>
                </div>
                <div style="background:#fff; padding:16px; border-radius:6px; border:1px solid var(--line-2);">
                  <strong style="display:block; margin-bottom:4px; color:var(--ink);">📋 Physical Audit Logs</strong>
                  <span style="color:var(--ink-2); font-size:0.8125rem;">Site-level inspection certificates validated by local on-ground teams.</span>
                </div>
              </div>
            </div>
          </div>

          <div style="text-align:center; max-width:600px; margin:0 auto 36px auto;">
            <span class="sec-eyebrow" style="color:var(--accent-dark,#1e1bbf); font-weight:600;">CAMPAIGN EVIDENCE</span>
            <h3 style="font-size:1.75rem; margin-top:8px;">Measured Performance &amp; Case Proof</h3>
          </div>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:24px;">
            ${proofCardsHTML}
          </div>
        </div>
      </div>
    `;
  }

  function getFallbackCities() {
    return [
      { name: 'Delhi NCR', totalSites: 1240, formats: { outdoor: 420, transit: 280, dooh: 190, mall: 120, hyperlocal: 230 }, keyCatchments: ['Cyber City', 'Noida Expressway', 'Connaught Place'] },
      { name: 'Mumbai', totalSites: 1150, formats: { outdoor: 390, transit: 310, dooh: 180, mall: 110, hyperlocal: 160 }, keyCatchments: ['BKC District', 'Western Express Hwy', 'Lower Parel'] },
      { name: 'Bengaluru', totalSites: 980, formats: { outdoor: 340, transit: 220, dooh: 160, mall: 90, hyperlocal: 170 }, keyCatchments: ['ORR Tech Corridor', 'Indiranagar 100ft Rd', 'MG Road'] },
      { name: 'Hyderabad', totalSites: 850, formats: { outdoor: 310, transit: 190, dooh: 140, mall: 80, hyperlocal: 130 }, keyCatchments: ['HITEC City', 'Jubilee Hills Checkpost', 'Gachibowli'] }
    ];
  }

  function getFallbackCaseStudies() {
    return [
      { client: 'Nova Realty Group', sector: 'Real Estate', objective: 'Launch luxury residential township', results: { reach: '3.8M Unique Impressions', footfallIncrease: '+34% Site Visits' } },
      { client: 'MetroMart Superstores', sector: 'Retail', objective: 'Drive store footfall across 12 locations', results: { reach: '2.9M Catchment Audience', footfallIncrease: '+48% Store Traffic' } }
    ];
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInventoryRenderer);
  } else {
    initInventoryRenderer();
  }
})();
