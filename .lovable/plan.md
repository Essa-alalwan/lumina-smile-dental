

# Lumina Dental — Premium Dental Clinic Website

## Overview
A single-page, conversion-optimized dental clinic website with smooth scroll navigation, transparent-to-solid navbar, RTL-ready structure, and a UI-only mock booking system. Every section is designed to build trust and minimize booking friction.

## Design System
- **Colors**: White `#FFFFFF`, Light Gray `#F7F8FA`, Teal `#0D9488`, Soft Gold `#C9A84C`, Dark Navy `#1A2340`, Medium Gray `#6B7280`
- **Typography**: Plus Jakarta Sans (headings + body), generous spacing
- **Cards**: 12px radius, soft shadows. Buttons: 8px radius
- **RTL-ready**: Use logical CSS properties (`ms-`, `me-`, `ps-`, `pe-`) and `dir` attribute support

## Navigation
- Transparent navbar over hero, transitions to solid white on scroll
- Logo left, section links (Services, About, Testimonials, Contact), "Book Appointment" CTA button right
- Mobile: hamburger menu with slide-out drawer

## Section 1 — Hero
- Full-width Unsplash background (warm dental/smile image) with dark overlay
- Patient-outcome-focused headline (best of 3 generated options)
- Subheadline covering general, cosmetic, and emergency care
- Reassurance line: "Comfortable, modern, and always patient-first"
- Two CTAs: "Book Appointment" (primary teal) + "View Our Services" (outlined)

## Section 2 — Booking
- 5-day week view showing time slots with service type, time, and duration
- Service filter tabs: All / General / Cosmetic / Emergency
- Soft note: "Book ahead — slots fill quickly"
- Mobile: collapses to single-day view with date picker
- Booking form: Name, Phone, Email, Service dropdown, Preferred Time
- Submit → inline confirmation message (no redirect, no backend)

## Section 3 — Services
- 3-column grid (1 col mobile, 2 tablet, 3 desktop)
- Three categories: General Care (3 services), Cosmetic Treatments (3 services), Emergency Care (1 service)
- Each card: Lucide icon + name + one-line description + "Learn More" anchor
- Cosmetic cards get a subtle gold border/accent treatment

## Section 4 — Authority & Trust
- Doctor profile card with photo placeholder, name, credentials, bio
- Stats row: 500+ Patients, 12+ Years, 98% Satisfaction, Advanced Digital Imaging
- Technology highlights: 3 icon cards (Digital X-Rays, Painless Injection, 3D Smile Preview)
- Clinic interior Unsplash image

## Section 5 — Social Proof
- 4 testimonial cards (horizontal scroll on mobile, grid on desktop) with 5-star ratings
- Topics: comfort, cosmetic result, emergency speed, friendly staff
- "Smile Transformations" tab section with 2 before/after placeholder image pairs

## Section 6 — Patient Experience
- 4 feature blocks with icons: Comfortable Environment, Friendly Team, Modern Equipment, Personalized Care
- Warm, approachable copy

## Section 7 — Logistics
- Google Maps static placeholder
- Working hours table
- Appointment duration guide
- 3-step visual flow: Book → Confirm → Visit
- Insurance/payment note

## Section 8 — Final CTA
- Bold headline ("Your Best Smile Starts Here"), subline, single "Book Your Appointment" button
- Soft gradient background

## Sticky Element
- Desktop: floating "Book Appointment" button (bottom-right)
- Mobile: full-width sticky bottom bar with CTA + phone number, 44px min tap targets

## Technical Notes
- Single-page with smooth scroll anchors
- All placeholder content clearly labeled for easy swapping
- RTL support via logical CSS properties and `dir="rtl"` compatibility
- Mobile-first responsive design throughout
- No horizontal scroll anywhere

