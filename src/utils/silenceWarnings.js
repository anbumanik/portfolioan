/**
 * This utility silences specific, known library-level warnings and
 * unavoidable browser/ad-blocker network errors that clutter the console.
 */
export function silenceUnavoidableWarnings() {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args) => {
    // Silence THREE.Clock deprecation (internal to R3F)
    if (typeof args[0] === 'string' && args[0].includes('THREE.Clock: This module has been deprecated')) {
      return;
    }
    originalWarn(...args);
  };

  console.error = (...args) => {
    // Silence common Ad-Blocker related Firestore / Placeholder blocks
    if (typeof args[0] === 'string' && (args[0].includes('blocked by client') || args[0].includes('ERR_BLOCKED_BY_CLIENT'))) {
      return;
    }
    originalError(...args);
  };
}
