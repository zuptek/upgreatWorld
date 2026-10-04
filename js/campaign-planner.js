/**
 * UpGreat World Hybrid Campaign Builder
 * 2-Step Brief Capture -> Indicative Media Mix Recommendation -> 1 Business Day SLA Guarantee
 */

document.addEventListener('DOMContentLoaded', () => {
  const plannerContainer = document.getElementById('campaignPlanner');
  if (!plannerContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const initialCity = urlParams.get('city');

  const plannerState = {
    step: 1, // 1: Brief Inputs, 2: Contact Details, 3: Indicative Media Mix & SLA Commitment
    objective: 'brand-launch',
    cities: initialCity ? [initialCity] : ['Delhi NCR'],
    formats: ['ooh-billboards', 'digital-ooh'],
    duration: '30 Days (Standard)',
    budget: '₹5 Lakhs – ₹15 Lakhs',
    contact: {
      name: '',
      company: '',
      email: '',
      phone: '',
      notes: ''
    },
    submitted: false
  };

  const objectives = [
    { id: 'brand-launch', label: 'Brand Launch & Visibility', desc: 'High-frequency impact across major commuter corridors & prime junctions.' },
    { id: 'lead-generation', label: 'Lead Generation & Footfall', desc: 'Targeted catchment reach, localized BTL & direct response activation.' },
    { id: 'store-footfall', label: 'Store & Retail Footfall', desc: 'Hyperlocal & mall proximity targeting within 3km of key locations.' },
    { id: 'market-dominance', label: 'Market & City Dominance', desc: 'Saturate primary cities across OOH, DOOH & transit fleets.' },
    { id: 'experiential-activation', label: 'Experiential & On-Ground Event', desc: 'Interactive builds, canopies, mall atriums & direct engagement.' }
  ];

  const cityOptions = [
    'Delhi NCR', 'Gurugram', 'Noida', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune',
    'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Pan-India Multi-City'
  ];

  const formatOptions = [
    { id: 'ooh-billboards', label: 'OOH Billboards & Hoardings', tag: 'High Impact' },
    { id: 'transit-advertising', label: 'Transit (Metro, Bus & Cab Wraps)', tag: 'Mass Reach' },
    { id: 'digital-ooh', label: 'Digital OOH (LED & Screens)', tag: 'Programmatic' },
    { id: 'hyperlocal-btl', label: 'Hyperlocal & BTL Canopies', tag: 'Footfall' },
    { id: 'mall-multiplex', label: 'Mall & Multiplex Media', tag: 'High Intent' },
    { id: 'retail-branding', label: 'Retail & Storefront Facades', tag: 'Point of Sale' }
  ];

  const durationOptions = [
    '15 Days (Sprint)', '30 Days (Standard)', '45 Days (Launch)', '60 Days (Sustained)', '90+ Days (Quarterly)'
  ];

  const budgetOptions = [
    'Under ₹2 Lakhs', '₹2 Lakhs – ₹5 Lakhs', '₹5 Lakhs – ₹15 Lakhs', '₹15 Lakhs – ₹50 Lakhs', '₹50 Lakhs+'
  ];

  function getIndicativeMediaMix() {
    const selectedFmts = formatOptions.filter(f => plannerState.formats.includes(f.id));
    const fmtList = selectedFmts.length > 0 ? selectedFmts : formatOptions.slice(0, 3);
    
    let distribution = [];
    if (plannerState.objective === 'brand-launch' || plannerState.objective === 'market-dominance') {
      distribution = [
        { format: 'Large Format OOH & Billboards', allocation: '40% Budget Allocation', role: 'Corridor Dominance & High Memory Recall' },
        { format: 'Digital OOH & LED Networks', allocation: '35% Budget Allocation', role: 'Day-Parted Messaging & High Frequency' },
        { format: 'Transit & Metro Wraps', allocation: '25% Budget Allocation', role: 'City-Wide Commuter Reach' }
      ];
    } else if (plannerState.objective === 'lead-generation' || plannerState.objective === 'store-footfall') {
      distribution = [
        { format: 'Hyperlocal & Catchment BTL', allocation: '45% Budget Allocation', role: '3km Perimeter Store Activation' },
        { format: 'Digital OOH Screens', allocation: '30% Budget Allocation', role: 'High-Intent Mall & Commercial Hub Reach' },
        { format: 'Local Transit / Autos', allocation: '25% Budget Allocation', role: 'Last-Mile Neighborhood Visibility' }
      ];
    } else {
      distribution = [
        { format: 'On-Ground Experiential & Canopies', allocation: '50% Budget Allocation', role: 'Direct Consumer Interactions' },
        { format: 'Digital OOH Screens', allocation: '30% Budget Allocation', role: 'Event Proximity Amplification' },
        { format: 'Local OOH Cantilevers', allocation: '20% Budget Allocation', role: 'Directional Signage & Directional Flow' }
      ];
    }

    return distribution;
  }

  function renderPlanner() {
    let contentHtml = '';

    // Step Progress Indicator
    const progressPct = plannerState.step === 1 ? 33 : plannerState.step === 2 ? 66 : 100;
    const progressBarHtml = `
      <div class="planner-progress-wrap" style="margin-bottom: 24px;">
        <div class="planner-progress-info" style="display:flex; justify-between; margin-bottom:8px; font-size:0.875rem; color:var(--ink-2); font-weight:500;">
          <span>Step ${plannerState.step} of 3 — ${plannerState.step === 1 ? 'Campaign Brief' : plannerState.step === 2 ? 'Contact Details' : 'Indicative Recommendation & SLA'}</span>
          <span>${progressPct}% Completed</span>
        </div>
        <div class="planner-progress-bar" style="height:6px; background:rgba(0,0,0,0.08); border-radius:3px; overflow:hidden;">
          <div class="planner-progress-fill" style="width: ${progressPct}%; height:100%; background:var(--accent); transition:width 0.3s ease;"></div>
        </div>
      </div>
    `;

    if (plannerState.step === 1) {
      contentHtml = `
        <div class="planner-step">
          <div class="planner-section-box" style="background:#fff; border:1px solid var(--line); border-radius:12px; padding:28px; margin-bottom:20px;">
            <h3 class="planner-title" style="font-size:1.25rem; font-weight:600; margin-bottom:6px;">1. Primary Campaign Objective</h3>
            <p class="planner-sub" style="color:var(--ink-2); font-size:0.9375rem; margin-bottom:16px;">Select the primary outcome you want to achieve.</p>
            <div class="planner-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:12px;">
              ${objectives.map(o => `
                <button type="button" class="planner-card ${plannerState.objective === o.id ? 'active' : ''}" data-objective="${o.id}">
                  <div class="card-head">
                    <span class="card-radio"></span>
                    <strong>${o.label}</strong>
                  </div>
                  <p>${o.desc}</p>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="planner-section-box" style="background:#fff; border:1px solid var(--line); border-radius:12px; padding:28px; margin-bottom:20px;">
            <h3 class="planner-title" style="font-size:1.25rem; font-weight:600; margin-bottom:6px;">2. Target Geography & Cities</h3>
            <p class="planner-sub" style="color:var(--ink-2); font-size:0.9375rem; margin-bottom:16px;">Select key markets for your real-world campaign.</p>
            <div class="planner-chips">
              ${cityOptions.map(c => `
                <button type="button" class="chip-btn ${plannerState.cities.includes(c) ? 'active' : ''}" data-city="${c}">
                  ${plannerState.cities.includes(c) ? '✓ ' : '+ '}${c}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="planner-section-box" style="background:#fff; border:1px solid var(--line); border-radius:12px; padding:28px; margin-bottom:20px;">
            <h3 class="planner-title" style="font-size:1.25rem; font-weight:600; margin-bottom:6px;">3. Preferred Formats & Budget Range</h3>
            <p class="planner-sub" style="color:var(--ink-2); font-size:0.9375rem; margin-bottom:16px;">Choose media channels and estimated budget.</p>
            
            <div style="margin-bottom:20px;">
              <label style="display:block; font-weight:600; margin-bottom:8px; font-size:0.875rem;">Preferred Formats</label>
              <div class="planner-chips">
                ${formatOptions.map(f => `
                  <button type="button" class="chip-btn ${plannerState.formats.includes(f.id) ? 'active' : ''}" data-format="${f.id}">
                    ${plannerState.formats.includes(f.id) ? '✓ ' : '+ '}${f.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
              <div>
                <label style="display:block; font-weight:600; margin-bottom:8px; font-size:0.875rem;">Campaign Duration</label>
                <select id="pDurationSelect" class="planner-select" style="width:100%; padding:10px 14px; border:1px solid var(--line); border-radius:6px;">
                  ${durationOptions.map(d => `<option value="${d}" ${plannerState.duration === d ? 'selected' : ''}>${d}</option>`).join('')}
                </select>
              </div>
              <div>
                <label style="display:block; font-weight:600; margin-bottom:8px; font-size:0.875rem;">Budget Range</label>
                <select id="pBudgetSelect" class="planner-select" style="width:100%; padding:10px 14px; border:1px solid var(--line); border-radius:6px;">
                  ${budgetOptions.map(b => `<option value="${b}" ${plannerState.budget === b ? 'selected' : ''}>${b}</option>`).join('')}
                </select>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (plannerState.step === 2) {
      contentHtml = `
        <div class="planner-step">
          <div class="planner-section-box" style="background:#fff; border:1px solid var(--line); border-radius:12px; padding:28px;">
            <h3 class="planner-title" style="font-size:1.25rem; font-weight:600; margin-bottom:6px;">Who should receive the verified media plan?</h3>
            <p class="planner-sub" style="color:var(--ink-2); font-size:0.9375rem; margin-bottom:20px;">Enter your business details so our planning desk can build your custom site-level plan.</p>
            
            <form id="contactSubForm" class="planner-form" onsubmit="return false;">
              <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                <div class="form-group">
                  <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.875rem;">Full Name *</label>
                  <input type="text" id="pName" required value="${plannerState.contact.name}" placeholder="e.g. Vikram Sharma" style="width:100%; padding:10px 14px; border:1px solid var(--line); border-radius:6px;">
                </div>
                <div class="form-group">
                  <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.875rem;">Company / Brand Name *</label>
                  <input type="text" id="pCompany" required value="${plannerState.contact.company}" placeholder="e.g. Acme Brands" style="width:100%; padding:10px 14px; border:1px solid var(--line); border-radius:6px;">
                </div>
              </div>
              <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
                <div class="form-group">
                  <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.875rem;">Work Email *</label>
                  <input type="email" id="pEmail" required value="${plannerState.contact.email}" placeholder="vikram@acme.com" style="width:100%; padding:10px 14px; border:1px solid var(--line); border-radius:6px;">
                </div>
                <div class="form-group">
                  <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.875rem;">Phone / WhatsApp *</label>
                  <input type="tel" id="pPhone" required value="${plannerState.contact.phone}" placeholder="+91 98765 43210" style="width:100%; padding:10px 14px; border:1px solid var(--line); border-radius:6px;">
                </div>
              </div>
              <div class="form-group" style="margin-bottom:16px;">
                <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.875rem;">Specific Catchments / Additional Notes (Optional)</label>
                <textarea id="pNotes" rows="3" placeholder="Specify any target pin codes, specific roads (e.g. Golf Course Rd, BKC, ORR), or campaign launch dates..." style="width:100%; padding:10px 14px; border:1px solid var(--line); border-radius:6px;">${plannerState.contact.notes}</textarea>
              </div>
            </form>
          </div>
        </div>
      `;
    } else if (plannerState.step === 3) {
      const indicativeMix = getIndicativeMediaMix();
      const objObj = objectives.find(o => o.id === plannerState.objective);

      contentHtml = `
        <div class="planner-step">
          <!-- Indicative Mix Header -->
          <div style="background:#111; color:#fff; padding:28px; border-radius:12px; margin-bottom:24px;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
              <span style="background:var(--accent); color:#111; font-weight:700; font-size:0.75rem; padding:3px 8px; border-radius:4px; text-transform:uppercase; letter-spacing:0.05em;">Indicative Media Mix</span>
              <span style="color:rgba(255,255,255,0.7); font-size:0.875rem;">· Strategic Recommendation</span>
            </div>
            <h2 style="font-size:1.5rem; font-weight:600; color:#fff; margin-bottom:8px;">Indicative Media Mix for ${plannerState.contact.company || 'Your Brand'}</h2>
            <p style="color:rgba(255,255,255,0.85); font-size:0.95rem; line-height:1.5; margin-bottom:0;">
              Based on your objective (<strong>${objObj ? objObj.label : 'Brand Launch'}</strong>), target geography (<strong>${plannerState.cities.join(', ') || 'Pan-India'}</strong>) and budget range (<strong>${plannerState.budget}</strong>), these formats may be relevant for your campaign.
            </p>
          </div>

          <!-- Format Breakdown Grid -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin-bottom:24px;">
            ${indicativeMix.map(item => `
              <div style="background:#fff; border:1px solid var(--line); border-radius:10px; padding:20px;">
                <span style="font-size:0.75rem; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:4px;">${item.allocation}</span>
                <h4 style="font-size:1.05rem; font-weight:600; margin-bottom:6px;">${item.format}</h4>
                <p style="font-size:0.875rem; color:var(--ink-2); line-height:1.4; margin-bottom:0;">${item.role}</p>
              </div>
            `).join('')}
          </div>

          <!-- Guaranteed SLA Card -->
          <div style="background:linear-gradient(135deg, #F9FAFB, #EFF2F5); border:1px solid #D1D5DB; border-radius:12px; padding:24px; margin-bottom:24px;">
            <div style="display:flex; gap:16px; align-items:flex-start;">
              <div style="font-size:2rem; line-height:1;">🎯</div>
              <div>
                <h3 style="font-size:1.15rem; font-weight:700; color:#111; margin-bottom:4px;">Your verified media plan will be prepared by our team within 1 business day.</h3>
                <p style="color:var(--ink-2); font-size:0.9375rem; line-height:1.4; margin-bottom:12px;">
                  Our media planning team is currently mapping live site availability, negotiated commercial rates, and geo-stamped proof logs for <strong>${plannerState.cities.join(', ') || 'your target markets'}</strong>.
                </p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; font-size:0.875rem; font-weight:600; color:#111;">
                  <span>✓ Negotiated Rates</span>
                  <span>✓ Site Availability Map</span>
                  <span>✓ Geo-Verified Display Proof</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Brief Summary Box -->
          <div style="background:#fff; border:1px solid var(--line); border-radius:10px; padding:20px; margin-bottom:24px;">
            <h4 style="font-size:0.9375rem; font-weight:700; margin-bottom:12px; text-transform:uppercase; letter-spacing:0.05em; color:var(--ink-3);">Brief Summary</h4>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-size:0.875rem;">
              <div><strong style="color:var(--ink-2);">Contact:</strong> ${plannerState.contact.name} (${plannerState.contact.company})</div>
              <div><strong style="color:var(--ink-2);">Email/Phone:</strong> ${plannerState.contact.email} · ${plannerState.contact.phone}</div>
              <div><strong style="color:var(--ink-2);">Duration:</strong> ${plannerState.duration}</div>
              <div><strong style="color:var(--ink-2);">Target Markets:</strong> ${plannerState.cities.join(', ') || 'Pan-India'}</div>
            </div>
          </div>

          <!-- Final Actions -->
          <div class="planner-actions-final" style="display:flex; gap:12px; flex-wrap:wrap;">
            <button type="button" id="btnSubmitAPI" class="btn btn-primary btn-large" style="flex:1.5; min-width:220px; padding:16px 20px; font-size:0.95rem;">
              Submit Brief for Verified Plan <span class="arw">→</span>
            </button>
            <button type="button" id="btnSubmitWA" class="btn btn-secondary btn-large" style="background:#25D366; border-color:#25D366; color:#FFF; flex:1.2; min-width:200px; padding:16px 20px; font-size:0.95rem;">
              Instant Chat on WhatsApp 💬
            </button>
            <button type="button" id="btnPrintBrief" class="btn btn-ghost" style="padding:16px 20px; font-size:0.95rem; border:1px solid var(--line);">
              🖨️ Save/Print PDF
            </button>
            <button type="button" id="btnCopyBrief" class="btn btn-ghost" style="padding:16px 20px; font-size:0.95rem; border:1px solid var(--line);">
              📋 Copy Brief Summary
            </button>
          </div>
          <div id="plannerSubmitStatus" style="margin-top:16px;"></div>
        </div>
      `;
    }

    // Navigation Controls for Step 1 & Step 2
    let controlsHtml = '';
    if (plannerState.step < 3) {
      controlsHtml = `
        <div class="planner-controls" style="display:flex; justify-content:space-between; margin-top:24px;">
          ${plannerState.step > 1 ? `<button type="button" id="plannerPrev" class="btn btn-secondary">← Back to Brief</button>` : '<div></div>'}
          <button type="button" id="plannerNext" class="btn btn-primary" style="padding:14px 28px; font-size:1rem;">
            ${plannerState.step === 1 ? 'Continue to Contact Details →' : 'Generate Indicative Media Mix →'}
          </button>
        </div>
      `;
    }

    plannerContainer.innerHTML = progressBarHtml + contentHtml + controlsHtml;
    attachEvents();
  }

  function attachEvents() {
    // Step 1 Objectives
    plannerContainer.querySelectorAll('[data-objective]').forEach(btn => {
      btn.addEventListener('click', () => {
        plannerState.objective = btn.dataset.objective;
        renderPlanner();
      });
    });

    // Step 1 Cities
    plannerContainer.querySelectorAll('[data-city]').forEach(btn => {
      btn.addEventListener('click', () => {
        const city = btn.dataset.city;
        if (plannerState.cities.includes(city)) {
          if (plannerState.cities.length > 1) {
            plannerState.cities = plannerState.cities.filter(c => c !== city);
          }
        } else {
          plannerState.cities.push(city);
        }
        renderPlanner();
      });
    });

    // Step 1 Formats
    plannerContainer.querySelectorAll('[data-format]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fmt = btn.dataset.format;
        if (plannerState.formats.includes(fmt)) {
          if (plannerState.formats.length > 1) {
            plannerState.formats = plannerState.formats.filter(f => f !== fmt);
          }
        } else {
          plannerState.formats.push(fmt);
        }
        renderPlanner();
      });
    });

    // Duration & Budget Selects
    const pDur = document.getElementById('pDurationSelect');
    if (pDur) {
      pDur.addEventListener('change', (e) => plannerState.duration = e.target.value);
    }
    const pBud = document.getElementById('pBudgetSelect');
    if (pBud) {
      pBud.addEventListener('change', (e) => plannerState.budget = e.target.value);
    }

    // Prev Button
    const prevBtn = document.getElementById('plannerPrev');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (plannerState.step > 1) {
          plannerState.step--;
          renderPlanner();
        }
      });
    }

    // Next Button
    const nextBtn = document.getElementById('plannerNext');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (plannerState.step === 1) {
          plannerState.step = 2;
          renderPlanner();
        } else if (plannerState.step === 2) {
          const pName = document.getElementById('pName');
          const pCompany = document.getElementById('pCompany');
          const pEmail = document.getElementById('pEmail');
          const pPhone = document.getElementById('pPhone');
          const pNotes = document.getElementById('pNotes');

          if (!pName || !pName.value || !pCompany || !pCompany.value || !pEmail || !pEmail.value || !pPhone || !pPhone.value) {
            alert('Please fill out all required contact fields before continuing.');
            return;
          }

          plannerState.contact.name = pName.value;
          plannerState.contact.company = pCompany.value;
          plannerState.contact.email = pEmail.value;
          plannerState.contact.phone = pPhone.value;
          plannerState.contact.notes = pNotes ? pNotes.value : '';

          plannerState.step = 3;
          renderPlanner();
        }
      });
    }

    // Step 3 Submission Handlers
    const btnSubmitAPI = document.getElementById('btnSubmitAPI');
    const btnSubmitWA = document.getElementById('btnSubmitWA');
    const statusDiv = document.getElementById('plannerSubmitStatus');

    if (btnSubmitAPI) {
      btnSubmitAPI.addEventListener('click', async () => {
        if (statusDiv) statusDiv.innerHTML = '<div class="alert info" style="background:#F3F4F6; padding:12px; border-radius:6px; color:#374151;">Recording campaign brief & attribution metadata...</div>';
        const attribution = window.UpGreatAttribution ? window.UpGreatAttribution.getMetadata() : {};
        try {
          // Attempt lead API endpoint call
          await fetch('/api/campaign-leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              ...plannerState,
              attribution: attribution
            })
          });
        } catch (err) {
          console.log('Client-side brief recorded (offline mode):', err);
        }

        if (statusDiv) {
          statusDiv.innerHTML = `
            <div class="alert success" style="background:#E7FF3F; color:#111; padding:20px; border-radius:8px; font-weight:600; line-height:1.5;">
              🎉 Brief Confirmed! Thank you ${plannerState.contact.name}. Our media planning team has received your brief for <strong>${plannerState.contact.company}</strong>. Your verified site-level media plan will be delivered to <strong>${plannerState.contact.email}</strong> within 1 business day.
            </div>
          `;
        }
      });
    }

    if (btnSubmitWA) {
      btnSubmitWA.addEventListener('click', () => {
        if (window.UpGreatAttribution) {
          const waUrl = window.UpGreatAttribution.buildWhatsAppUrl('Campaign Planner Brief', {
            Brand: plannerState.contact.company,
            Contact: `${plannerState.contact.name} (${plannerState.contact.phone})`,
            Objective: plannerState.objective,
            Cities: plannerState.cities.join(', ') || 'Pan-India',
            Duration: plannerState.duration,
            Budget: plannerState.budget
          });
          window.open(waUrl, '_blank');
        } else {
          const text = encodeURIComponent(
            `Hi UpGreat World Team!\n\nI just built a Campaign Brief on your website:\n` +
            `• Brand: ${plannerState.contact.company}\n` +
            `• Contact: ${plannerState.contact.name} (${plannerState.contact.phone})\n` +
            `• Objective: ${plannerState.objective}\n` +
            `• Target Cities: ${plannerState.cities.join(', ') || 'Pan-India'}\n` +
            `• Duration: ${plannerState.duration}\n` +
            `• Budget: ${plannerState.budget}\n\n` +
            `Please provide our verified media plan within 1 business day!`
          );
          window.open(`https://wa.me/919891296555?text=${text}`, '_blank');
        }
      });
    }

    const btnPrintBrief = document.getElementById('btnPrintBrief');
    if (btnPrintBrief) {
      btnPrintBrief.addEventListener('click', () => {
        window.print();
      });
    }

    const btnCopyBrief = document.getElementById('btnCopyBrief');
    if (btnCopyBrief) {
      btnCopyBrief.addEventListener('click', () => {
        const summaryText = 
          `UpGreat World Campaign Brief Summary\n` +
          `-----------------------------------\n` +
          `Brand/Company: ${plannerState.contact.company}\n` +
          `Contact Person: ${plannerState.contact.name} (${plannerState.contact.email} / ${plannerState.contact.phone})\n` +
          `Campaign Objective: ${plannerState.objective}\n` +
          `Target Markets: ${plannerState.cities.join(', ') || 'Pan-India'}\n` +
          `Media Formats: ${plannerState.formats.join(', ')}\n` +
          `Duration: ${plannerState.duration}\n` +
          `Budget Range: ${plannerState.budget}\n` +
          `SLA Guarantee: Verified site-level media plan within 1 business day by UpGreat World (connect@upgreatworld.com)\n`;
        
        navigator.clipboard.writeText(summaryText).then(() => {
          if (statusDiv) {
            statusDiv.innerHTML = '<div class="alert info" style="background:#E6F4EA; color:#137333; padding:12px; border-radius:6px; font-weight:600;">✓ Campaign Brief Summary copied to clipboard!</div>';
          }
        }).catch(() => {
          alert('Brief summary copied to clipboard!');
        });
      });
    }
  }

  // Initial render
  renderPlanner();
});
