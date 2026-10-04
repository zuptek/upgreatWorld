/**
 * UpGreat World Canonical Config Loader & Manager
 * Provides a single source of truth for site-wide data, stats, and contact details.
 */

window.UpGreatConfig = {
  data: null,
  
  async init() {
    try {
      const response = await fetch('./data/site-config.json');
      if (response.ok) {
        this.data = await response.json();
        window.siteConfig = this.data;
        this.applyConfigToDOM();
      }
    } catch (err) {
      console.warn('Config fetch warning, using window defaults:', err);
    }
  },

  applyConfigToDOM() {
    if (!this.data) return;

    // 1. Update all mailto links with class or data attribute
    const email = this.data.contact.email;
    document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
      if (el.classList.contains('canonical-email') || el.dataset.canonical === 'email') {
        el.href = `mailto:${email}`;
        if (el.dataset.updateText === 'true') el.textContent = email;
      }
    });

    // 2. Update WhatsApp links
    const wa = this.data.social.whatsapp;
    document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
      if (!el.href.includes('text=')) {
        el.href = wa;
      }
    });

    // 3. Update footer office contacts if container exists
    const gurugram = this.data.contact.offices.find(o => o.city.includes('Gurugram'));
    const mumbai = this.data.contact.offices.find(o => o.city.includes('Mumbai'));

    const gurugramEl = document.getElementById('officeGurugram');
    if (gurugramEl && gurugram) {
      gurugramEl.innerHTML = `<strong>Gurugram Office</strong><br>${gurugram.address}<br>Phone: <a href="tel:${gurugram.tel}">${gurugram.phone}</a>`;
    }

    const mumbaiEl = document.getElementById('officeMumbai');
    if (mumbaiEl && mumbai) {
      mumbaiEl.innerHTML = `<strong>Mumbai Office</strong><br>${mumbai.address}<br>Phone: <a href="tel:${mumbai.tel}">${mumbai.phone}</a>`;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.UpGreatConfig.init();
});
