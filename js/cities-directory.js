/**
 * UpGreat World Cities & Inventory Directory Manager (Phase 2 Enhanced)
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('citiesDirectory');
  if (!container) return;

  let citiesData = [];
  try {
    const res = await fetch('./data/cities.json');
    if (res.ok) {
      citiesData = await res.json();
    }
  } catch (err) {
    console.warn('Cities JSON fetch error:', err);
  }

  let activeFormatFilter = 'all';
  let activeRegionFilter = 'all';
  let searchQuery = '';

  function renderDirectory() {
    const totalSitesNetwork = citiesData.reduce((sum, c) => sum + c.totalSites, 0);

    const searchInputHtml = `
      <div class="city-directory-header" style="background:#f9fafb; border:1px solid var(--line-2); border-radius:12px; padding:24px; margin-bottom:32px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:20px;">
          <div>
            <span style="font-family:var(--font-mono); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent-dark,#1e1bbf); font-weight:700;">PAN-INDIA INVENTORY COVERAGE</span>
            <h3 style="font-size:1.35rem; font-weight:700; color:var(--ink); margin-top:4px;">${totalSitesNetwork.toLocaleString()}+ Verified Sites Across ${citiesData.length} Cities</h3>
          </div>
          <div style="background:#fff; border:1px solid var(--line-2); padding:8px 16px; border-radius:6px; font-weight:600; font-size:0.875rem;">
            ⚡ SLA: 1 Business Day Verified Media Plan Response
          </div>
        </div>

        <div class="search-input-wrap" style="margin-bottom:16px;">
          <input type="text" id="citySearchInput" placeholder="Search by city name, key corridor, or catchment (e.g. Gurugram, BKC, ORR, HITEC City, Sector 18)..." value="${searchQuery}" style="width:100%; padding:14px 18px; border:1px solid var(--line-2); border-radius:8px; font-size:0.95rem;">
        </div>

        <!-- Filter Controls -->
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="filter-row" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span style="font-size:0.8125rem; font-weight:600; color:var(--ink-2); width:80px;">Format:</span>
            <button class="fmt-btn ${activeFormatFilter === 'all' ? 'active' : ''}" data-fmt="all">All Formats</button>
            <button class="fmt-btn ${activeFormatFilter === 'outdoor' ? 'active' : ''}" data-fmt="outdoor">Outdoor Billboards</button>
            <button class="fmt-btn ${activeFormatFilter === 'transit' ? 'active' : ''}" data-fmt="transit">Transit & Wraps</button>
            <button class="fmt-btn ${activeFormatFilter === 'dooh' ? 'active' : ''}" data-fmt="dooh">Digital OOH</button>
            <button class="fmt-btn ${activeFormatFilter === 'mall' ? 'active' : ''}" data-fmt="mall">Mall & Retail</button>
            <button class="fmt-btn ${activeFormatFilter === 'hyperlocal' ? 'active' : ''}" data-fmt="hyperlocal">Hyperlocal BTL</button>
          </div>

          <div class="filter-row" style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span style="font-size:0.8125rem; font-weight:600; color:var(--ink-2); width:80px;">Region:</span>
            <button class="reg-btn ${activeRegionFilter === 'all' ? 'active' : ''}" data-reg="all">All Regions</button>
            <button class="reg-btn ${activeRegionFilter === 'North India' ? 'active' : ''}" data-reg="North India">North India</button>
            <button class="reg-btn ${activeRegionFilter === 'South India' ? 'active' : ''}" data-reg="South India">South India</button>
            <button class="reg-btn ${activeRegionFilter === 'West India' ? 'active' : ''}" data-reg="West India">West India</button>
            <button class="reg-btn ${activeRegionFilter === 'East India' ? 'active' : ''}" data-reg="East India">East India</button>
            <button class="reg-btn ${activeRegionFilter === 'Central India' ? 'active' : ''}" data-reg="Central India">Central India</button>
          </div>
        </div>
      </div>
    `;

    // Filter cities
    const filteredCities = citiesData.filter(c => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || c.name.toLowerCase().includes(q) ||
                            c.highlights.toLowerCase().includes(q) ||
                            c.region.toLowerCase().includes(q) ||
                            c.keyCatchments.some(k => k.toLowerCase().includes(q));
      
      const matchesFormat = activeFormatFilter === 'all' || (c.formats[activeFormatFilter] && c.formats[activeFormatFilter] > 0);
      const matchesRegion = activeRegionFilter === 'all' || c.region === activeRegionFilter;

      return matchesSearch && matchesFormat && matchesRegion;
    });

    const cardsHtml = `
      <div class="city-inventory-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:24px;">
        ${filteredCities.map(c => `
          <div class="city-inv-card" style="background:#fff; border:1px solid var(--line-2); border-radius:10px; padding:24px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div class="card-top" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                <div>
                  <span class="region-badge" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--ink-2); background:rgba(0,0,0,0.05); padding:3px 8px; border-radius:4px; font-weight:600;">${c.region}</span>
                  <h3 style="font-size:1.35rem; font-weight:700; margin-top:6px; color:var(--ink);">${c.name}</h3>
                </div>
                <div class="site-count" style="text-align:right;">
                  <strong style="font-size:1.2rem; font-family:var(--font-mono); color:var(--accent-dark,#1e1bbf); display:block;">${c.totalSites.toLocaleString()}</strong>
                  <span style="font-size:0.75rem; color:var(--ink-2);">Sites Available</span>
                </div>
              </div>
              
              <p class="highlights" style="font-size:0.875rem; color:var(--ink-2); line-height:1.4; margin-bottom:16px;">${c.highlights}</p>

              <div class="format-breakdown" style="display:grid; grid-template-columns:1fr 1fr; gap:8px; background:#f9fafb; padding:12px; border-radius:6px; margin-bottom:16px; font-size:0.8125rem;">
                <div class="f-item"><span class="fl" style="color:var(--ink-2);">Outdoor:</span> <strong>${c.formats.outdoor}</strong></div>
                <div class="f-item"><span class="fl" style="color:var(--ink-2);">Transit:</span> <strong>${c.formats.transit}</strong></div>
                <div class="f-item"><span class="fl" style="color:var(--ink-2);">DOOH:</span> <strong>${c.formats.dooh}</strong></div>
                <div class="f-item"><span class="fl" style="color:var(--ink-2);">Hyperlocal:</span> <strong>${c.formats.hyperlocal}</strong></div>
              </div>

              <div class="catchments" style="font-size:0.8125rem; color:var(--ink-2); line-height:1.4; margin-bottom:20px;">
                <strong style="color:var(--ink);">Key Corridors:</strong> ${c.keyCatchments.join(' • ')}
              </div>
            </div>

            <div class="card-action">
              <a href="campaign.html?city=${encodeURIComponent(c.name)}" class="btn btn-secondary btn-full" style="width:100%; text-align:center; padding:12px; font-weight:600;">
                Request Plan in ${c.name} <span class="arw">→</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.innerHTML = searchInputHtml + (filteredCities.length > 0 ? cardsHtml : '<div class="no-results" style="padding:48px; text-align:center; background:#f9fafb; border-radius:10px; font-size:1rem; color:var(--ink-2);">No cities found matching your criteria. Try adjusting your search query or filters.</div>');
    attachEvents();
  }

  function attachEvents() {
    const input = document.getElementById('citySearchInput');
    if (input) {
      input.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderDirectory();
      });
    }

    container.querySelectorAll('.fmt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFormatFilter = btn.dataset.fmt;
        renderDirectory();
      });
    });

    container.querySelectorAll('.reg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeRegionFilter = btn.dataset.reg;
        renderDirectory();
      });
    });
  }

  renderDirectory();
});
