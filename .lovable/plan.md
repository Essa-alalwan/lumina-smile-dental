

# Upgrade Before & After / Smile Transformations

## Current State
The "Smile Transformations" area is hidden behind a toggle button at the bottom of the Testimonials section. It shows two cards with plain colored boxes labeled "Before" and "After" — no imagery, no interactivity, minimal visual impact.

## Proposed Upgrade

### 1. Promote to its own section
Move Before & After out of TestimonialsSection into a dedicated `SmileTransformationsSection.tsx`, placed between Testimonials and Patient Experience. This gives it the visual weight it deserves for cosmetic-focused patients — the highest-value audience.

### 2. Interactive image slider
Replace static side-by-side boxes with a **draggable slider** overlay. One image fills the card; a vertical divider handle lets the user drag left/right to reveal the before vs. after. This is the industry-standard pattern for cosmetic results and feels premium.

Each transformation card:
- Full-width Unsplash smile images (placeholder) with the slider overlay
- Treatment label (e.g. "Porcelain Veneers", "Professional Whitening", "Smile Design")
- A short result note ("8 veneers, completed in 2 visits")
- "Results may vary" disclaimer

### 3. More cases
Expand from 2 to 3 transformation cards: Veneers, Whitening, and Smile Design — matching the three cosmetic services.

### 4. Visual treatment
- Section heading: "Smile Transformations" with subline "See what's possible"
- Gold accent border on cards (matching the cosmetic cards in Services)
- Subtle entrance animations on scroll

### 5. Layout
- Desktop: 3-column grid
- Tablet: 2 columns (third card full-width below)
- Mobile: single column, stacked

## Files Changed
- **New**: `src/components/SmileTransformationsSection.tsx` — dedicated section with slider component
- **Edit**: `src/components/TestimonialsSection.tsx` — remove the existing toggle/before-after block
- **Edit**: `src/pages/Index.tsx` — insert new section between Testimonials and PatientExperience

## Technical Detail
The slider will be a custom component using pointer events (mouse + touch) to track drag position and apply a `clip-path: inset(0 X% 0 0)` on the "after" image. No extra dependencies needed.

