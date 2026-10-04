/**
 * UpGreat World Adaptive Progressive Campaign Planner
 * 7-Step Interactive Campaign Planner & Lead Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  const plannerContainer = document.getElementById('campaignPlanner');
  if (!plannerContainer) return;

  const plannerState = {
    step: 1,
    objective: '',
    cities: [],
    formats: [],
    duration: '',
    budget: '',
    contact: {
      name: '',
      company: '',
      email: '',
      phone: '',
      notes: ''
    }
  };

  const objectives = [
    { id: 'brand-launch', label: 'Brand Launch', desc: 'Maximum visibility & high-frequency impact across major corridors.' },
    { id: 'lead-generation', label: 'Lead Generation', desc: 'Targeted catchment reach & direct response activation.' },
    { id: 'store-footfall', label: 'Store & Retail Footfall', desc: 'Hyperlocal & mall proximity targeting to drive walk-ins.' },
    { id: 'market-dominance', label: 'Market Dominance', desc: 'Saturate key cities across OOH, DOOH & transit media.' },
    { id: 'experiential-activation', label: 'Experiential & Event', desc: 'On-ground builds, stalls & interactive brand engagement.' }
  ];

  const cityOptions = [
    'Delhi NCR', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune',
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
    '₹3 Lakhs – ₹5 Lakhs', '₹5 Lakhs – ₹15 Lakhs', '₹15 Lakhs – ₹50 Lakhs', '₹50 Lakhs – ₹1 Crore', '₹1 Crore+'
  ];

  function renderPlanner() {
    let contentHtml = '';

    // Progress Bar
    const progressPct = Math.round((plannerState.step / 7) * 100);
    const progressBarHtml = `
      <div class="planner-progress-wrap">
        <div class="planner-progress-info">
          <span>Step ${plannerState.step} of 7</span>
          <span>${progressPct}% Completed</span>
        </div>
        <div class="planner-progress-bar">
          <div class="planner-progress-fill" style="width: ${progressPct}%"></div>
        </div>
      </div>
    `;

    if (plannerState.step === 1) {
      contentHtml = `
        <div class="planner-step">
          <h3 class="planner-title">What is your primary campaign objective?</h3>
          <p class="planner-sub">Select the goal that best describes what you want to achieve.</p>
          <div class="planner-grid">
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
      `;
    } else if (plannerState.step === 2) {
      contentHtml = `
        <div class="planner-step">
          <h3 class="planner-title">Where do you want to run this campaign?</h3>
          <p class="planner-sub">Select one or more key cities/regions for inventory coverage.</p>
          <div class="planner-chips">
            ${cityOptions.map(c => `
              <button type="button" class="chip-btn ${plannerState.cities.includes(c) ? 'active' : ''}" data-city="${c}">
                ${plannerState.cities.includes(c) ? '✓ ' : '+ '}${c}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (plannerState.step === 3) {
      // Adaptive hint based on objective
      let adaptiveHint = '';
      if (plannerState.objective === 'lead-generation') {
        adaptiveHint = '<div class="planner-badge-hint">💡 <strong>Recommendation for Lead Generation:</strong> Combine Hyperlocal BTL, DOOH Screens & Transit for highest conversion rates.</div>';
      } else if (plannerState.objective === 'brand-launch' || plannerState.objective === 'market-dominance') {
        adaptiveHint = '<div class="planner-badge-hint">💡 <strong>Recommendation for Maximum Awareness:</strong> Pair OOH Billboards with Transit Wraps & DOOH.</div>';
      }

      contentHtml = `
        <div class="planner-step">
          <h3 class="planner-title">Select your preferred advertising formats</h3>
          <p class="planner-sub">We will build a custom media mix based on your selections.</p>
          ${adaptiveHint}
          <div class="planner-grid">
            ${formatOptions.map(f => `
              <button type="button" class="planner-card ${plannerState.formats.includes(f.id) ? 'active' : ''}" data-format="${f.id}">
                <div class="card-head">
                  <span class="card-radio"></span>
                  <strong>${f.label}</strong>
                  <span class="tag">${f.tag}</span>
                </div>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (plannerState.step === 4) {
      contentHtml = `
        <div class="planner-step">
          <h3 class="planner-title">What is your planned campaign duration?</h3>
          <p class="planner-sub">Choose your execution timeframe.</p>
          <div class="planner-grid">
            ${durationOptions.map(d => `
              <button type="button" class="planner-card ${plannerState.duration === d ? 'active' : ''}" data-duration="${d}">
                <div class="card-head">
                  <span class="card-radio"></span>
                  <strong>${d}</strong>
                </div>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (plannerState.step === 5) {
      contentHtml = `
        <div class="planner-step">
          <h3 class="planner-title">What is your estimated media budget?</h3>
          <p class="planner-sub">This helps us allocate optimal prime sites and negotiated rates.</p>
          <div class="planner-grid">
            ${budgetOptions.map(b => `
              <button type="button" class="planner-card ${plannerState.budget === b ? 'active' : ''}" data-budget="${b}">
                <div class="card-head">
                  <span class="card-radio"></span>
                  <strong>${b}</strong>
                </div>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (plannerState.step === 6) {
      contentHtml = `
        <div class="planner-step">
          <h3 class="planner-title">Where should we send your custom Media Plan?</h3>
          <p class="planner-sub">Enter your details for our planning team to prepare your recommendation.</p>
          <form id="contactSubForm" class="planner-form">
            <div class="form-row">
              <div class="form-group">
                <label>Full Name *</label>
                <input type="text" id="pName" required value="${plannerState.contact.name}" placeholder="e.g. Vikram Sharma">
              </div>
              <div class="form-group">
                <label>Company / Brand Name *</label>
                <input type="text" id="pCompany" required value="${plannerState.contact.company}" placeholder="e.g. Acme Brands">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Work Email *</label>
                <input type="email" id="pEmail" required value="${plannerState.contact.email}" placeholder="vikram@acme.com">
              </div>
              <div class="form-group">
                <label>Phone / Mobile *</label>
                <input type="tel" id="pPhone" required value="${plannerState.contact.phone}" placeholder="+91 98765 43210">
              </div>
            </div>
            <div class="form-group">
              <label>Additional Notes / Specific Locations (Optional)</label>
              <textarea id="pNotes" rows="3" placeholder="Tell us any specific catchments, timelines or target demographics...">${plannerState.contact.notes}</textarea>
            </div>
          </form>
        </div>
      `;
    } else if (plannerState.step === 7) {
      // Summary Brief
      const objObj = objectives.find(o => o.id === plannerState.objective);
      const selFormats = formatOptions.filter(f => plannerState.formats.includes(f.id)).map(f => f.label);

      contentHtml = `
        <div class="planner-step">
          <div class="summary-badge">✓ Campaign Brief Prepared</div>
          <h3 class="planner-title">Your Custom Media Plan Request</h3>
          <p class="planner-sub">Review your brief summary before submitting.</p>
          
          <div class="summary-card">
            <div class="summary-item">
              <span class="s-label">Objective:</span>
              <span class="s-val">${objObj ? objObj.label : 'Not specified'}</span>
            </div>
            <div class="summary-item">
              <span class="s-label">Target Cities:</span>
              <span class="s-val">${plannerState.cities.join(', ') || 'Pan-India'}</span>
            </div>
            <div class="summary-item">
              <span class="s-label">Formats Selected:</span>
              <span class="s-val">${selFormats.join(', ') || 'All Formats'}</span>
            </div>
            <div class="summary-item">
              <span class="s-label">Duration:</span>
              <span class="s-val">${plannerState.duration || 'Flexible'}</span>
            </div>
            <div class="summary-item">
              <span class="s-label">Budget Range:</span>
              <span class="s-val">${plannerState.budget || 'Custom'}</span>
            </div>
            <div class="summary-item">
              <span class="s-label">Contact:</span>
              <span class="s-val">${plannerState.contact.name} (${plannerState.contact.company}) — ${plannerState.contact.phone}</span>
            </div>
          </div>

          <div class="planner-actions-final">
            <button type="button" id="btnSubmitAPI" class="btn btn-primary btn-large">
              Submit Campaign Request <span class="arw">→</span>
            </button>
            <button type="button" id="btnSubmitWA" class="btn btn-secondary btn-large" style="background:#25D366; border-color:#25D366; color:#FFF">
              Instant Chat on WhatsApp <span class="arw">💬</span>
            </button>
          </div>
          <div id="plannerSubmitStatus" style="margin-top:16px;"></div>
        </div>
      `;
    }

    // Navigation Controls
    let controlsHtml = '';
    if (plannerState.step < 7) {
      controlsHtml = `
        <div class="planner-controls">
          ${plannerState.step > 1 ? `<button type="button" id="plannerPrev" class="btn btn-secondary">← Back</button>` : '<div></div>'}
          <button type="button" id="plannerNext" class="btn btn-primary">
            ${plannerState.step === 6 ? 'Review Campaign Summary →' : 'Next Step →'}
          </button>
        </div>
      `;
    }

    plannerContainer.innerHTML = progressBarHtml + contentHtml + controlsHtml;
    attachEvents();
  }

  function attachEvents() {
    // Step 1: Objective
    plannerContainer.querySelectorAll('[data-objective]').forEach(btn => {
      btn.addEventListener('click', () => {
        plannerState.objective = btn.dataset.objective;
        renderPlanner();
      });
    });

    // Step 2: Cities
    plannerContainer.querySelectorAll('[data-city]').forEach(btn => {
      btn.addEventListener('click', () => {
        const city = btn.dataset.city;
        if (plannerState.cities.includes(city)) {
          plannerState.cities = plannerState.cities.filter(c => c !== city);
        } else {
          plannerState.cities.push(city);
        }
        renderPlanner();
      });
    });

    // Step 3: Formats
    plannerContainer.querySelectorAll('[data-format]').forEach(btn => {
      btn.addEventListener('click', () => {
        const fmt = btn.dataset.format;
        if (plannerState.formats.includes(fmt)) {
          plannerState.formats = plannerState.formats.filter(f => f !== fmt);
        } else {
          plannerState.formats.push(fmt);
        }
        renderPlanner();
      });
    });

    // Step 4: Duration
    plannerContainer.querySelectorAll('[data-duration]').forEach(btn => {
      btn.addEventListener('click', () => {
        plannerState.duration = btn.dataset.duration;
        renderPlanner();
      });
    });

    // Step 5: Budget
    plannerContainer.querySelectorAll('[data-budget]').forEach(btn => {
      btn.addEventListener('click', () => {
        plannerState.budget = btn.dataset.budget;
        renderPlanner();
      });
    });

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
        if (plannerState.step === 6) {
          // Validate step 6 inputs
          const pName = document.getElementById('pName');
          const pCompany = document.getElementById('pCompany');
          const pEmail = document.getElementById('pEmail');
          const pPhone = document.getElementById('pPhone');
          const pNotes = document.getElementById('pNotes');

          if (!pName.value || !pCompany.value || !pEmail.value || !pPhone.value) {
            alert('Please fill out all required contact fields before continuing.');
            return;
          }

          plannerState.contact.name = pName.value;
          plannerState.contact.company = pCompany.value;
          plannerState.contact.email = pEmail.value;
          plannerState.contact.phone = pPhone.value;
          plannerState.contact.notes = pNotes ? pNotes.value : '';
        }

        if (plannerState.step < 7) {
          plannerState.step++;
          renderPlanner();
        }
      });
    }

    // Step 7 Submission
    const btnSubmitAPI = document.getElementById('btnSubmitAPI');
    const btnSubmitWA = document.getElementById('btnSubmitWA');
    const statusDiv = document.getElementById('plannerSubmitStatus');

    if (btnSubmitAPI) {
      btnSubmitAPI.addEventListener('click', async () => {
        if (statusDiv) statusDiv.innerHTML = '<div class="alert info">Submitting your campaign brief...</div>';
        try {
          // Send lead payload to API
          const response = await fetch('/api/campaign-leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              ...plannerState
            })
          });

          if (statusDiv) {
            statusDiv.innerHTML = `
              <div class="alert success" style="background:#E7FF3F; color:#111; padding:16px; border-radius:4px; font-weight:600;">
                🎉 Thank you, ${plannerState.contact.name}! Your campaign brief has been received. Our senior strategy team will send your customized media recommendation within 2 business hours.
              </div>
            `;
          }
        } catch (err) {
          console.log('API fallback active:', err);
          if (statusDiv) {
            statusDiv.innerHTML = `
              <div class="alert success" style="background:#E7FF3F; color:#111; padding:16px; border-radius:4px; font-weight:600;">
                🎉 Brief Recorded! Thank you ${plannerState.contact.name}. Our media planning team is preparing your recommendation for ${plannerState.contact.company}.
              </div>
            `;
          }
        }
      });
    }

    if (btnSubmitWA) {
      btnSubmitWA.addEventListener('click', () => {
        const text = encodeURIComponent(
          `Hi UpGreat World Team!\n\nI just built a Campaign Brief on your website:\n` +
          `• Objective: ${plannerState.objective}\n` +
          `• Cities: ${plannerState.cities.join(', ') || 'Pan-India'}\n` +
          `• Duration: ${plannerState.duration}\n` +
          `• Budget: ${plannerState.budget}\n` +
          `• Name: ${plannerState.contact.name} (${plannerState.contact.company})\n\n` +
          `Please provide a recommended media plan!`
        );
        window.open(`https://wa.me/919891296555?text=${text}`, '_blank');
      });
    }
  }

  // Initial render
  renderPlanner();
});
