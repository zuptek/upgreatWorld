/**
 * UpGreat World Cities & Inventory Directory Manager
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

  let activeFilter = 'all';
  let searchQuery = '';

  function renderDirectory() {
    const searchInputHtml = `
      <div class="city-search-bar">
        <div class="search-input-wrap">
          <input type="text" id="citySearchInput" placeholder="Search by city name, catchment (e.g. Gurugram, BKC, ORR, HITEC City)..." value="${searchQuery}">
        </div>
        <div class="format-filters">
          <button class="fmt-btn ${activeFilter === 'all' ? 'active' : ''}" data-fmt="all">All Cities</button>
          <button class="fmt-btn ${activeFilter === 'outdoor' ? 'active' : ''}" data-fmt="outdoor">Outdoor</button>
          <button class="fmt-btn ${activeFilter === 'transit' ? 'active' : ''}" data-fmt="transit">Transit</button>
          <button class="fmt-btn ${activeFilter === 'dooh' ? 'active' : ''}" data-fmt="dooh">Digital OOH</button>
          <button class="fmt-btn ${activeFilter === 'mall' ? 'active' : ''}" data-fmt="mall">Mall & Retail</button>
          <button class="fmt-btn ${activeFilter === 'hyperlocal' ? 'active' : ''}" data-fmt="hyperlocal">Hyperlocal</button>
        </div>
      </div>
    `;

    // Filter cities
    const filteredCities = citiesData.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.highlights.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.keyCatchments.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFormat = activeFilter === 'all' || (c.formats[activeFilter] && c.formats[activeFilter] > 0);
      return matchesSearch && matchesFormat;
    });

    const cardsHtml = `
      <div class="city-inventory-grid">
        ${filteredCities.map(c => `
          <div class="city-inv-card">
            <div class="card-top">
              <span class="region-badge">${c.region}</span>
              <h3>${c.name}</h3>
              <div class="site-count"><strong>${c.totalSites.toLocaleString()}</strong> Available Sites</div>
            </div>
            
            <p class="highlights">${c.highlights}</p>

            <div class="format-breakdown">
              <div class="f-item"><span class="fl">Outdoor</span><span class="fv">${c.formats.outdoor} sites</span></div>
              <div class="f-item"><span class="fl">Transit</span><span class="fv">${c.formats.transit} sites</span></div>
              <div class="f-item"><span class="fl">Digital OOH</span><span class="fv">${c.formats.dooh} screens</span></div>
              <div class="f-item"><span class="fl">Hyperlocal</span><span class="fv">${c.formats.hyperlocal} sites</span></div>
            </div>

            <div class="catchments">
              <strong>Key Catchments:</strong> ${c.keyCatchments.join(' • ')}
            </div>

            <div class="card-action">
              <a href="campaign.html?city=${encodeURIComponent(c.name)}" class="btn btn-secondary btn-full">
                Request Inventory in ${c.name} <span class="arw">→</span>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    container.innerHTML = searchInputHtml + (filteredCities.length > 0 ? cardsHtml : '<div class="no-results">No cities found matching your criteria.</div>');
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
        activeFilter = btn.dataset.fmt;
        renderDirectory();
      });
    });
  }

  renderDirectory();
});
