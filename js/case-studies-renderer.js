/**
 * UpGreat World Case Studies Sales Presentation Renderer
 * Renders deep, proof-heavy B2B sales case studies from case-studies.json
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
        <article class="cs-sales-card reveal">
          <div class="cs-card-header">
            <div class="cs-meta-bar">
              <span class="badge-client">${cs.client}</span>
              <span class="badge-ind">${cs.industry}</span>
              <span class="badge-geo">📍 ${cs.market}</span>
              <span class="badge-duration">⏱ ${cs.duration}</span>
              <span class="badge-budget">💰 Budget: ${cs.budgetBand}</span>
            </div>
            <h2 class="cs-card-title">${cs.title}</h2>
          </div>

          <div class="cs-card-body">
            <div class="cs-narrative-grid">
              <div class="cs-sec">
                <h4>🎯 Objective</h4>
                <p>${cs.objective}</p>
              </div>

              <div class="cs-sec">
                <h4>⚡ The Challenge</h4>
                <p>${cs.challenge}</p>
              </div>

              <div class="cs-sec">
                <h4>🗺 Strategy &amp; Media Mix</h4>
                <p>${cs.strategy}</p>
                <div class="cs-mix-chips">
                  ${cs.mediaMix.map(m => `<span class="mix-chip">✓ ${m}</span>`).join('')}
                </div>
              </div>

              <div class="cs-sec">
                <h4>📌 Location Plan</h4>
                <p>${cs.locationPlan}</p>
              </div>

              <div class="cs-sec cs-proof-sec">
                <h4>📸 Verified Execution Audit</h4>
                <p><strong>Verified Touchpoints:</strong> ${cs.executionProof.sitesVerified}</p>
                <p><strong>Campaign Duration:</strong> ${cs.executionProof.duration}</p>
                <div class="audit-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2"/></svg>
                  <span>${cs.executionProof.auditMethod}</span>
                </div>
              </div>

              ${cs.testimonial ? `
                <div class="cs-sec cs-testimonial-box">
                  <p class="t-quote">"${cs.testimonial.quote}"</p>
                  <p class="t-author"><strong>${cs.testimonial.author}</strong> — ${cs.testimonial.role}, <em>${cs.testimonial.company}</em></p>
                </div>
              ` : ''}
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
              <a href="campaign.html?industry=${encodeURIComponent(cs.industry)}&market=${encodeURIComponent(cs.market)}" class="btn btn-primary btn-full">
                Build a Similar Campaign Plan →
              </a>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  `;

  container.innerHTML = html;
});
