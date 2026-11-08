# Cleaning Service — Modern Web Application

A modern, responsive, high-performance web application designed for a premium cleaning services business specializing in **Residential**, **Commercial**, and **Deep Cleaning** services.

Built with **React 18**, **Vite**, **Lucide Icons**, and an accessible modern CSS design token system.

---

## 🌟 Key Features

- **Dynamic Hero Slider**: Interactive carousel showcasing cleaning services with smooth transitions, category highlights, and quick-action buttons.
- **Detailed Service Showcase**: Highlight cards for Residential Cleaning, Commercial Office Sanitization, and Deep Cleaning Restoration with checklists.
- **Interactive Booking Dialog**: Modal pop-up window triggered by any "Book Appointment" button, providing direct telephone dispatch calling and email reservation actions.
- **Why Choose Us Section**: Visual cards showcasing core pillars: _Professional & Trustworthy_, _Attention to Detail_, _Reliable & On Time_, and _Customer Satisfaction_.
- **4-Step Cleaning Process**: Step-by-step visual workflow explaining how booking, inspection, expert execution, and quality checks occur.
- **Client Testimonials Carousel**: Rotating client reviews highlighting verified feedback from homeowners and facility managers.
- **Cleaning Tips & Educational Modal**: Interactive article cards with an accessible modal reader for home and office cleaning guides.
- **Responsive Navigation**: Desktop sticky header with quick links and a slide-out mobile navigation drawer.
- **Accessibility (a11y)**: Semantic HTML5 landmarks, ARIA dialog roles, accessible keyboard navigation (`Tab`, `Escape`, arrow keys), and focus traps.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Modular CSS3 with CSS custom properties (design tokens), CSS Grid, and Flexbox

---

## 📋 Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Version **18.x** or higher recommended)
- **npm** (comes with Node.js), **pnpm**, or **yarn**

Verify installation:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started

Follow these steps to clone the repository and run the development server locally:

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/cleaning-service.git
cd cleaning-service
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Once the Vite development server starts, open your browser and navigate to:

```
http://localhost:5173
```

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This compiles minified, bundled assets into the `dist/` directory ready for deployment on platforms such as Netlify, Vercel, Cloudflare Pages, or AWS S3.

To preview the production build locally:

```bash
npm run preview
```

---

## ⚙️ Configuration & Customization

### 1. Company Information & Contact Details

All primary business configuration is centralized in [`src/config/siteConfig.js`](file:///src/config/siteConfig.js):

```javascript
export const siteConfig = {
  companyName: "Cleaning Service",
  brandName: "Cleaning Service",
  tagline: "Clean Spaces. Better Living.",
  slogan: "Your Space, Perfected.",

  contact: {
    phone: "+234 800 CLEANING",
    phoneRaw: "+2341234567890",
    email: "info@cleaningservice.com",
    location: "Lagos, Nigeria",
    workingHours: "Monday – Saturday: 8:00 AM – 6:00 PM",
  },

  socials: {
    instagram: "https://instagram.com/cleaningservice",
    x: "https://x.com/cleaningservice",
    facebook: "https://facebook.com/cleaningservice",
    youtube: "https://youtube.com/@cleaningservice",
  },
};
```

### 2. Google Analytics

To activate Google Analytics tracking:

1. Open [`index.html`](file:///index.html).
2. Locate the placeholder tag:
   ```html
   <script
     async
     src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"
   ></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag() {
       dataLayer.push(arguments);
     }
     gtag("js", new Date());
     gtag("config", "G-XXXXXX");
   </script>
   ```
3. Replace both instances of `G-XXXXXX` with your actual Google Analytics Measurement ID.

### 3. Logo & Branding

- **Logo Component**: [`src/components/Logo.jsx`](file:///src/components/Logo.jsx)
- **Vector Logo Placeholder**: [`src/assets/logo/placeholder-logo.svg`](file:///src/assets/logo/placeholder-logo.svg)
- **Favicon**: [`public/favicon.svg`](file:///public/favicon.svg)

### 4. Modifying Content & Images

All data files are located in `src/data/`:

- **Hero Banner Slides**: [`src/data/heroSlides.js`](file:///src/data/heroSlides.js)
- **Services Catalog**: [`src/data/services.js`](file:///src/data/services.js)
- **Client Reviews**: [`src/data/testimonials.js`](file:///src/data/testimonials.js)
- **Cleaning Insights & Articles**: [`src/data/articles.js`](file:///src/data/articles.js)

---

## 📁 Project Directory Structure

```text
cleaning-service/
├── public/
│   └── favicon.svg           # Application favicon
├── src/
│   ├── assets/
│   │   ├── images/           # Local static image assets
│   │   └── logo/
│   │       └── placeholder-logo.svg # Vector placeholder logo
│   ├── components/
│   │   ├── ArticleCard.jsx   # Article card component
│   │   ├── ArticleDialog.jsx # Accessible article modal reader
│   │   ├── BackToTop.jsx     # Smooth scroll to top button
│   │   ├── BookingCTA.jsx    # Mid-page appointment CTA banner
│   │   ├── BookingDialog.jsx # Appointment contact modal dialog
│   │   ├── CleaningProcess.jsx # 4-step process timeline
│   │   ├── Footer.jsx        # Footer with links and socials
│   │   ├── HeroSlider.jsx    # Hero slider with slide controls
│   │   ├── Logo.jsx          # Brand logo lockup component
│   │   ├── Navbar.jsx        # Sticky navigation header
│   │   ├── SectionHeading.jsx# Reusable section title / subtitle
│   │   ├── ServiceCard.jsx   # Service feature card
│   │   ├── ServicesSection.jsx # Services container grid
│   │   ├── TestimonialsSlider.jsx # Client reviews carousel
│   │   └── WhyChooseUs.jsx   # Value proposition cards
│   ├── context/
│   │   └── BookingContext.jsx # Global modal trigger state
│   ├── data/
│   │   ├── articles.js       # Tips & editorial content
│   │   ├── heroSlides.js     # Hero carousel slides & images
│   │   ├── services.js       # Cleaning services data
│   │   └── testimonials.js   # Client reviews & ratings
│   ├── sections/
│   │   ├── AboutSection.jsx  # Company about section
│   │   └── TipsSection.jsx   # Cleaning tips grid section
│   ├── styles/
│   │   ├── components.css    # Component-specific styles
│   │   ├── global.css        # Reset, fonts, and design tokens
│   │   └── responsive.css    # Media queries for tablet & mobile
│   ├── App.jsx               # Root application layout
│   └── main.jsx              # Application DOM entry point
├── index.html                # HTML entry point with meta tags
├── package.json              # Project dependencies & scripts
├── vite.config.js            # Vite build configuration
└── README.md                 # Project documentation
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
