/**
 * Cleaning Service Website Configuration
 * Single source of truth for site settings and contact information.
 */

export const siteConfig = {
  companyName: "Cleaning Service",
  brandName: "Cleaning Service",
  tagline: "Clean Spaces. Better Living.",
  slogan: "Your Space, Perfected.",

  // Navigation Links
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Our Process", href: "#process" },
    { label: "Tips", href: "#tips" },
    { label: "Testimonials", href: "#testimonials" },
  ],

  // Contact Details (Configurable Placeholders)
  contact: {
    phone: "+234 800 CLEANING",
    phoneRaw: "+2349167741711",
    email: "info@cleaningservice.com",
    location: "Lagos, Nigeria",
    workingHours: "Monday – Saturday: 8:00 AM – 6:00 PM",
  },

  // Social Channels
  socials: {
    instagram: "https://instagram.com/cleaningservice",
    x: "https://x.com/cleaningservice",
    facebook: "https://facebook.com/cleaningservice",
    youtube: "https://youtube.com/@cleaningservice",
  },

  // Developer Credit
  developer: {
    name: "Pius Odiahi",
    url: "https://sygnate.com",
  },

  // Brand Palette Hex Codes
  colors: {
    primaryNavy: "#08111F",
    secondaryNavy: "#24324A",
    primaryGold: "#D29A32",
    lightGold: "#DFAF4F",
    darkGold: "#BA8425",
    white: "#FFFFFF",
    neutralLight: "#F8FAFC",
  },
};
