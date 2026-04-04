# Frontend implementation plan — Lumina Smile Studio

This document turns the agreed frontend improvement suggestions into **actionable tasks** with **checklists** for step-by-step tracking. It does **not** include code — only implementation guidance and completion criteria.

**Scope:** Frontend only (React/Vite/Tailwind/shadcn). No backend APIs or server logic.

---

## How to use this document

- Work **section by section** in the order below, or parallelize sections that do not depend on each other (noted where relevant).
- Check off each item when it is **done and verified** (browser, responsive view, and accessibility spot-check as applicable).
- **Dependencies:** Sections 1–2 (content/trust) and Section 3 (booking) are the highest user-facing impact; Section 4 (a11y) pairs well with Section 3; Section 5 (layout) after Section 6 (sticky bar) visibility; Section 7 (perf) can overlap with Section 1.

---

## 1. Content, trust, and brand consistency

**Goal:** Remove placeholder copy, align navigation and meta tags with a real deployment, and make the brand feel intentional end-to-end.

### Tasks

- [ ] **1.1 — Centralize contact constants**  
  Define a single source of truth for phone number, email, city/region, and full address (e.g. one small module or constants file used by Navbar, Footer, Logistics, StickyBooking).  
  **Verify:** Search the repo for `XXX`, `City, Country`, and old placeholder strings — none should remain in UI.

- [ ] **1.2 — Navbar logo link**  
  Change the brand link from a bare `#` to the real home target (`/` or `#top` with matching `id` on the main wrapper).  
  **Verify:** Logo returns to top of home; keyboard focus order is sensible.

- [ ] **1.3 — Meta tags and canonical URL**  
  Update `index.html`: `canonical`, `og:url`, `og:image`, `twitter:image`, and descriptions to match your **live domain** and **real branded assets** (replace generic or third-party preview images).  
  **Verify:** Share debugger (e.g. Facebook/Twitter card validators) or manual inspection of meta tags in built HTML.

- [ ] **1.4 — Phone and mail `href` values**  
  Ensure `tel:` and `mailto:` links use the same normalized values as visible text (no broken `tel:+XXX`).

---

## 2. Booking section — state, UX, and form correctness

**Goal:** One coherent booking experience on mobile and desktop; forms that are understandable and internally consistent.

### Tasks

- [ ] **2.1 — Unify “selected day” state**  
  Merge mobile date picker state and desktop week-strip state so **slot generation always uses the same day** the user selected.  
  **Verify:** On a narrow viewport, pick a date in the calendar and confirm slots match that day’s logic; on desktop, switching days updates slots predictably.

- [ ] **2.2 — Visible labels and field association**  
  For every input and the service selector, add visible `<label>` elements (or `aria-label` where a visible label is not desired) and associate `htmlFor` / `id` correctly.  
  **Verify:** Clicking label focuses control; screen reader announces each field.

- [ ] **2.3 — Controlled service select**  
  Wire the service `<Select>` to React state; include the chosen service in the success state or confirmation copy if you show a summary.  
  **Verify:** Changing service updates state; submitting reflects the selection.

- [ ] **2.4 — Optional validation messaging**  
  Add clear, inline error messages for invalid email/phone if you validate on submit or blur (still frontend-only).  
  **Verify:** Invalid patterns show helpful text; valid submit still works.

- [ ] **2.5 — “Learn more” on service cards**  
  Either link each card to a dedicated anchor/section, open a small modal/drawer with copy, or change the CTA text to match behavior (e.g. “Book this service”) if all links go to `#booking`.  
  **Verify:** User expectation matches what happens on click.

---

## 3. Accessibility — navigation, landmarks, and motion

**Goal:** Meet common WCAG-oriented practices for keyboard users, screen reader users, and users who disable motion.

### Tasks

- [ ] **3.1 — Skip link**  
  Add a “Skip to main content” link as the first focusable element; hide until focused; target `id` on `<main>` or equivalent.  
  **Verify:** Tab once from page load reveals skip link; activating it moves focus to main content.

- [ ] **3.2 — Main landmark**  
  Wrap primary page content in `<main>` with a stable `id` matching the skip link.  
  **Verify:** Landmark outline (browser devtools or a11y tree) shows one logical main region.

- [ ] **3.3 — Mobile menu semantics**  
  Add `aria-expanded`, `aria-controls` (and id on the panel), and close on Escape; consider focus return to the menu button when closing.  
  **Verify:** Screen reader announces menu state; Escape closes menu.

- [ ] **3.4 — Optional focus trap for mobile menu**  
  While open, keep tab order inside the menu (Radix Dialog/Sheet patterns can help if you refactor).  
  **Verify:** Tab cycling does not escape the menu until closed.

