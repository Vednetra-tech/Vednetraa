/**
 * VedNetra Action Dispatcher & Telemetry
 * Ad-blocker safe event dispatcher
 */

export const trackEvent = (eventName, params = {}) => {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    ...params
  };

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    try {
      window.dispatchEvent(new CustomEvent('vednetra_event', { detail: payload }));
    } catch {
      // Ignore if DOM custom event not available
    }

    const isDev = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) || 
                  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'));
    if (isDev) {
      console.log('✨ [VedNetra Action]', eventName, params);
    }
  }
};

export const trackServiceView = (serviceTitle, category) => {
  trackEvent('service_view', { service_title: serviceTitle, service_category: category });
};

export const trackBookingInitiated = (serviceTitle, mode) => {
  trackEvent('booking_initiated', { service_title: serviceTitle, ritual_mode: mode });
};

export const trackBookingCompleted = (bookingId, serviceTitle, mode) => {
  trackEvent('booking_completed', { booking_id: bookingId, service_title: serviceTitle, ritual_mode: mode });
};

export const trackAstrologyOpened = (consultationType) => {
  trackEvent('astrology_consultation_opened', { consultation_type: consultationType });
};

export const trackWhatsAppClicked = (source = 'floating_button') => {
  trackEvent('whatsapp_click', { source });
};

export const trackAuthAttempt = (role, method) => {
  trackEvent('auth_attempt', { role, method });
};

export const trackMuhuratSelected = (tithi, deity) => {
  trackEvent('muhurat_selected', { tithi, deity });
};
