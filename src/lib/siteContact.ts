/**
 * Single source of truth for public contact info, location, and site URL.
 * Used by Navbar, Footer, Logistics, StickyBooking, and meta tags (see index.html).
 */
export const SITE_URL = "https://luminadental.com" as const;

export const CONTACT = {
  brandName: "Lumina Dental",
  phoneDisplay: "+973 1234 5678",
  /** Use in `tel:` links (E.164). */
  phoneTel: "+97312345678",
  email: "hello@luminadental.com",
  cityRegion: "Manama, Bahrain",
  addressLine1: "Building 123, Road 456, Block 789",
  postalCode: "317",
  fullAddress: "Building 123, Road 456, Block 789, Seef District, Manama, Bahrain",
} as const;

export const CONTACT_TEL_HREF = `tel:${CONTACT.phoneTel}` as const;
export const CONTACT_MAILTO_HREF = `mailto:${CONTACT.email}` as const;

export const CONTACT_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT.fullAddress,
)}` as const;
