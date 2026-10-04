/**
 * UpGreat World Cities & Representative Inventory Directory Engine
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

  // Sample representative site inventory catalog as described in website_aduit.md
  const representativeInventory = [
    {
      id: "site-gcr-01",
      city: "Gurugram",
      corridor: "Golf Course Road",
      title: "Golf Course Road Prime Cantilever Gantry",
      format: "Hoarding / Cantilever",
      size: "40ft x 20ft (800 sq ft)",
      visibility: "Frontal Eye-Level (150m+ Visibility)",
      traffic: "145,000+ Vehicles / Day",
      budgetRange: "₹3.5L – ₹5.0L / month",
      availability: "Immediate",
      image: "assets/case-realestate.jpg",
      tags: ["Luxury Catchment", "High Income", "Illuminated 24/7"]
    },
    {
      id: "site-bkc-02",
      city: "Mumbai",
      corridor: "Bandra Kurla Complex (BKC)",
      title: "BKC One Corporate LED Screen Network",
      format: "Digital OOH (DOOH)",
      size: "24ft x 14ft Ultra-HD LED",
      visibility: "Unobstructed Traffic Bottleneck",
      traffic: "210,000+ Commuters / Day",
      budgetRange: "₹4.0L – ₹6.5L / month",
      availability: "Slots Open Next Week",
      image: "assets/case-transit.jpg",
      tags: ["C-Suite Audience", "Programmatic DOOH", "Real-Time Creative"]
    },
    {
      id: "site-orr-03",
      city: "Bengaluru",
      corridor: "Outer Ring Road (ORR Tech Belt)",
      title: "Marathahalli Flyover High-Impact Billboard",
      format: "Large Format Unipole",
      size: "60ft x 30ft Double Sided",
      visibility: "Long-Range Arterial Visibility (300m)",
      traffic: "180,000+ IT Commuters / Day",
      budgetRange: "₹2.8L – ₹4.2L / month",
      availability: "Immediate",
      image: "assets/case-retail.jpg",
      tags: ["Tech Professionals", "High Frequency", "Backlit Flex"]
    },
    {
      id: "site-hitec-04",
      city: "Hyderabad",
      corridor: "HITEC City / Mindspace Gateway",
      title: "Cyber Towers Junction LED Digital Arch",
      format: "Digital OOH (DOOH)",
      size: "32ft x 16ft Curved LED",
      visibility: "Major Traffic Signal Bottleneck",
      traffic: "165,000+ Daily Reach",
      budgetRange: "₹3.0L – ₹4.5L / month",
      availability: "Immediate",
      image: "assets/case-transit.jpg",
      tags: ["IT Hub", "100% Geo-Verified", "Night Illumination"]
    },
    {
      id: "site-sec18-05",
      city: "Noida",
      corridor: "Sector 18 High Street / Expressway Gateway",
      title: "Sector 18 Commercial Hub Metro Pillar Wrap",
      format: "Transit / Metro Branding",
      size: "Full Pillar Wrap (4 Pillars Cluster)",
      visibility: "Pedestrian & Vehicular High-Density",
      traffic: "130,000+ Footfalls / Day",
      budgetRange: "₹2.0L – ₹3.5L / month",
      availability: "Slots Open Next Month",
      image: "assets/case-retail.jpg",
      tags: ["Retail Shoppers", "Metro Transit", "Hyperlocal"]
    }
  ];

  let activeViewTab = 'cities'; // 'cities' or 'inventory'
  let activeFormatFilter = 'all';
  let activeRegionFilter = 'all';
  let searchQuery = '';

  function renderDirectory() {
    const totalSitesNetwork = citiesData.reduce((sum, c) => sum + c.totalSites, 0);

    const navTabsHtml = `
      <div class="dir-nav-tabs" style="display:flex; gap:12px; margin-bottom:24px;">
        <button class="view-tab-btn ${activeViewTab === 'cities' ? 'active' : ''}" data-tab="cities" style="padding:12px 24px; border-radius:8px; font-weight:700; border:1px solid var(--line-2); cursor:pointer; background:${activeViewTab === 'cities' ? 'var(--brand,#000)' : '#fff'}; color:${activeViewTab === 'cities' ? '#fff' : 'var(--ink)'};">
          🏙 Pan-India Cities Footprint (${citiesData.length} Cities)
        </button>
        <button class="view-tab-btn ${activeViewTab === 'inventory' ? 'active' : ''}" data-tab="inventory" style="padding:12px 24px; border-radius:8px; font-weight:700; border:1px solid var(--line-2); cursor:pointer; background:${activeViewTab === 'inventory' ? 'var(--brand,#000)' : '#fff'}; color:${activeViewTab === 'inventory' ? '#fff' : 'var(--ink)'};">
          🎯 Representative Site Inventory Catalogue (${representativeInventory.length} Featured Sites)
        </button>
      </div>
    `;

    const searchInputHtml = `
      <div class="city-directory-header" style="background:#f9fafb; border:1px solid var(--line-2); border-radius:12px; padding:24px; margin-bottom:32px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:20px;">
          <div>
            <span style="font-family:var(--font-mono); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent-dark,#1e1bbf); font-weight:700;">PAN-INDIA INVENTORY COVERAGE</span>
            <h3 style="font-size:1.35rem; font-weight:700; color:var(--ink); margin-top:4px;">${totalSitesNetwork.toLocaleString()}+ Verified Touchpoints Across ${citiesData.length} Cities</h3>
          </div>
          <div style="background:#fff; border:1px solid var(--line-2); padding:8px 16px; border-radius:6px; font-weight:600; font-size:0.875rem;">
            ⚡ SLA: 1 Business Day Verified Media Plan Response
          </div>
        </div>

        <div class="search-input-wrap" style="margin-bottom:16px;">
          <input type="text" id="citySearchInput" placeholder="Search by city, location, or catchment (e.g. Gurugram, Golf Course Road, BKC, ORR, HITEC City)..." value="${searchQuery}" style="width:100%; padding:14px 18px; border:1px solid var(--line-2); border-radius:8px; font-size:0.95rem;">
        </div>

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
          </div>
        </div>
      </div>
    `;

    let mainContentHtml = '';

    if (activeViewTab === 'cities') {
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

      mainContentHtml = `
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
                <a href="campaign.html?city=${encodeURIComponent(c.name)}" class="btn btn-primary btn-full" style="width:100%; text-align:center; padding:12px; font-weight:600;">
                  Request Plan in ${c.name} <span class="arw">→</span>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      // Inventory catalogue tab
      const filteredInventory = representativeInventory.filter(s => {
        const q = searchQuery.toLowerCase();
        return !q || s.city.toLowerCase().includes(q) ||
               s.corridor.toLowerCase().includes(q) ||
               s.title.toLowerCase().includes(q) ||
               s.format.toLowerCase().includes(q);
      });

      mainContentHtml = `
        <div class="rep-inventory-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap:24px;">
          ${filteredInventory.map(s => `
            <div class="site-card" style="background:#fff; border:1px solid var(--line-2); border-radius:12px; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div class="site-media" style="position:relative; height:180px; background:#e5e7eb;">
                  <img src="${s.image}" alt="${s.title}" style="width:100%; height:100%; object-fit:cover;">
                  <span style="position:absolute; top:12px; left:12px; background:rgba(0,0,0,0.85); color:#fff; padding:4px 10px; border-radius:4px; font-size:0.75rem; font-weight:700;">📍 ${s.city} — ${s.corridor}</span>
                  <span style="position:absolute; bottom:12px; right:12px; background:var(--green,#10b981); color:#fff; padding:4px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">● ${s.availability}</span>
                </div>

                <div style="padding:20px;">
                  <h4 style="font-size:1.15rem; font-weight:700; color:var(--ink); margin-bottom:8px;">${s.title}</h4>
                  
                  <div class="site-specs" style="display:flex; flex-direction:column; gap:6px; font-size:0.875rem; color:var(--ink-2); margin-bottom:16px;">
                    <div><strong>Format:</strong> ${s.format}</div>
                    <div><strong>Dimensions:</strong> ${s.size}</div>
                    <div><strong>Visibility:</strong> ${s.visibility}</div>
                    <div><strong>Daily Traffic:</strong> ${s.traffic}</div>
                    <div><strong>Indicative Rate:</strong> <span style="color:var(--brand,#000); font-weight:700;">${s.budgetRange}</span></div>
                  </div>

                  <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:16px;">
                    ${s.tags.map(t => `<span style="background:#f3f4f6; color:#374151; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:600;">${t}</span>`).join('')}
                  </div>
                </div>
              </div>

              <div style="padding:0 20px 20px 20px;">
                <a href="campaign.html?site=${encodeURIComponent(s.id)}&city=${encodeURIComponent(s.city)}&corridor=${encodeURIComponent(s.corridor)}" class="btn btn-primary btn-full" style="width:100%; text-align:center; padding:12px;">
                  Request This Specific Site →
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    container.innerHTML = navTabsHtml + searchInputHtml + mainContentHtml;
    attachEvents();
  }

  function attachEvents() {
    container.querySelectorAll('.view-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeViewTab = btn.dataset.tab;
        renderDirectory();
      });
    });

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
