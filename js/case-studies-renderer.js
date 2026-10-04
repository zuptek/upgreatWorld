/**
 * UpGreat World Case Studies Sales Presentation Renderer
 * Renders proof-heavy B2B sales case studies from case-studies.json
 */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('caseStudiesContainer');
  if (!container) return;

  let caseStudies = [];
  try {
    const res = await fetch('./data/case-studies.json');
    if (res.ok) {
      caseStudies = await res.json();
    }
  } catch (err) {
    console.warn('Case studies fetch error:', err);
  }

  if (caseStudies.length === 0) {
    container.innerHTML = '<div class="no-results">Case studies loading...</div>';
    return;
  }

  const html = `
    <div class="cs-sales-grid">
      ${caseStudies.map(cs => `
        <article class="cs-sales-card">
          <div class="cs-card-header">
            <div class="cs-badges">
              <span class="badge-client">${cs.client}</span>
              <span class="badge-ind">${cs.industry}</span>
              <span class="badge-geo">${cs.market}</span>
            </div>
            <h2 class="cs-card-title">${cs.title}</h2>
          </div>

          <div class="cs-card-body">
            <div class="cs-sec">
              <h4>🎯 Objective</h4>
              <p>${cs.objective}</p>
            </div>

            <div class="cs-sec">
              <h4>🗺 Strategy &amp; Media Mix</h4>
              <p>${cs.strategy}</p>
              <div class="cs-mix-chips">
                ${cs.mediaMix.map(m => `<span class="mix-chip">${m}</span>`).join('')}
              </div>
            </div>

            <div class="cs-sec cs-proof-sec">
              <h4>📸 Execution Proof</h4>
              <p><strong>Verified Sites:</strong> ${cs.executionProof.sitesVerified}</p>
              <p><strong>Duration:</strong> ${cs.executionProof.duration}</p>
              <p class="proof-note">✓ ${cs.executionProof.auditMethod}</p>
            </div>

            <div class="cs-kpi-grid">
              ${cs.results.map(r => `
                <div class="kpi-box">
                  <span class="kpi-val">${r.value}</span>
                  <span class="kpi-lbl">${r.label}</span>
                </div>
              `).join('')}
            </div>

            <div class="cs-card-footer">
              <a href="campaign.html?industry=${encodeURIComponent(cs.industry)}" class="btn btn-primary btn-full">
                Plan a Similar Campaign →
              </a>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;

  container.innerHTML = html;
});
