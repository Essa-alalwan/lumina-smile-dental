# Front-end improvements — implementation plan

Four packs, all front-end only. Skipping items already done (booking labels/validation, mobile menu a11y, sticky safe areas).

---

## Pack 1 — Trust & SEO

### 1.1 Hero trust strip
Add a horizontal badge row directly under the hero CTAs (`HeroSection.tsx`):
- 12+ Years · 500+ Patients · Google 4.9★ · Sterilization Certified
- Small icons + white/80 text on translucent pill backgrounds
- Hidden on `xs`, visible from `sm` up; respects reduced motion

### 1.2 FAQ accordion section
New component `FAQSection.tsx` using existing shadcn `Accordion`:
- 6 questions: pricing & insurance, languages spoken (EN/AR), parking at Seef, first visit expectations, payment methods, emergency hours
- Inserted in `Index.tsx` between `PatientExperience` and `Logistics`
- Section id `#faq`, added to navbar links

### 1.3 JSON-LD structured data
Inject `Dentist` / `LocalBusiness` schema in `index.html` (static `<script type="application/ld+json">`) using values from `siteContact.ts` mirrored as constants:
- name, image, address (Seef, Manama, BH), telephone, openingHours, priceRange, geo (approx Seef coords), url

### 1.4 Meta + lang refresh
- `index.html`: `<html lang="en">` already set; update description to mention Bahrain/Seef
- Update `og:image` alt copy; keep URL placeholder until real asset exists (note in comment)

---

## Pack 2 — Booking polish

### 2.1 Bahrain phone hint
- Add visible helper text under phone field: *Format: +973 XXXX XXXX*
- Update `phoneError` message to suggest Bahrain format

### 2.2 Confirmation summary
Replace generic success card content in `BookingSection.tsx` (lines 192–233) with a structured summary:
- Name, Service, Date (`format(selectedDate, "EEEE, MMM d")`), Time (`selectedSlot`), Phone, Email
- "We'll call to confirm within 1 business hour" reassurance line
- Keep "Book Another" reset

### 2.3 Require time slot before submit
Add `selectedSlot` validation; show error near time field if empty on submit.

---

## Pack 3 — Smile Transformations polish

In `SmileTransformationsSection.tsx`:

### 3.1 Animated tap hint
- Replace static text hint badge with subtle pulsing finger/hand icon overlay on first card only, fading out after first interaction or 4s
- Use Tailwind `animate-pulse` on a small pill that says "Tap to compare"
- Respects `useMotionReduced`

### 3.2 Lazy load + better alt
- Add `loading="lazy"` and `decoding="async"` to all 6 transformation `<motion.img>` tags
- Improve alt text: e.g. *"Before — discolored, uneven upper teeth"* / *"After porcelain veneers — natural, aligned smile"*

---

## Pack 4 — Mobile UX

### 4.1 WhatsApp FAB
Update `StickyBooking.tsx`:
- Mobile bar: replace single phone-icon button with two icons — WhatsApp (green) + Phone — keeping Book CTA as flex-1
- Desktop floating: add WhatsApp pill below the Book button
- Add `CONTACT.whatsapp` constant in `siteContact.ts` (defaults to phoneTel) and `WHATSAPP_HREF = https://wa.me/<digits>`

### 4.2 Section gradient dividers
- Add a thin gradient transition (`bg-gradient-to-b from-transparent to-surface` 24px tall block) at the top of `BookingSection`, `SmileTransformationsSection`, and `LogisticsSection` to soften hard color stops
- Implementation: a `<div aria-hidden className="h-6 -mt-6 bg-gradient-to-b from-transparent to-[current-section-bg]">` or a simple `before:` pseudo on the `<section>`

---

## Files

**Created**
- `src/components/FAQSection.tsx`

**Edited**
- `index.html` — JSON-LD script, meta description tweak
- `src/lib/siteContact.ts` — add `whatsapp`, `WHATSAPP_HREF`
- `src/components/HeroSection.tsx` — trust strip
- `src/components/BookingSection.tsx` — phone hint, slot validation, summary card
- `src/components/SmileTransformationsSection.tsx` — animated hint, lazy/alt
- `src/components/StickyBooking.tsx` — WhatsApp button(s)
- `src/components/Navbar.tsx` — add FAQ link
- `src/pages/Index.tsx` — insert `<FAQSection />`
- Section components (Booking/Transformations/Logistics) — gradient divider div

## Out of scope
- Arabic toggle (separate large effort — will scope later if desired)
- Real og-image asset (needs design upload)
- Removing TanStack Query (needs full audit pass)
