/**
 * SessionTimeout utility for managing user session based on activity
 * Automatically logs out users after a period of inactivity
 */
class SessionTimeout {
  constructor(timeoutDuration = 2 * 60 * 1000, onTimeout = () => {}, options = {}) {
    this.timeoutDuration = timeoutDuration; // 2 minutes in milliseconds
    this.onTimeout = onTimeout;
    this.timeoutId = null;
    this.warningTimeoutId = null;
    this.isActive = false;
    this.silentMode = options.silentMode || false; // For mobile apps - reduces console logs
    
    // Events to track user activity
    this.events = [
      'mousedown',
      'mousemove', 
      'keypress',
      'keydown',
      'scroll',
      'touchstart',
      'touchmove',
      'click',
      'wheel',
      'mousewheel',
      'focus'
    ];
    
    // Bind the reset function to maintain context
    this.resetTimeout = this.resetTimeout.bind(this);
    this.handleActivity = this.handleActivity.bind(this);
  }

  /**
   * Initialize the timeout and start monitoring
   */
  start() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.initTimeout();
    this.bindEvents();
    this.updateLastActivity();
    
    if (!this.silentMode) {
      console.log('Session timeout started - will logout after', this.timeoutDuration / 1000, 'seconds of inactivity');
    }
  }

  /**
   * Stop the timeout monitoring
   */
  stop() {
    if (!this.isActive) return;
    
    this.isActive = false;
    this.clearTimeout();
    this.unbindEvents();
    
    console.log('Session timeout stopped');
  }

  /**
   * Initialize the timeout
   */
  initTimeout() {
    this.clearTimeout();
    
    // Set main timeout
    this.timeoutId = setTimeout(() => {
      if (!this.silentMode) {
        console.log('Session timeout triggered - logging out user');
      }
      this.onTimeout();
    }, this.timeoutDuration);

    // Set warning timeout (30 seconds before main timeout)
    const warningTime = Math.max(30000, this.timeoutDuration - 30000);
    this.warningTimeoutId = setTimeout(() => {
      this.showWarning();
    }, warningTime);
  }

  /**
   * Reset the timeout on user activity
   */
  resetTimeout() {
    if (!this.isActive) return;
    
    this.initTimeout();
    this.updateLastActivity();
  }

  /**
   * Handle user activity
   */
  handleActivity() {
    // Throttle activity handling to avoid excessive calls
    if (this.lastActivityTime && Date.now() - this.lastActivityTime < 1000) {
      return;
    }
    
    this.resetTimeout();
  }

  /**
   * Clear all timeouts
   */
  clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    if (this.warningTimeoutId) {
      clearTimeout(this.warningTimeoutId);
      this.warningTimeoutId = null;
    }
  }

  /**
   * Bind activity event listeners
   */
  bindEvents() {
    this.events.forEach(event => {
      document.addEventListener(event, this.handleActivity, true);
      window.addEventListener(event, this.handleActivity, true);
    });
    
    // Also listen for visibility change
    document.addEventListener('visibilitychange', this.handleActivity);
  }

  /**
   * Remove activity event listeners
   */
  unbindEvents() {
    this.events.forEach(event => {
      document.removeEventListener(event, this.handleActivity, true);
      window.removeEventListener(event, this.handleActivity, true);
    });
    
    document.removeEventListener('visibilitychange', this.handleActivity);
  }

  /**
   * Update last activity timestamp in localStorage
   */
  updateLastActivity() {
    this.lastActivityTime = Date.now();
    localStorage.setItem('lastActivity', this.lastActivityTime.toString());
  }

  /**
   * Check if session is expired based on last activity
   */
  isSessionExpired() {
    const lastActivity = localStorage.getItem('lastActivity');
    if (!lastActivity) return true;

    const timeDiff = Date.now() - parseInt(lastActivity);
    return timeDiff > this.timeoutDuration;
  }

  /**
   * Show warning before timeout (mobile-friendly, no popups)
   */
  showWarning() {
    console.log('Session will expire in 30 seconds due to inactivity');
    // Mobile-friendly: just log to console, no popups or modals
    // In a production app, you could dispatch a custom event here
    // that components can listen to for showing subtle UI notifications
  }

  /**
   * Get remaining time before timeout
   */
  getRemainingTime() {
    const lastActivity = localStorage.getItem('lastActivity');
    if (!lastActivity) return 0;

    const timeDiff = Date.now() - parseInt(lastActivity);
    const remaining = this.timeoutDuration - timeDiff;
    return Math.max(0, remaining);
  }

  /**
   * Manually trigger timeout (for testing or manual logout)
   */
  triggerTimeout() {
    if (this.isActive) {
      this.onTimeout();
    }
  }

  /**
   * Destroy the timeout manager
   */
  destroy() {
    this.stop();
    this.onTimeout = null;
  }
}

export default SessionTimeout;