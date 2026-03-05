# Security Check Report – The Yard Café Website

**Date:** 2025  
**Scope:** Full codebase (HTML, JS, CSS, .htaccess); no backend/PHP in use.

---

## Summary

| Severity | Count | Status |
|----------|--------|--------|
| High     | 0     | —      |
| Medium   | 1     | Documented + mitigation |
| Low      | 4     | Documented; some fixed  |

**Overall:** No critical vulnerabilities found. One medium issue (exposed API token) and several low-risk items; XSS risks in JS have been reduced with escaping and safe URLs.

---

## 1. Credentials / secrets

### Eventbrite API token in front-end (Medium)

- **Where:** `js/eventbrite-integration.js` (around line 8)  
- **What:** `EVENTBRITE_TOKEN = 'YOSZKIXRQRGQOQXFJEKD'` is in client-side code, so anyone can see and reuse it.
- **Risk:** Token could be used to call Eventbrite API (e.g. list/organizer data). Impact is limited to what this token can do (e.g. read-only public events).
- **Recommendation:** Prefer moving Eventbrite calls to a small server/backend or serverless function and keep the token there. If you keep it in the front-end, consider a token with minimal scope and monitor usage in Eventbrite.

---

## 2. XSS (cross-site scripting)

### Fixed in this check

- **Eventbrite integration (`js/eventbrite-integration.js`):**
  - Error message from the catch block was inserted into `innerHTML` without escaping; it is now escaped so it cannot inject HTML/script.
  - Event title, venue name, and “Get Tickets” URL from the API are now escaped/validated:
    - Title and venue: passed through an `escapeHtml()` helper.
    - URL: only `https://` URLs are used; otherwise the link is `#`.
  - “Get Tickets” link now has `rel="noopener noreferrer"`.

- **Local events (`js/local-events.js`):**
  - Events come from `localStorage` or hardcoded demo data. To prevent XSS if that data were ever compromised or tampered with:
    - Event name and venue are passed through `escapeHtml()`.
    - Stripe and Eventbrite links are restricted to `https://` via a `safeHref()` helper.
  - External links now use `rel="noopener noreferrer"`.

### Already low risk (no change)

- **`js/event-filtering.js`:** Uses a hardcoded events array and only formats dates; no user or API content in HTML. Risk remains low.
- **`load-nav.js` / `load-footer.js`:** Load HTML from your own `includes/`. Risk is low as long as those files are not editable by untrusted users.
- **Cognito/WebFont inline scripts in HTML:** Use fixed strings; no user input. Risk is low.

---

## 3. Server / .htaccess

- **Good:**
  - Symlink and directory listing settings.
  - Sensitive file patterns and PHP blocked.
  - Malicious query-string and User-Agent patterns blocked.
  - Security headers: `X-Frame-Options`, `X-XSS-Protection`, `X-Content-Type-Options`, `Referrer-Policy`.
  - MIME types and allowed file types (e.g. images, HTML) are set.
- **CSP:** Content-Security-Policy is commented out. Enabling it later (with `unsafe-inline`/`unsafe-eval` reduced where possible) would strengthen policy; test thoroughly before enabling.

---

## 4. Third-party scripts and links

- **jQuery (CloudFront):** Loaded with `integrity` and `crossorigin` (SRI). Good.
- **Font Awesome (cdnjs):** Loaded with `integrity` and `crossorigin`. Good.
- **Cognito, Google (e.g. Analytics/WebFont), Instagram, Mailchimp, Eventbrite:** No SRI. Risk is “supply chain”: if the provider is compromised, their script could change. Mitigation: keep dependencies to a minimum and use trusted CDNs; consider SRI where the provider publishes hashes.
- **Mixed content:** No scripts or critical resources loaded over `http://`; schema/comment URLs use `http` only in attributes/comments. OK.

---

## 5. Other points

- **Inline event handlers (e.g. `onclick`):** Used in `evenings.html` for “Add to Calendar”. They use fixed strings, not user input, so XSS risk from them is low. For stricter CSP later, you could move to `addEventListener` and avoid inline handlers.
- **No `eval` / `Function` / `document.write`** in your own code; no obvious backdoors or suspicious patterns in the scanned files.
- **Sensitive folders:** `_Do-Not-Upload` and any “do not upload” / backup folders are not referenced by the live site; keeping them out of deployment is correct.

---

## 6. Checklist (quick reference)

- [x] No hardcoded passwords or high-risk secrets (only Eventbrite token; see above).
- [x] XSS: API and localStorage-derived content escaped or validated in updated JS.
- [x] External links: only `https` used for Stripe/Eventbrite; `rel="noopener noreferrer"` added where relevant.
- [x] .htaccess: security headers, blocking rules, and MIME/config in place.
- [x] Core third-party scripts (jQuery, Font Awesome) loaded with SRI.
- [ ] Eventbrite token: consider moving to server-side or limiting scope (recommended).
- [ ] CSP: consider enabling and tightening after testing (optional).

---

## Files changed in this security pass

- `js/eventbrite-integration.js` – Error message escaping; `escapeHtml`; safe URL and escaped title/venue for event HTML.
- `js/local-events.js` – `escapeHtml` and `safeHref`; escaped names/venue; safe links and `rel="noopener noreferrer"`.

No HTML or .htaccess files were modified in this round; previous hardening was left as is.
