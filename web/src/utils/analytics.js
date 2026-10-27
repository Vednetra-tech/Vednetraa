/**
 * VedNetra Analytics Forwarder
 * Re-exports from eventTracker.js to ensure full compatibility while being ad-blocker safe
 */
export {
  trackEvent,
  trackServiceView,
  trackBookingInitiated,
  trackBookingCompleted,
  trackAstrologyOpened,
  trackWhatsAppClicked,
  trackAuthAttempt,
  trackMuhuratSelected
} from './eventTracker.js';
