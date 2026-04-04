/**
 * Single source of truth for public contact info, location, and site URL.
 * Used by Navbar, Footer, Logistics, StickyBooking, and meta tags (see index.html).
 */
export const SITE_URL = "https://luminadental.com" as const;

export const CONTACT = {
  brandName: "Lumina Dental",
  phoneDisplay: "+1 (555) 234-5678",
  /** Use in `tel:` links (E.164). */
  phoneTel: "+15552345678",
  email: "hello@luminadental.com",
  cityRegion: "San Francisco, CA",
  addressLine1: "123 Market Street, Suite 400",
  postalCode: "94103",
  fullAddress: "123 Market Street, Suite 400, San Francisco, CA 94103",
} as const;

export const CONTACT_TEL_HREF = `tel:${CONTACT.phoneTel}` as const;
export const CONTACT_MAILTO_HREF = `mailto:${CONTACT.email}` as const;

export const CONTACT_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT.fullAddress,
)}` as const;
