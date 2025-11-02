import Clarity from '@microsoft/clarity';

class ClarityAnalytics {
  constructor() {
    this.projectId = 'tzoym72rii';
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    
    try {
      Clarity.init(this.projectId);
      this.initialized = true;
      console.log('Microsoft Clarity initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Microsoft Clarity:', error);
    }
  }

  // Track user identification
  identify(userId, sessionId = null, pageId = null, friendlyName = null) {
    if (!this.initialized) return;
    
    try {
      Clarity.identify(userId, sessionId, pageId, friendlyName);
    } catch (error) {
      console.error('Clarity identify error:', error);
    }
  }

  // Track custom events
  trackEvent(eventName) {
    if (!this.initialized) return;
    
    try {
      Clarity.event(eventName);
    } catch (error) {
      console.error('Clarity event tracking error:', error);
    }
  }

  // Set custom tags
  setTag(key, value) {
    if (!this.initialized) return;
    
    try {
      Clarity.setTag(key, value);
    } catch (error) {
      console.error('Clarity tag error:', error);
    }
  }

  // Upgrade session for priority recording
  upgradeSession(reason) {
    if (!this.initialized) return;
    
    try {
      Clarity.upgrade(reason);
    } catch (error) {
      console.error('Clarity upgrade error:', error);
    }
  }

  // Handle cookie consent
  setConsent(hasConsent = true) {
    if (!this.initialized) return;
    
    try {
      Clarity.consent(hasConsent);
    } catch (error) {
      console.error('Clarity consent error:', error);
    }
  }
}

export default new ClarityAnalytics();