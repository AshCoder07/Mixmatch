/**
 * Test utilities for session timeout functionality
 * This file can be used to manually test the session timeout feature
 */

// Function to simulate user inactivity for testing
export const simulateInactivity = (duration = 2.1 * 60 * 1000) => {
  console.log(`Simulating ${duration / 1000} seconds of inactivity...`);
  
  // Remove all event listeners temporarily to simulate inactivity
  const events = ['mousedown', 'mousemove', 'keypress', 'keydown', 'scroll', 'touchstart', 'click'];
  const originalListeners = [];
  
  // Store original listeners (simplified approach)
  events.forEach(event => {
    const handler = () => {};
    document.addEventListener(event, handler);
    originalListeners.push({ event, handler });
  });
  
  // Simulate the passage of time by updating localStorage
  const currentTime = Date.now();
  const pastTime = currentTime - duration;
  localStorage.setItem('lastActivity', pastTime.toString());
  
  console.log('Inactivity simulation complete. Session should timeout shortly.');
  
  // Clean up test listeners
  setTimeout(() => {
    originalListeners.forEach(({ event, handler }) => {
      document.removeEventListener(event, handler);
    });
  }, 1000);
};

// Function to check current session status
export const checkSessionStatus = () => {
  const lastActivity = localStorage.getItem('lastActivity');
  const currentUser = localStorage.getItem('currentUser');
  
  if (!lastActivity) {
    console.log('No activity recorded');
    return;
  }
  
  const timeSinceActivity = Date.now() - parseInt(lastActivity);
  const timeoutDuration = 2 * 60 * 1000; // 2 minutes
  const remainingTime = timeoutDuration - timeSinceActivity;
  
  console.log('Session Status:');
  console.log('- Current user:', currentUser ? JSON.parse(currentUser).name : 'None');
  console.log('- Time since last activity:', Math.round(timeSinceActivity / 1000), 'seconds');
  console.log('- Time until timeout:', Math.max(0, Math.round(remainingTime / 1000)), 'seconds');
  console.log('- Session expired:', remainingTime <= 0);
  
  return {
    isExpired: remainingTime <= 0,
    remainingTime: Math.max(0, remainingTime),
    timeSinceActivity
  };
};

// Function to manually trigger session timeout (for testing)
export const forceSessionTimeout = () => {
  console.log('Forcing session timeout...');
  
  // Set last activity to more than 2 minutes ago
  const pastTime = Date.now() - (2.1 * 60 * 1000);
  localStorage.setItem('lastActivity', pastTime.toString());
  
  // Simulate a user activity to trigger the timeout check
  const event = new Event('click');
  document.dispatchEvent(event);
  
  console.log('Session timeout forced. User should be logged out.');
};

// Function to extend session (simulate user activity)
export const extendSession = () => {
  console.log('Extending session by simulating user activity...');
  
  // Update last activity to current time
  localStorage.setItem('lastActivity', Date.now().toString());
  
  // Trigger a user activity event
  const event = new Event('click');
  document.dispatchEvent(event);
  
  console.log('Session extended.');
};

// Add these functions to window for easy access in browser console
if (typeof window !== 'undefined') {
  window.sessionTimeoutTest = {
    simulateInactivity,
    checkSessionStatus,
    forceSessionTimeout,
    extendSession
  };
  
  console.log('Session timeout test utilities loaded!');
  console.log('Available functions:');
  console.log('- window.sessionTimeoutTest.checkSessionStatus()');
  console.log('- window.sessionTimeoutTest.simulateInactivity()');
  console.log('- window.sessionTimeoutTest.forceSessionTimeout()');
  console.log('- window.sessionTimeoutTest.extendSession()');
}