- [ ] **3.5 — `prefers-reduced-motion`**  
  Use Framer Motion’s reduced-motion hook or CSS media query to shorten or disable non-essential animations.  
  **Verify:** With OS “Reduce motion” on, hero and section animations are minimal or static.

---
## 4. Layout — sticky bar and safe areas


**Goal:** Prevent the fixed mobile CTA from obscuring footer content and respect notched devices.

### Tasks

- [x] **4.1 — Bottom padding when sticky is visible**  
  When the mobile sticky bar is shown, add sufficient `padding-bottom` on the scrollable page (or body) so the last sections remain readable above the bar.  
  **Verify:** Scroll to footer on a phone-sized viewport; no text or buttons hidden behind the bar.

- [x] **4.2 — Safe area insets**  
  Use `env(safe-area-inset-bottom)` (and related) on the sticky container or page padding for notched devices.  
  **Verify:** In device simulator or real device, content clears the home indicator.

---

## 5. Logistics / map — usefulness without a backend

**Goal:** Replace the map placeholder with something actionable (still frontend-only).

### Tasks

- [x] **5.1 — Choose map presentation**  
  Pick one: static image + “Open in Maps” link, embedded map iframe (if allowed by provider and privacy policy), or external link only.  
  **Verify:** Click opens correct location in maps app or browser.

- [x] **5.2 — Align address copy**  
  Ensure map link, visible address, and Section 1 constants all match.

---

## 6. Performance — fonts, images, and bundle hygiene

**Goal:** Faster perceived load and better Core Web Vitals where possible without backend changes.

### Tasks

- [x] **6.1 — Font loading strategy**  
  Move off blocking `@import` if needed: use `preconnect` to Google Fonts and/or self-host WOFF2 with `font-display: swap`.  
  **Verify:** Lighthouse or Network panel shows improved font chain; no FOIT where avoidable.

- [x] **6.2 — Hero image optimization**  
  Provide responsive sources (`srcSet`/`sizes`) or a single compressed asset; keep LCP image `fetchpriority` high / `loading` appropriate for hero.  
  **Verify:** LCP image size drops on mobile; no layout shift from image load.

- [x] **6.3 — Lazy-load non-critical images**  
  Use `loading="lazy"` for below-the-fold images.  
  **Verify:** Hero stays eager; lower images defer.

- [x] **6.4 — Optional: remove unused client deps**  
  If TanStack Query is unused after audit, remove provider and dependency to reduce bundle (only after confirming no `useQuery` usage).  
  **Verify:** Build succeeds; bundle size reduced.

---

## 7. Error page and developer noise

**Goal:** A polished 404 without noisy production logging.

### Tasks

- [x] **7.1 — 404 logging**  
  Gate `console.error` in `NotFound` behind `import.meta.env.DEV` or remove it.  
  **Verify:** Production build does not log 404s to console on normal navigation.

- [x] **7.2 — 404 UX**  
  Optionally use `<Link to="/">` from react-router for SPA navigation instead of full page `<a href="/">`.  
  **Verify:** 404 → home navigation is instant and accessible.


---

## 8. Dark mode — decide and implement consistently

**Goal:** Either ship a theme toggle or avoid implying dark mode support.

### Tasks

- [x] **8.1 — Product decision**  
  Choose: **A)** Add theme toggle (e.g. `next-themes` already in dependencies) and persist preference, or **B)** stay light-only and document that dark tokens are unused for now.

- [x] **8.2 — Implement chosen option**  
  If **A:** wire toggle, test all sections in dark mode. If **B:** no UI change; optionally trim unused `.dark` documentation comments only (do not break future theming unless intentional).

---

## Final verification checklist (release gate)

Use this before merging or releasing:

- [ ] No placeholder phone, address, or city strings in UI.
- [ ] Meta tags and social images match production domain and branding.
- [ ] Booking flow: same day selection on mobile and desktop; labels and service select work.
- [ ] Skip link + main landmark; mobile menu keyboard and Escape behavior OK.
- [ ] Sticky mobile bar does not cover footer; safe areas respected.
- [x] Map/location block is useful and accurate.
- [x] Fonts and hero image load efficiently; lazy below-fold images.
- [x] 404 page does not spam production console.
- [x] Dark mode decision implemented consistently.

---

## Suggested implementation order (reference)

1. Section 1 — Content + meta (unblocks trust and sharing).  
2. Section 2 — Booking (fixes functional mismatch on mobile).  
3. Section 4 — Sticky layout (quick win once booking section height is stable).  
4. Section 3 — Accessibility (parallel with 2 where possible).  
5. Section 5 — Map.  
6. Section 6 — Performance.  
7. Section 7 — 404.  
8. Section 8 — Dark mode decision.

---

*End of implementation plan.*
