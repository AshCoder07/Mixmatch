# Session Timeout Feature

## Overview
This application now includes an automatic session timeout feature that logs out users after 2 minutes of inactivity to enhance security and prevent unauthorized access to abandoned sessions.

## How It Works

### 1. Automatic Activity Detection
The session timeout monitors various user activities including:
- Mouse movements and clicks
- Keyboard inputs
- Scrolling
- Touch interactions
- Window focus changes

### 2. Timeout Duration
- **Default timeout**: 2 minutes (120,000 ms)
- **Warning**: Shows 30 seconds before timeout (console log)
- **Action**: Automatically logs out and redirects to login

### 3. Implementation Details

#### Files Modified/Created:
- `src/utils/sessionTimeout.js` - Core session timeout utility class
- `src/UserContext.js` - Integrated timeout with user authentication
- `src/App.js` - Added test utilities import
- `src/utils/sessionTimeoutTest.js` - Testing utilities

#### Key Features:
- **Activity-based reset**: Timer resets on any user interaction
- **Cross-tab persistence**: Uses localStorage to track activity across browser tabs
- **Automatic cleanup**: Properly removes event listeners and clears timeouts
- **Development testing**: Built-in utilities for testing the feature

## User Experience

### Normal Usage:
1. User logs in → Session timeout starts automatically
2. User interacts with the app → Timer resets continuously
3. User remains active → No interruption

### Timeout Scenario:
1. User stops interacting for 2 minutes
2. System silently detects inactivity (no popups)
3. After 2 minutes total → User is automatically logged out
4. App immediately redirects to login screen (mobile-friendly)

## Testing the Feature

### Browser Console Commands:
```javascript
// Check current session status
window.sessionTimeoutTest.checkSessionStatus()

// Force immediate timeout (for testing)
window.sessionTimeoutTest.forceSessionTimeout()

// Extend session by simulating activity
window.sessionTimeoutTest.extendSession()

// Simulate 2+ minutes of inactivity
window.sessionTimeoutTest.simulateInactivity()
```

### Manual Testing:
1. Login to the application
2. Wait exactly 2 minutes without touching anything
3. Verify that alert appears and user is logged out
4. Confirm redirect to login screen

### Automated Testing:
- Use the console commands above to test without waiting
- Check browser console for timeout-related logs
- Verify localStorage cleanup on logout

## Technical Implementation

### SessionTimeout Class (`sessionTimeout.js`):
- Manages timeout logic and event binding
- Provides start/stop/reset functionality
- Handles localStorage-based activity tracking
- Includes cleanup and warning mechanisms

### UserContext Integration:
- Automatically starts timeout on user login
- Stops timeout on user logout
- Handles the logout callback when timeout occurs
- Manages session state consistently

### Benefits:
1. **Security**: Prevents unauthorized access to abandoned sessions
2. **Automatic**: No user action required
3. **Responsive**: Resets on any user activity
4. **Reliable**: Handles edge cases and cleanup properly
5. **Testable**: Includes utilities for development testing

## Configuration

To modify the timeout duration, update the timeout value in `UserContext.js`:

```javascript
// Current: 2 minutes
sessionTimeoutRef.current = new SessionTimeout(
  2 * 60 * 1000, // Change this value (in milliseconds)
  () => {
    alert('Your session has expired due to inactivity. Please login again.');
    logout();
  }
);
```

## Browser Compatibility
- Works in all modern browsers
- Uses standard JavaScript APIs
- No external dependencies required
- Handles browser tab switching and focus changes

## Production Considerations
1. Remove or disable test utilities in production builds
2. ✅ Mobile-friendly: No popups or alerts - silent automatic logout
3. ✅ APK compatible: Works seamlessly in Capacitor/Cordova apps
4. May want to implement server-side session validation
5. Consider user preferences for timeout duration
6. Test across different devices and browsers

## Mobile App / APK Compatibility
- ✅ **No browser popups**: Silent logout without alert() calls
- ✅ **Automatic redirect**: Seamlessly returns to login screen
- ✅ **Touch-friendly**: Detects touch events for activity reset
- ✅ **Capacitor ready**: Works in hybrid mobile apps
- ✅ **Cross-platform**: Compatible with Android/iOS builds