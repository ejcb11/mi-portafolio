/**
 * Enterprise Frontend Security & Runtime Integrity Module
 * Protects against XSS, Prototype Pollution, Clickjacking, URL Parameter Tampering,
 * Email Harvesting Bots, and Unauthorized State Mutation.
 */

/**
 * Recursively freezes an object and all its nested properties/arrays
 * to block runtime field manipulation via DevTools or injected scripts.
 */
export function deepFreeze<T>(obj: T): Readonly<T> {
  if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) {
    return obj;
  }

  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as Record<string, unknown>)[prop];
    if (
      value !== null &&
      (typeof value === 'object' || typeof value === 'function') &&
      !Object.isFrozen(value)
    ) {
      deepFreeze(value);
    }
  });

  return obj;
}

/**
 * Obfuscates/decrypts sensitive contact strings at runtime using XOR + Base64
 * so automated bots scanning static JS bundles cannot harvest plain-text emails.
 */
const CIPHER_KEY = 0x5a;

export function decodeProtectedString(encodedBase64: string): string {
  try {
    const binary = atob(encodedBase64);
    let output = '';
    for (let i = 0; i < binary.length; i++) {
      output += String.fromCharCode(binary.charCodeAt(i) ^ CIPHER_KEY);
    }
    return output;
  } catch {
    return '';
  }
}

/**
 * Validates and sanitizes external URLs to strictly allow only HTTPS links
 * and block javascript:, data:, or vbscript: injection vectors.
 */
export function sanitizeExternalUrl(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl, window.location.origin);
    if (parsed.protocol === 'https:') {
      return parsed.href;
    }
    return '#';
  } catch {
    return '#';
  }
}

/**
 * Allowed internal navigation anchor hashes (Whitelist parameterization).
 */
const ALLOWED_HASHES = new Set([
  '',
  '#',
  '#experience',
  '#projects',
  '#skills',
  '#career',
  '#perspective-manifesto',
]);

/**
 * Suspicious query/hash patterns (XSS, SQLi, Prototype Pollution, Path Traversal)
 */
const MALICIOUS_PARAM_PATTERN =
  /(<|>|javascript:|data:|vbscript:|__proto__|constructor|prototype|\bselect\b|\bunion\b|\bdrop\b|\binsert\b|\bdelete\b|--|\.\.\/)/i;

/**
 * Initializes runtime security guards on application startup:
 * 1. Forces HTTPS in production environments.
 * 2. Strips unauthorized/malicious query parameters and invalid hashes.
 * 3. Purges any non-essential or insecure cookies (Zero-Cookie Privacy Shield).
 * 4. Prevents framing (Frame-busting defense in depth).
 */
export function initSecurityGuard(): void {
  if (typeof window === 'undefined') return;

  // 1. Force HTTPS on production domains (excluding localhost / 127.0.0.1)
  const { protocol, hostname, href, pathname, hash } = window.location;
  const isLocalhost =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.');

  if (!isLocalhost && protocol === 'http:') {
    window.location.replace(href.replace(/^http:/i, 'https:'));
    return;
  }

  // 2. Anti-Clickjacking Frame-Busting Defense
  try {
    if (window.self !== window.top && window.top) {
      window.top.location.replace(window.self.location.href);
    }
  } catch {
    // Blocked by cross-origin policy; X-Frame-Options: DENY handles this at HTTP level
  }

  // 3. Query Parameter & Hash Sanitization (Parameterized Whitelist)
  const searchParams = new URLSearchParams(window.location.search);
  let shouldCleanUrl = false;

  // Strip any unexpected or malicious query parameters on the static portfolio
  for (const [key, value] of searchParams.entries()) {
    if (
      MALICIOUS_PARAM_PATTERN.test(key) ||
      MALICIOUS_PARAM_PATTERN.test(value) ||
      key.length > 64 ||
      value.length > 128
    ) {
      shouldCleanUrl = true;
      break;
    }
  }

  const cleanHash = ALLOWED_HASHES.has(hash) ? hash : '';
  if (hash !== cleanHash) {
    shouldCleanUrl = true;
  }

  if (shouldCleanUrl) {
    window.history.replaceState(null, '', `${pathname}${cleanHash}`);
  }

  // 4. Cookie Protection Shield: Expire any unexpected client-readable cookies
  try {
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = (eqPos > -1 ? cookie.slice(0, eqPos) : cookie).trim();
        if (name) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict;Secure`;
        }
      }
    }
  } catch {
    // Ignore if cookies are disabled by browser policy
  }
}
