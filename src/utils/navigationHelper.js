/**
 * Navigation utility for handling redirects after session timeout
 */

let navigationFunction = null;

export const setNavigationFunction = (navigate) => {
  navigationFunction = navigate;
};

export const navigateToHome = () => {
  if (navigationFunction) {
    navigationFunction('/');
  } else {
    // Fallback: use window.location if navigate is not available
    window.location.href = '/';
  }
};

export const getNavigationFunction = () => navigationFunction;