/**
 * UpGreat World — B2B Lead Attribution & UTM Session Tracking Engine
 * Captures campaign parameters, referrer sources, and formats high-intent lead payloads.
 */

(function () {
  'use strict';

  const STORAGE_KEY_UTM = 'upgreat_utm_data';
  const STORAGE_KEY_LANDING = 'upgreat_landing_page';

  function captureSessionParams() {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY_LANDING)) {
        sessionStorage.setItem(STORAGE_KEY_LANDING, window.location.href);
      }

      const urlParams = new URLSearchParams(window.location.search);
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'ref'];
      const currentUtms = {};

      let hasUtm = false;
      utmKeys.forEach(key => {
        if (urlParams.has(key)) {
          currentUtms[key] = urlParams.get(key);
          hasUtm = true;
        }
      });

      if (hasUtm) {
        sessionStorage.setItem(STORAGE_KEY_UTM, JSON.stringify(currentUtms));
      }
    } catch (e) {
      console.warn('Attribution session storage unavailable', e);
    }
  }

  captureSessionParams();

  window.UpGreatAttribution = {
    getMetadata: function () {
      let utms = {};
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY_UTM);
        if (stored) utms = JSON.parse(stored);
      } catch (e) {}

      return {
        utm_source: utms.utm_source || 'direct',
        utm_medium: utms.utm_medium || 'none',
        utm_campaign: utms.utm_campaign || 'organic',
        utm_term: utms.utm_term || '',
        utm_content: utms.utm_content || '',
        referrer: document.referrer || 'Direct / Bookmark',
        landing_page: sessionStorage.getItem(STORAGE_KEY_LANDING) || window.location.href,
        page_url: window.location.href,
        timestamp: new Date().toISOString()
      };
    },

    buildWhatsAppUrl: function (topic, detailsObj) {
      const meta = this.getMetadata();
      let msg = `*UpGreat World Campaign Enquiry*\n`;
      msg += `--------------------------------\n`;
      msg += `*Type:* ${topic}\n`;

      if (detailsObj) {
        Object.keys(detailsObj).forEach(key => {
          if (detailsObj[key]) {
            msg += `*${key}:* ${detailsObj[key]}\n`;
          }
        });
      }

      msg += `--------------------------------\n`;
      msg += `*Source:* ${meta.utm_source} (${meta.utm_medium})\n`;
      msg += `*Ref Page:* ${window.location.pathname}\n`;

      return `https://wa.me/919891296555?text=${encodeURIComponent(msg)}`;
    }
  };
})();
