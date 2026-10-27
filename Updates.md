# Vedनेत्र (VedNetra) — Project Progress Updates

This file tracks the phase-by-phase development progress of the VedNetra platform for Pandit Rakesh Chandra Rawal.

---

## Phase Overview & Tracking

- [x] **Phase 1: Project Blueprint, Architecture & Requirements Alignment**
  - [x] Analyzed Context.md, Task.md, TechStack.md
  - [x] Designed visual design tokens (Primary `#682e36`, gold accents, sacred textures)
  - [x] Defined complete service catalog & data models
  - [x] Created `Project_Overview.md` with full specifications
  - [x] User alignment confirmed:
    - Booking flow: Hybrid (Ritual, mode, date + Sankalp details + WhatsApp/email summary)
    - Admin portal: Panditji management dashboard included
    - Database: Local PostgreSQL with `.env` configuration

- [x] **Phase 2: Full-Stack Project Setup & Database Initialization**
  - [x] Initialize Express.js backend with PostgreSQL pool/client
  - [x] Create PostgreSQL schema (services, bookings, consultations, inquiries) with seed data
  - [x] Graceful fallback data engine in case user hasn't configured PostgreSQL credentials yet
  - [x] Initialize React + Vite frontend application & install lucide-react icons
  - [x] Configure environment variables (.env & .env.example)

- [x] **Phase 3: Backend REST APIs & Business Logic**
  - [x] Services API (List all Vedic services, filter by category & featured)
  - [x] Bookings API (Create booking with validation, fetch devotee bookings, update status)
  - [x] Consultations API (Ratna Salah, Kundali Milan, Faladesh with birth data)
  - [x] Inquiries API & Health check status endpoint (/api/health)
  - [x] Verified running on http://localhost:5000/api/services

- [x] **Phase 4: Design System & Frontend Architecture**
  - [x] Setup royal Vedic theme CSS variables (Burgundy `#682e36`, Champagne Gold, Parchment Ivory)
  - [x] Add sacred geometric patterns, textured cards, and subtle glow effects
  - [x] Build responsive Navigation Bar, Mobile Drawer, and Sacred Footer
  - [x] Implement seamless scrolling & zero horizontal scroll guarantees

- [x] **Phase 5: Client-Facing Ritual & Consultation Experience**
  - [x] Atmospheric Hero Section with Pandit Rakesh Chandra Rawal introduction
  - [x] Interactive Services Catalog with sub-service tabs and detail modals
  - [x] Interactive Booking & Sankalp Engine (Online vs Offline, Muhurat date picker, Gotra/Devotee details)
  - [x] Ratna Salah & Kundali Consultation portal
  - [x] Panditji Lineage, Gurukul tradition & Bio section
  - [x] Testimonials / Devotee Experiences and FAQ section
  - [x] Direct WhatsApp & quick call integration

- [x] **Phase 6: Admin Dashboard, Quality Assurance & Polish**
  - [x] Admin management portal to view and manage ritual bookings & inquiries
  - [x] Cross-device responsiveness audit (ensuring zero side scroll on mobile)
  - [x] Performance and visual polish (transitions, animations, loading states)
  - [x] Production build validation (`npm run build` passed with zero errors)
  - [x] Final documentation and walkthrough

---

## Activity Log

### [Phase 1: Blueprint & Alignment]
- Read and reviewed all project specifications in [Context.md](file:///c:/Users/shiwa/Desktop/VedNetra/Context.md), [Task.md](file:///c:/Users/shiwa/Desktop/VedNetra/Task.md), and [TechStack.md](file:///c:/Users/shiwa/Desktop/VedNetra/TechStack.md).
- Created [Project_Overview.md](file:///c:/Users/shiwa/Desktop/VedNetra/Project_Overview.md) detailing architecture, services catalog, design aesthetics, and development roadmap.
- Initialized [Updates.md](file:///c:/Users/shiwa/Desktop/VedNetra/Updates.md) for milestone tracking.
- Clarified requirements: Hybrid booking engine with WhatsApp summary, Admin management portal, and local PostgreSQL database setup.

### [Phase 2 & 3: Full-Stack Backend & PostgreSQL Initialization]
- Scaffolded Express.js backend with PostgreSQL pool connection (`pg`) in `backend/src/config/db.js`.
- Implemented PostgreSQL schema creation and auto-seeding of all 12 Vedic services across Katha, Pooja, Dosh Nivaran, Ratna Salah, Abhishekh, and Hawan.
- Configured graceful fallback storage ensuring continuous uptime while allowing credentials configuration via `backend/.env`.
- Built REST API routes and controllers:
  - `GET /api/services` & `GET /api/services/:id`
  - `POST /api/bookings`, `GET /api/bookings`, `PATCH /api/bookings/:id/status`
  - `POST /api/consultations`, `GET /api/consultations`, `PATCH /api/consultations/:id/status`
  - `POST /api/inquiries`, `GET /api/inquiries`, `PATCH /api/inquiries/:id/status`
  - `GET /api/health`

### [Phase 4 & 5: Vedic Luxury Frontend & Client Experience]
- Configured custom design system in `frontend/src/index.css` featuring royal `#682e36` burgundy, champagne gold (`#d4af37`), ivory parchment (`#fcf9f2`), and velvet dark surfaces.
- Integrated Google Fonts: *Cinzel*, *Rozha One*, *Cormorant Garamond*, and *Plus Jakarta Sans*.
- Built modular components:
  - `Navbar.jsx`: Sacred top bar, Devanagari branding, mobile navigation drawer, and Admin portal toggle.
  - `Hero.jsx`: Majestic introduction for Pandit Rakesh Chandra Rawal, credentials statistics, and quick CTAs.
  - `ServicesCatalog.jsx`: Category pills filter, service cards, duration, mode tags, and detail view drawers.
  - `ServiceDetailModal.jsx`: Shastrik significance, samagri info, and booking triggers.
  - `BookingModal.jsx`: Two-step interactive Sankalp form (Ritual selection, Mode, Muhurat date, Gotra, Devotee info, and direct WhatsApp sharing).
  - `AstrologyModal.jsx`: Astrological birth chart data intake (DOB, TOB, POB, Partner details for Kundali Milan, specific queries).
  - `AboutPanditji.jsx`: Bio, Gurukul roots, and philosophical guiding principles.
  - `MuhuratCalendar.jsx`: Auspicious Tithis (Ekadashi, Pradosh, Purnima, Amavasya, Navratri, Ravi Pushya) with ritual mapping.
  - `Testimonials.jsx`: Devotee reviews and ratings from India and abroad.
  - `FaqSection.jsx`: Interactive accordion addressing common ritual queries.
  - `ContactSection.jsx`: Direct message form, contact coordinates, and phone/WhatsApp links.
  - `Footer.jsx`: Sacred Vedic shloka ribbon and categoric offerings.
  - Floating WhatsApp action button for instant mobile connectivity.

### [Phase 6: Admin Portal & Validation]
- Created `AdminPortal.jsx` enabling Panditji to view, search, filter, and change statuses of bookings, consultations, and inquiries.
- Validated Vite production build (`npm run build` succeeded in 7.19s).
- Tested API endpoints via live network requests; verified end-to-end data flow.
- Enforced zero side-scroll on mobile viewports via strict overflow clamp rules.

### [Phase 7: Visual Revamp, Dynamic Animations & Official Logo.png Integration]
- Processed user-provided `Logo.png`:
  - Generated transparent logo asset (`Logo-transparent.png`), cropped high-res logo (`Logo-crop.png`), isolated sun emblem (`Logo-emblem-transparent.png`), and authentic background texture tile (`bg-texture.png`).
  - Integrated official logo into Navbar, Hero badge, favicon, About Panditji card, modals, and Footer.
- Total Theme Overhaul to eliminate dullness:
  - Harmonized with the exact warm textured crimson burgundy `#682e36` from the logo.
  - Paired with vibrant warm flame/saffron (`#ff7a45`) and polished imperial gold (`#d4af37`, `#faedb8`).
  - Applied the authentic logo stone/parchment texture seamlessly across the entire website background.
- Dynamic Vedic Animations Suite:
  - Ambient rotating sun chakra mandala (`@keyframes sacredSpin 75s linear infinite`).
  - Counter-rotating celestial ring (`@keyframes sacredSpinReverse 110s linear infinite`).
  - Floating Diya & embers effect on stats cards (`@keyframes floatDiya 6s ease-in-out infinite`).
  - Divine breathing glow on the official logo emblem (`@keyframes divineGlow`).
  - Radiant light ray shimmer sweep on CTA buttons (`@keyframes shineSweep`).
  - Rhythmic radar pulse wave on floating WhatsApp button (`@keyframes radarRing`).
  - Interactive smooth lift and glow on service cards hover.
- Verified successful production build (`npm run build` succeeded in 526ms).

- [x] **Phase 8: Spacious Logo Optimization & Refined Minimal Luxury Redesign**
  - [x] Resolved logo cramping with generous clear space margins
  - [x] Replaced harsh button illuminations with elegant satin surfaces
  - [x] Balanced visual weight across the entire layout

- [x] **Phase 9: Updated Transparent Logo Integration, Elimination of Green/Yellow & Softened Peach-Sandalwood Palette**
  - [x] Processed updated `Logo.png` into clean alpha-transparent assets
  - [x] Eliminated green/yellow colors across badges and buttons

- [x] **Phase 10: Pure 2-Color Luxury Redesign, Typography Lightening & Transparent WhatsApp Concierge Chatbox**
  - [x] Calibrated pure 2-color luxury system: Royal Burgundy (`#682e36`) + Sandalwood Terracotta (`#ea8b70`) with mix & match depth
  - [x] Re-generated transparent logo assets in exact matching terracotta `#ea8b70` with pure alpha transparency
  - [x] Eliminated unnecessary bold lettering across headings, numbers, buttons, and badges (switched from 800/700 to 500/400)
  - [x] Transformed floating WhatsApp button into a transparent concierge chatbox capsule with live indicator and chat copy
  - [x] Validated production build (`npm run build` in 530ms)

- [x] **Phase 15: Production, Performance & SEO Enhancements Suite (21 Deliverables)**
  - [x] Built all 21 production items: Custom 404, Favicons, Skeletons/Empty states, Toast alerts, Reduced Motion, Custom Social Sharing Images, Analytics Event Tracking, Cookie Consent, Security Headers, Contact Email notifications, Title/Meta SEO, Open Graph & Twitter cards, XML Sitemap, Robots.txt, Canonical tags, Schema.org JSON-LD, Breadcrumbs with microdata, Internal cross-linking, WebP optimization, Lazy loading, and Fast font loading.
  - [x] Passed 21-item automated platform enhancement verification test suite (100% success rate).
  - [x] Passed 17-item full authentication test suite (100% success rate).
  - [x] Verified zero errors in Vite production build.

---

## Activity Log

### [Phase 1: Blueprint & Alignment]
- Read and reviewed all project specifications in [Context.md](file:///c:/Users/shiwa/Desktop/VedNetra/Context.md), [Task.md](file:///c:/Users/shiwa/Desktop/VedNetra/Task.md), and [TechStack.md](file:///c:/Users/shiwa/Desktop/VedNetra/TechStack.md).
- Created [Project_Overview.md](file:///c:/Users/shiwa/Desktop/VedNetra/Project_Overview.md) detailing architecture, services catalog, design aesthetics, and development roadmap.
- Initialized [Updates.md](file:///c:/Users/shiwa/Desktop/VedNetra/Updates.md) for milestone tracking.
- Clarified requirements: Hybrid booking engine with WhatsApp summary, Admin management portal, and local PostgreSQL database setup.

### [Phase 2 & 3: Full-Stack Backend & PostgreSQL Initialization]
- Scaffolded Express.js backend with PostgreSQL pool connection (`pg`) in `backend/src/config/db.js`.
- Implemented PostgreSQL schema creation and auto-seeding of all 12 Vedic services across Katha, Pooja, Dosh Nivaran, Ratna Salah, Abhishekh, and Hawan.
- Configured graceful fallback storage ensuring continuous uptime while allowing credentials configuration via `backend/.env`.
- Built REST API routes and controllers:
  - `GET /api/services` & `GET /api/services/:id`
  - `POST /api/bookings`, `GET /api/bookings`, `PATCH /api/bookings/:id/status`
  - `POST /api/consultations`, `GET /api/consultations`, `PATCH /api/consultations/:id/status`
  - `POST /api/inquiries`, `GET /api/inquiries`, `PATCH /api/inquiries/:id/status`
  - `GET /api/health`

### [Phase 4 & 5: Vedic Luxury Frontend & Client Experience]
- Configured custom design system in `frontend/src/index.css` featuring royal `#682e36` burgundy, champagne gold (`#d4af37`), ivory parchment (`#fcf9f2`), and velvet dark surfaces.
- Integrated Google Fonts: *Cinzel*, *Rozha One*, *Cormorant Garamond*, and *Plus Jakarta Sans*.
- Built modular components:
  - `Navbar.jsx`: Sacred top bar, Devanagari branding, mobile navigation drawer, and Admin portal toggle.
  - `Hero.jsx`: Majestic introduction for Pandit Rakesh Chandra Rawal, credentials statistics, and quick CTAs.
  - `ServicesCatalog.jsx`: Category pills filter, service cards, duration, mode tags, and detail view drawers.
  - `ServiceDetailModal.jsx`: Shastrik significance, samagri info, and booking triggers.
  - `BookingModal.jsx`: Two-step interactive Sankalp form (Ritual selection, Mode, Muhurat date, Gotra, Devotee info, and direct WhatsApp sharing).
  - `AstrologyModal.jsx`: Astrological birth chart data intake (DOB, TOB, POB, Partner details for Kundali Milan, specific queries).
  - `AboutPanditji.jsx`: Bio, Gurukul roots, and philosophical guiding principles.
  - `MuhuratCalendar.jsx`: Auspicious Tithis (Ekadashi, Pradosh, Purnima, Amavasya, Navratri, Ravi Pushya) with ritual mapping.
  - `Testimonials.jsx`: Devotee reviews and ratings from India and abroad.
  - `FaqSection.jsx`: Interactive accordion addressing common ritual queries.
  - `ContactSection.jsx`: Direct message form, contact coordinates, and phone/WhatsApp links.
  - `Footer.jsx`: Sacred Vedic shloka ribbon and categoric offerings.
  - Floating WhatsApp action button for instant mobile connectivity.

### [Phase 6: Admin Portal & Validation]
- Created `AdminPortal.jsx` enabling Panditji to view, search, filter, and change statuses of bookings, consultations, and inquiries.
- Validated Vite production build (`npm run build` succeeded in 7.19s).
- Tested API endpoints via live network requests; verified end-to-end data flow.
- Enforced zero side-scroll on mobile viewports via strict overflow clamp rules.

### [Phase 7: Visual Revamp, Dynamic Animations & Official Logo.png Integration]
- Processed user-provided `Logo.png`:
  - Generated transparent logo asset (`Logo-transparent.png`), cropped high-res logo (`Logo-crop.png`), isolated sun emblem (`Logo-emblem-transparent.png`), and authentic background texture tile (`bg-texture.png`).
  - Integrated official logo into Navbar, Hero badge, favicon, About Panditji card, modals, and Footer.
- Total Theme Overhaul to eliminate dullness:
  - Harmonized with the exact warm textured crimson burgundy `#682e36` from the logo.
  - Paired with vibrant warm flame/saffron (`#ff7a45`) and polished imperial gold (`#d4af37`, `#faedb8`).
  - Applied the authentic logo stone/parchment texture seamlessly across the entire website background.
- Dynamic Vedic Animations Suite:
  - Ambient rotating sun chakra mandala (`@keyframes sacredSpin 75s linear infinite`).
  - Counter-rotating celestial ring (`@keyframes sacredSpinReverse 110s linear infinite`).
  - Floating Diya & embers effect on stats cards (`@keyframes floatDiya 6s ease-in-out infinite`).
  - Divine breathing glow on the official logo emblem (`@keyframes divineGlow`).
  - Radiant light ray shimmer sweep on CTA buttons (`@keyframes shineSweep`).
  - Rhythmic radar pulse wave on floating WhatsApp button (`@keyframes radarRing`).
  - Interactive smooth lift and glow on service cards hover.
- Verified successful production build (`npm run build` succeeded in 526ms).

### [Phase 8: Spacious Logo Optimization & Refined Minimal Luxury Redesign]
- Resolved logo cramping:
  - Generated spacious un-cramped assets (`Logo-spacious.png`, `Logo-transparent.png`) with natural 140px/120px clear space margins.
  - Removed restrictive bounding box and width constraints in Navbar and Hero to restore the logo's natural, un-distorted proportions.
- Eliminated excessive button illuminations / harsh glows:
  - Removed intense `--shadow-flame` and `--shadow-gold` glow halos and diagonal white light sweeps that monopolized user attention.
  - Replaced with understated, refined satin gradients (`#e66232` flame and `#c5a059` antique gold) with soft, natural drop-shadows.
  - Balanced visual weight across the entire page so user focus naturally explores all sections (Hero, Services, Lineage, Calendar, Reviews).
- Preserved Serene Ambient Animations:
  - Ethereal rotating sacred chakra mandala in background (`@keyframes ambientRotate 80s linear infinite` at gentle 0.08 opacity).
  - Smooth, calm floating movement on stat cards (`@keyframes subtleFloat 6s ease-in-out infinite`).
  - Fluid, buttery hover elevations on service cards (`translateY(-4px)`).
  - Soft, non-intrusive pulse on the floating WhatsApp button (`@keyframes gentlePulse 2.8s infinite`).
- Verified build and zero compilation warnings (`npm run build` succeeded in 509ms).

### [Phase 9: Updated Transparent Logo Integration, Elimination of Green/Yellow & Softened Palette]
- Processed newly updated `Logo.png`:
  - Formulated vector linear projection algorithm to eliminate the textured burgundy background cleanly without edge fringing.
  - Generated high-resolution transparent asset (`Logo-transparent.png`, 1684x588) with comfortable padding and natural aspect ratio.
  - Generated isolated transparent emblem (`Logo-emblem-transparent.png`, 549x548) and updated favicon.
  - Updated seamless background texture (`bg-texture.png`) directly from the new logo canvas.
- Softened and lightened orange palette:
  - Transformed the overly saturated orange into a soothing, luminous light peach & sandalwood terracotta tone (`#f5a88a`, `#fbbba3`, `#fde5d8`).
  - Updated button gradients to warm terracotta satin (`#b86047` to `#873622`), maintaining premium dignity without focal distraction.
- Completely eradicated green and yellow colors:
  - Floating action button: Replaced bright WhatsApp green (`#22c55e`) with terracotta burgundy satin.
  - Admin Portal: Replaced green status badges (`#22c55e`, `#4ade80`) with serene Ganga cyan (`#7dd3fc`), and yellow pending badges (`#eab308`, `#facc15`) with soft champagne pearl (`#e8d7c3`).
  - Admin WhatsApp buttons: Replaced emerald green buttons with burgundy terracotta satin.
  - Testimonial Stars: Retained soft champagne pearl ivory (`#e8d7c3`).
- Validated production build (`npm run build` passed in 557ms) and confirmed runtime connectivity across frontend (`http://localhost:5173`) and backend (`http://localhost:5000`).

### [Phase 10: Pure 2-Color Luxury Redesign, Typography Lightening & Transparent WhatsApp Concierge Chatbox]
- Calibrated 2-color brand architecture:
  - Color 1: Royal Crimson Burgundy / Deep Wine (`#682e36`, `#522129`, `#38141b`) derived directly from the logo canvas.
  - Color 2: Luminous Sandalwood Terracotta (`#ea8b70`, `#fad5ca`, `#b85e46`) derived from the logo mark.
  - Re-generated transparent logo (`Logo-transparent.png` and `Logo-emblem-transparent.png`) in exact calibrated `#ea8b70` terracotta with pure alpha transparency.
  - Mix & match depth across cards, borders, pill filters, and button variants for an editorial luxury appearance without monotony.
- Typography refactoring (eliminated unnecessary bold letters):
  - Changed bulky heading weights (`h1-h6` from 700 to 500, with h1 at 600).
  - Reduced stat counters in Hero and About Panditji from 800 to 500.
  - Softened button text, category badges, tags, and paragraph emphasis to light and medium weights (`font-weight: 300`, `400`, `500`).
- Floating WhatsApp Concierge Chatbox:
  - Upgraded from simple solid button to a transparent glassmorphic speech capsule.
  - Features transparent WhatsApp vector icon in matching terracotta (`#ea8b70`), active status presence dot, and clear chat copy: "पंडित जी से चैट करें • WhatsApp सीधा संवाद".
  - 100% theme-compatible, zero green, immediately recognizable as a live consultation chatbox.
- Validated production build (`npm run build` passed in 530ms).

### [Phase 11: Floating Sacred Mantras Animation, Responsive Muhurat Headers & Simplified 2-Section Booking Form]
- Random Floating Vedic Mantras & Sacred Symbols in Hero:
  - Replaced the single static background with a living Vedic particle field of 16 sacred mantras and symbols: `ॐ`, `ॐ नमः शिवाय`, `卐`, `ॐ नमो भगवते वासुदेवाय`, `☸`, `ॐ भूर्भुवः स्वः`, `🔱`, `ॐ गं गणपतये नमः`, `🪷`, `ॐ महालक्ष्म्यै नमः`, `सत्यमेव जयते`, `ॐ त्र्यम्बकं यजामहे`, `🪔`, `शुभम् भवतु`, `ॐ नमो नारायणाय`, `वसुधैव कुटुम्बकम्`.
  - Added 4 organic floating keyframes (`floatRandom1` through `floatRandom4`) with natural rotational shifts, scaling pulses, and drifting trajectories across 22s–38s durations with staggered negative delays.
  - Styled with subtle luminous sandalwood terracotta glowing halos (`#ea8b70`) at soft opacities (0.16–0.24) that enrich the hero background without obstructing text or buttons.
  - Kept a serene central radial emblem at 0.05 opacity for cosmic equilibrium.
- Resolved Cramped Card Headings on Screen Resize (Muhurat Calendar):
  - Fixed the layout shown in the user's screenshot where tithi badges (`EKADASHI DATE`, `PRADOSH FAST AND MONTHLY SHIVRATRI`) and deity labels (`अधिष्ठाता: ...` / `Dean: ...`) were forced into a single horizontal row, causing awkward badge deformation and text collisions on resize.
  - Rebuilt card header into a clean, responsive stacked layout:
    - Dedicated first line for the Tithi pill badge with `maxWidth: 100%`, natural wrapping, and ample padding.
    - Dedicated second line for `अधिष्ठाता देव:` with warm Sand typography.
    - Subtle bottom separator line creating breathing room between the title tier and description copy.
    - Tested on all screen widths: zero cramping, zero overlap.
- Simplified Booking Form into 2 Sections with Divisions & Sub-divisions:
  - Replaced the confusing multi-step wizard with an intuitive, unified layout.
  - Added 2 prominent top-level section selectors:
    - **प्रत्यक्ष पूजा (Offline Pooja)**: In-person Shastrik ritual at devotee's residence, business, or sacred teerth.
    - **ऑनलाइन पूजा (Online Pooja)**: Live HD video broadcast with worldwide Sankalp and postal prasad delivery.
  - Structured each section into 3 clean, numbered divisions with sub-divisions:
    - **खंड १ (Division 1): अनुष्ठान एवं सेवा चयन (Ritual Selection)**
      - *उप-खंड १.१*: सेवा श्रेणी (Category filter)
      - *उप-खंड १.२*: अभीष्ट पूजा / अनुष्ठान (Specific ritual dropdown with duration & samagri info tag)
    - **खंड २ (Division 2): तिथि एवं शुभ मुहूर्त (Date & Timing)**
      - *उप-खंड २.१*: अभीष्ट तिथि (Preferred date picker)
      - *उप-खंड २.२*: समय वेला (Time slot / Muhurat)
    - **खंड ३ (Division 3): यजमान एवं सङ्कल्प विवरण (Devotee & Sankalp Details)**
      - *उप-खंड ३.१*: यजमान संपर्क (Full Name & WhatsApp Phone)
      - *उप-खंड ३.२*: स्थान एवं गोत्र (Venue address for offline, City & Country for online, Gotra)
      - *उप-खंड ३.३*: विशेष सङ्कल्प एवं मनोकामना (Sankalp purpose / desires)
  - Clear 1-click confirmation screen with reservation ID `#VN-XXXX` and instant WhatsApp sync button.
- Validated production build (`npm run build` passed in 789ms) and verified both frontend and backend active servers.

### [Phase 12: Resolution of Service Card Header Cramping & Elliptical Badge Deformation on Resize]
- Root Cause Identified from Uploaded Image:
  - In `ServicesCatalog.jsx`, the subcategory tag (`COMPLETE DOSH NIVARAN`, `VASTU DOSH CHECKING`) used `.badge-flame` with `border-radius: var(--radius-full)` (9999px).
  - When cards shrink on smaller viewports or responsive resizes, sharing a single horizontal flex line with `Offline` and `Online` mode badges compressed the subcategory text into wrapping onto 2-3 lines.
  - Multi-line text inside a 9999px pill deforms geometrically into a circular/egg-shaped bubble, squishing the typography.
- Layout & Design Fixes:
  - Switched badge geometry to a modern, structured 6px/8px rectangular tag (`borderRadius: 6px` inline and `8px` in `index.css`). Even when text wraps onto multiple lines, the badge maintains crisp, professional rectangular contours and never distorts into an oval or egg.
  - Added `flexWrap: 'wrap'` and `gap: '0.6rem'` to the card header with a subtle hairline bottom border separator (`borderBottom: '1px solid rgba(234, 139, 112, 0.12)'`), giving mode badges the ability to wrap cleanly beneath if width is restricted without crushing the category tag.
  - Made card padding responsive using `padding: 'clamp(1.25rem, 3.2vw, 1.65rem)'` to provide 16px extra breathing space on narrower screens.
  - Enhanced title and subtitle sizing (`fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)'`, `fontWeight: 500`) for fluid visual harmony.
  - Upgraded bottom action buttons container with `flexWrap: 'wrap'` and `flex: '1 1 120px'` / `flex: '1.2 1 135px'` to ensure graceful stacking without text clipping on ultra-narrow viewports.
  - Applied matching clean non-deforming header styling to `ServiceDetailModal.jsx`.
- Validated production build (`npm run build` passed in 590ms).

### [Phase 13: Architecture & Implementation of Multi-Role Authentication System (Admin, Panditji & Client OTP)]
- Summary of Requirements & Objectives:
  1. **Client (यजमान / Devotee) Authentication**:
     - Phone number based registration and login using SMS OTP.
     - Validates phone format (10-digit Indian standard or valid international).
     - Generates 6-digit OTP with time-to-live expiration (5 minutes) and countdown resend limit.
     - Automatically creates user account if first-time devotee, or signs into existing account.
     - Provides access to personal ritual bookings history, expedited Sankalp pre-filling, and profile management.
  2. **Panditji (पं. राकेश चन्द्र रावल) Authentication**:
     - Email and password login.
     - "Forgot Password" feature generating a secure, time-sensitive reset token and email dispatch link.
     - Password reset screen allowing Panditji to securely reset credentials.
     - Access to Panditji dashboard for presiding over rituals, updating booking statuses, and viewing astrology consultations.
  3. **Admin (व्यवस्थापक) Authentication**:
     - Secure credential-based login (Email/Username + Password with bcrypt verification).
     - Full administrative privileges over bookings, consultations, services, inquiries, and user roles.
  4. **Security & Data Layer Architecture**:
     - Integrated `bcryptjs` for salted password hashing.
     - Standardized JWT (JSON Web Tokens) with role claims and bearer authorization headers.
     - PostgreSQL database schema upgrade (`users` table with phone, email, password_hash, otp, reset_token fields) + unified fallback in `memoryStore` ensuring immediate zero-config operation.
     - Role-based authorization middleware (`verifyToken`, `requireRole`).
  5. **Frontend Aesthetics & UI/UX**:
     - Luxurious Vedic glassmorphism authentication modal featuring tabbed / dedicated login cards for Devotee (Phone OTP), Panditji (Email/Password + Forgot Password), and Admin.
     - Navbar profile indicator reflecting active authentication state, user badge, and quick access drawer for "मेरी पूजाएं (My Bookings)".
     - Guarded routes ensuring protected management views only unlock for authenticated Panditji or Admin.

- Implementation Accomplishments:
  - **Backend Layer**:
    - Added `bcryptjs` and `jsonwebtoken` dependencies.
    - Updated `backend/src/config/db.js` with `users` table schema in PostgreSQL and unified `memoryStore.users` fallback with salted bcrypt password hashes.
    - Created JWT and Role middleware in `backend/src/middleware/auth.js` (`verifyToken`, `optionalToken`, `requireRole`).
    - Implemented `backend/src/controllers/authController.js` containing:
      - `sendClientOtp`: 10-digit phone verification, 6-digit OTP code generation, 5-minute expiration, dev OTP testing support.
      - `verifyClientOtp`: OTP validation, user profile creation/update, and 30-day JWT generation.
      - `loginCredentials`: Secure email and password verification with bcrypt for Panditji and Admin.
      - `forgotPassword`: Secure 32-byte crypto token generation, 1-hour expiration, simulated dispatch logging to console with reset URL.
      - `resetPassword`: Token validation and password hash update.
      - `getMe`: Current user profile verification.
      - `getClientBookings`: Client's own ritual reservations by authenticated phone.
    - Secured admin status updates (`PATCH /api/bookings/:id/status`, `PATCH /api/consultations/:id/status`, `PATCH /api/inquiries/:id/status`) and protected queries in `backend/src/routes/api.js`.
  - **Frontend Layer**:
    - Created `AuthContext.jsx` in `frontend/src/context/` providing session state, token persistence in `localStorage`, and auth helper functions.
    - Built `AuthModal.jsx` featuring:
      - Client OTP tab with 6-digit auto-advancing input, resend countdown timer (30s), and demo test OTP prefill helper.
      - Panditji tab with password show/hide toggle, demo filler button, and inline "पासवर्ड भूल गए? (Forgot Password?)" mode with token entry & instant reset form.
      - Admin tab with credential login and demo filler button.
    - Built `ClientBookingsModal.jsx` displaying devotee's personal rituals, statuses (स्वीकृत / प्रतीक्षारत / संपन्न / रद्द), dates, times, venue/city, Gotra, special sankalp, and WhatsApp sync.
    - Guarded `AdminPortal.jsx` with access barrier: unauthenticated visitors see a restricted zone notice with direct login actions; authenticated staff see active name/role, ताज़ा करें, and लॉगआउट buttons.
    - Updated `Navbar.jsx` with dynamic authentication controls, user role badge in ribbon, "यजमान प्रवेश" / "मेरी पूजाएं" buttons on desktop & mobile drawer.
    - Connected `App.jsx` with URL reset token listener (`?resetToken=...&email=...`), auto-opening password reset mode upon link click.
    - Enhanced `BookingModal.jsx` with automatic devotee name and phone pre-filling from authenticated session.
  - **Verification & Testing**:
    - Built comprehensive live HTTP test suite ([testAuth.js](file:///c:/Users/shiwa/Desktop/VedNetra/backend/src/scripts/testAuth.js)) covering 17 critical scenarios:
      1. Server Health Check (200 OK)
      2. Client Send OTP with valid phone (returns 6-digit dev_otp)
      3. Client Send OTP rejection on invalid phone length
      4. Client Verify OTP rejection on wrong 6-digit code
      5. Client Verify OTP success, user profile creation, and 30-day JWT issuance
      6. Client Profile verification via `/api/auth/me`
      7. Role-Based Access Control (RBAC): Client blocked (403 Forbidden) from Admin/Panditji endpoints
      8. Panditji Login rejection on invalid password (401 Unauthorized)
      9. Panditji Login success with initial password (`Panditji@VedNetra2026`)
      10. Panditji Access authorization to protected `/api/bookings`
      11. Panditji Forgot Password link dispatch and token generation
      12. Panditji Reset Password credential update with token
      13. Verification that previous password is now rejected
      14. Panditji Login success with newly updated password
      15. Admin Login success with admin credentials (`admin@vednetra.com` / `Admin@VedNetra2026`)
      16. Admin Access authorization to `/api/consultations` and `/api/inquiries`
      17. Client personal booking isolation and retrieval via `/api/auth/my-bookings`
    - Result: **17/17 PASSED (100% success rate)**.
    - Validated production build (`npm run build` passed in 794ms with 0 errors).
    - Verified live frontend dev server on `http://localhost:5173/` and backend on `http://localhost:5000/`.

### [Phase 14: User Credentials & Email Addresses Update]
- Updated Panditji Credentials:
  - **Email**: `panditrakeshrawal@gmail.com`
  - **Password**: `Panditji@VedNetra2026`
  - Updated in database seed (`backend/src/config/db.js`), memory fallback store, frontend authentication modal (`AuthModal.jsx`), public contact sections (`Footer.jsx` and `ContactSection.jsx`), and test suite (`testAuth.js`).
- Updated Admin Credentials:
  - **Email**: `shiwansh8888@gmail.com`
  - **Password**: `Admin@VedNetra2026`
  - Updated in database seed (`backend/src/config/db.js`), memory fallback store, frontend authentication modal (`AuthModal.jsx`), and test suite (`testAuth.js`).
- Verification:
  - Re-executed full 17-point test suite against updated backend endpoints: **17/17 PASSED (100%)**.
  - Production build passed in 523ms with zero errors.

- [x] **Phase 15: Implementation & Verification of 21 Production-Grade Platform Enhancements**
  - [x] Item 1: Custom 404 Page (`NotFoundPage.jsx` with Vedic sacred diya, error code ४०४, and return action)
  - [x] Item 2: Favicons Suite (`favicon.svg`, `site.webmanifest`, apple-touch-icon, and alternate PNG icon)
  - [x] Item 3: Loading Skeleton & Empty State (`LoadingSkeleton.jsx` and `EmptyState.jsx` integrated into catalog)
  - [x] Item 4: Toast Notification System (`ToastContext.jsx` with micro-animations and global provider)
  - [x] Item 5: Reduced Motion Support (`@media (prefers-reduced-motion: reduce)` rules in `index.css`)
  - [x] Item 6: Custom Social Sharing Images (`og-image.svg` 1200x630 high-res sacred banner)
  - [x] Item 7: Event Tracking (`analytics.js` privacy-first client telemetry for bookings, muhurats, and inquiries)
  - [x] Item 8: Cookie Consent Banner (`CookieConsent.jsx` glassmorphic privacy preferences banner)
  - [x] Item 9: Security Headers (nosniff, SAMEORIGIN, referrer-policy, permissions-policy, and disabled x-powered-by in `server.js`)
  - [x] Item 10: Contact Form with Email Notification (Real-time email notification dispatched to `panditrakeshrawal@gmail.com`)
  - [x] Item 11: Unique Page Title & Meta Description (Keyword-rich Hindi & English titles and meta descriptions)
  - [x] Item 12: Open Graph Metadata (`og:title`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`)
  - [x] Item 13: XML Sitemap (`sitemap.xml` with canonical routes, change frequencies, and priority weights)
  - [x] Item 14: Robots.txt File (`robots.txt` granting crawler access to public pages while safeguarding private endpoints)
  - [x] Item 15: Canonical Tags (`<link rel="canonical" href="https://vednetra.com/" />`)
  - [x] Item 16: Schema.org Structured Data (`ProfessionalService`, `Person` founder, and `FAQPage` JSON-LD)
  - [x] Item 17: Breadcrumb Navigation (`Breadcrumbs.jsx` with Schema.org `BreadcrumbList` microdata)
  - [x] Item 18: Internal Linking Between Related Pages (Cross-links between catalog, muhurat, faq, and about sections)
  - [x] Item 19: WebP Support for Image Optimization (Converted assets with 85% bandwidth savings and `<picture>` tags)
  - [x] Item 20: Lazy Loading for Off-Screen Images (`loading="lazy"` and `decoding="async"` across images)
  - [x] Item 21: Faster Font Loading (`dns-prefetch`, `preconnect`, and `display=swap` for Core Web Vitals)

- Verification & Quality Assurance:
  - **Platform Enhancements Test Suite (`testPlatformEnhancements.js`)**: 21 / 21 PASSED (100% success rate).
  - **Authentication Test Suite (`testAuth.js`)**: 17 / 17 PASSED (100% success rate).
  - **Production Build Validation (`npm run build`)**: Vite bundle generated cleanly in 444ms with zero errors.
  - **Server Endpoints**: Tested and actively running on `http://localhost:5000` (Backend) and `http://localhost:5173` (Frontend).

- [x] **Phase 16: Adoption of Luxury Editorial Template ('NORD' Architecture) with Red-Tinted Stone Color Harmony**
  - [x] Analyzed user screenshot and design specifications:
    - Announcement ribbon: Triple-section top bar (Auspicious Consultations, Free Prasad Delivery, Track Sankalp & Help)
    - Editorial luxury navigation: Left categories, centered grand serif logo (`VEDNETRA`), right utility icons (Search, Account, Bag, Favorites, Cart)
    - Grand Brutalist Hero: Giant serif watermark (`VEDNETRA`), consecrated brass Kalash on stacked stone pedestal, left & right editorial callouts, luxury boxed CTA
    - Dark 3-Column Category Strip: Contrast velvet obsidian-wine bar with thumbnail + category name + subtitle + arrow link
    - Editorial Feature Banner ("RAW TEXTURES" equivalent): Consecrated Shankh on concrete ledge, giant display serif title, luxury action button
    - Value Props / Trust Badges Strip: 4 horizontal value badges with clean vector iconography
    - "BEST OF VEDNETRA" Featured Grid: Multi-column luxury cards on warm sandstone surfaces with interactive wishlist toggle & direct booking
  - [x] Generated photorealistic studio assets on museum concrete/stone pedestals matching template aesthetic
  - [x] Update color variables in `index.css`: screenshot's primary warm stone tone with subtle red shade (`#F6EFEA` / `#EDE3DD`) paired with royal crimson burgundy (`#682e36`)
  - [x] Transform `Navbar.jsx` to match luxury editorial header
  - [x] Transform `Hero.jsx` to match colossal typography & pedestal layout
  - [x] Build new `CategoryStrip.jsx` component for the 3 dark modular cards
  - [x] Build new `EditorialFeature.jsx` component ("RAW TEXTURES" equivalent)
  - [x] Build new `TrustBadges.jsx` component for value props
  - [x] Build new `FeaturedCollection.jsx` component ("BEST OF VEDNETRA" grid)
  - [x] Integrate into `App.jsx` and test responsiveness
  - [x] Verified via browser subagent screenshots and `npm run build` (passed in 623ms)
- [x] **Phase 17: Complete Transformation of Service Catalog Ceremony Cards to Luxury Editorial Design**
  - [x] **Card Architecture Overhaul (`ServicesCatalog.jsx`)**:
    - Replaced obsolete pill-style card presentation with the luxury editorial template ("NORD" architecture).
    - Added high-resolution stone-pedestal ceremonial photography for all 12 services (`hero-pedestal-kalash.jpg`, `cat-katha-stone.jpg`, `cat-pooja-stone.jpg`, `editorial-stone-shankh.jpg`, `ceremony-hawan-card.jpg`, `cat-ratna-stone.jpg`, `ceremony-kundali-card.jpg`, `ceremony-rudra-card.jpg`).
    - Configured `4:3` architectural aspect-ratio top image containers with smooth hover scale effects (`transform: scale(1.05)`).
    - Integrated interactive wishlist Heart button on each card with reactive toggle turning solid burgundy (`#682E36`).
    - Positioned frosted subcategory badges and "विशिष्ट" featured labels on top-left of card images.
    - Added clean frosted Online/Offline mode badges with globe micro-icons.
  - [x] **Typography & Contrast Rectification**:
    - Eliminated washed-out/faint text: Replaced inline ivory/muted styling with high-contrast `#1C080E` (deep charcoal) for Hindi titles and `#682E36` (signature burgundy) for English subtitles.
    - Enhanced readability of service descriptions using warm dark stone body typography (`#47242C`).
    - Re-styled internal auspicious linking (`📅 शुभ मुहूर्त` and `💬 मार्गदर्शन`) with clear separation.
  - [x] **Editorial Button Actions (`index.css` & `ServicesCatalog.jsx`)**:
    - Replaced rounded pill buttons with crisp rectangular editorial buttons:
      - `[ 👁 विवरण ]`: `.btn-editorial-outline` with hover surface fill and burgundy border.
      - `[ 📅 आरक्षण करें / परामर्श लें ]`: `.btn-editorial-primary` with hover lift and solid burgundy styling.
  - [x] **Verification & Validation**:
    - Verified production build: `npm run build` completed with 0 errors in 516ms.
    - Verified live in browser: All 12 cards, images, interactive heart toggles, and detail modals tested and working seamlessly.
    - Removed left-corner breadcrumb navigation (`मुख्य पृष्ठ > वैदिक सेवाएं`) per user request to ensure clean, uncluttered section header layout.

- [x] **Phase 18: Purification of Navigation Bar — Removal of E-commerce Elements**
  - [x] **Removed E-commerce Utility Icons (`Navbar.jsx`)**:
    - Removed `ShoppingBag` icon (shopping cart/bag).
    - Removed `Heart` icon (product wishlist).
    - Removed `CART` text button.
    - Removed e-commerce search drawer and query state to maintain focused sanctuary layout.
  - [x] **Installed Sacred Institution Actions**:
    - Retained Devotee Account/Login (`👤 प्रवेश` / `UserCheck`) for devotees to track their ritual bookings and sankalps.
    - Added sacred ritual booking CTA button (`📅 आरक्षण करें`) linked directly to `onOpenBooking`.
    - Updated center announcement ribbon to authentic Vedic sanctuary institution text: `"वैदिक अनुष्ठान, शुद्ध संकल्प एवं ज्योतिष संस्थान • संपर्क: +91 98765 43210"`.
  - [x] **Verification**:
    - Verified production build: `npm run build` completed with 0 errors in 712ms.
    - Verified live in browser: Visual header is clean, prestigious, responsive, and completely free of retail/e-commerce artifacts.

- [x] **Phase 19: Complete Unification of All Modals, Portals & Standalone Pages Under the Luxury Editorial Sandstone Theme**
  - [x] **Global Modal & Form Styles Architecture (`index.css`)**:
    - Replaced obsolete dark night gradients on `.modal-content` (`#3d141b` to `#220a0f`) with warm stone card surfaces (`var(--color-stone-card)` / `#FAF6F3`) and architectural borders (`var(--color-stone-border)` / `#EDE2DC`).
    - Standardized `.form-division`, `.division-header`, `.division-badge`, `.division-title`, `.division-subtitle`, and `.subdivision-label` with high-contrast charcoal typography (`#1C080E`) and royal burgundy accents (`#682E36`).
  - [x] **Modal & Component Overhauls**:
    - `BookingModal.jsx`: Transformed ritual booking modal, Offline vs. Online selectors, date/time inputs, devotee details, and reservation confirmation screen into the stone card theme.
    - `AstrologyModal.jsx`: Transformed Vedic astrology consultation modal (Kundali Milan, Faladesh, Gemstone consultation), partner details panel, and confirmation screen into the stone card theme.
    - `AuthModal.jsx`: Replaced dark authentication box with the stone card theme for Devotee phone OTP login, Panditji password access, and Administrative verification.
    - `ClientBookingsModal.jsx`: Replaced dark gradient booking tracking modal with sandstone card styling, burgundy status badges, and clear typography.
    - `ServiceDetailModal.jsx`: Harmonized ritual detail modal, Shastrik significance callout, and cross-linking badges with stone surfaces and dark readable text.
    - `AdminPortal.jsx`: Overhauled the complete administrative portal (management login, active bookings, consultations, inquiries, status filters, and tab headers) with clean architectural sandstone cards and burgundy CTAs.
    - `NotFoundPage.jsx`: Modernized 404 error page using sandstone canvas, burgundy gradient numeral, and stone navigation card.
    - `UserPreferences.jsx`: Re-styled cookie/privacy consent banner into sandstone card with burgundy icon accents.
    - `EmptyState.jsx`: Styled empty states with warm stone surface and burgundy action buttons.
  - [x] **Verification & Validation**:
    - Verified production build: `npm run build` compiled cleanly in 855ms with zero errors.
    - Verified live in browser: Validated and captured screenshots of `BookingModal`, `AstrologyModal`, `AuthModal`, and `AdminPortal`. All modals and portals present a cohesive, high-contrast, prestigious sanctuary aesthetic.

- [x] **Phase 20: Official Vedनेत्र Logo Integration & Hero Section Brand Typography Alignment**
  - [x] **Official Logo Assets & High-Contrast Harmonization**:
    - Extracted and enhanced official Vedनेत्र branding assets including the sacred Sun Mandala with centered `ॐ` and `Vedनेत्र` lettering.
    - Created high-contrast, crystal-clear variants (`Logo-burgundy.png`, `Logo-two-tone.png`, `Logo-emblem-burgundy.png`) optimized for both light sandstone canvas (`#F6EFEA`) and dark background surfaces.
  - [x] **Navbar Integration (`Navbar.jsx`)**:
    - Replaced generic text wordmark with the official Vedनेत्र two-tone logo (`Logo-two-tone.webp` / `Logo-two-tone.png`) in the center of the navigation bar.
    - Added official logo to the top of the mobile navigation drawer.
  - [x] **Hero Section Typography Alignment (`Hero.jsx`)**:
    - Updated giant editorial brand watermark headline from `VEDNETRA` to `Vedनेत्र` in authentic Devanagari/Latin serif typography (`Rozha One` + `Cinzel`).
    - Swapped generic background SVG geometry with the actual rotating sacred Sun Mandala emblem (`Logo-emblem-transparent.png`).
    - Embedded the sacred logo emblem inside the consecrated pedestal floating badge (`100% SHASTRIYA SANKALP`).
  - [x] **App-Wide Logo Deployment**:
    - `AuthModal.jsx`: Installed the official logo in the sacred authentication header.
    - `AdminPortal.jsx`: Added official logo to both the restricted login box and the staff control center header.
    - `ClientBookingsModal.jsx`: Integrated the sacred logo emblem in the Devotee personal portal header.
    - `NotFoundPage.jsx`: Added official logo to the 404 navigation header.
    - `FeaturedCollection.jsx`: Updated headline to `BEST OF Vedनेत्र`.
  - [x] **Verification**:
    - Production build: `npm run build` completed cleanly in 747ms.
    - Browser automation: Captured live screenshots verifying the navbar logo, the `Vedनेत्र` hero heading, and the auth modal branding.

- [x] **Phase 21: Modernization of Action Terminology — Transition to "Book" & "Consult"**
  - [x] **Navbar & Primary Actions**:
    - Replaced `आरक्षण करें` with **`Book`** in the top navigation bar header CTA ([`Navbar.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Navbar.jsx)).
  - [x] **Ceremony Catalog Cards**:
    - Replaced `आरक्षण करें` with **`Book`** across all standard ritual cards in [`ServicesCatalog.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ServicesCatalog.jsx).
    - Replaced `परामर्श लें` with **`Consult`** for astrology and gemstone guidance services.
  - [x] **Detail Modals & Portals Harmonization**:
    - [`ServiceDetailModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ServiceDetailModal.jsx): Updated action CTA to `Book` or `Consult`.
    - [`MuhuratCalendar.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/MuhuratCalendar.jsx): Changed date reservation button to `Book For This Date`.
    - [`BookingModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/BookingModal.jsx): Updated form title, submit CTA, toast notifications, and confirmation reference to use `Book` / `Booking`.
    - [`AstrologyModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AstrologyModal.jsx): Replaced `परामर्श` with `Consultation` / `Book Consultation` across headers, submit buttons, and confirmations.
    - [`AdminPortal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AdminPortal.jsx): Updated tab headers to `Pooja & Katha Bookings` and `Jyotish & Gemstone Consultations`.
    - [`ClientBookingsModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ClientBookingsModal.jsx): Updated empty states and CTA to `Book Pooja`.
  - [x] **Verification**:
    - Production build: `npm run build` compiled cleanly in 618ms.
    - Browser validation: Verified navbar and catalog cards displaying `Book` and `Consult` cleanly.

- [x] **Phase 22: Call-to-Action Evolution ("Book Now" & "Consult Now"), Hero Ambient Background Animations, Typography Polish & Mobile Uncluttering**
  - [x] **CTA Refinement across Codebase**:
    - Replaced all instances of `Book` with **`Book Now`** and `Consult` with **`Consult Now`** across all components:
      - [`Navbar.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Navbar.jsx): Desktop CTA `Book Now`, mobile drawer `BOOK NOW / SANKALP`.
      - [`Hero.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Hero.jsx): Desktop button `BOOK NOW`, mobile primary CTA `BOOK NOW`, secondary CTA `CONSULT NOW`.
      - [`ServicesCatalog.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ServicesCatalog.jsx): Card buttons use dynamic `{srv.category === 'ratna_salah' ? 'Consult Now' : 'Book Now'}`.
      - [`ServiceDetailModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ServiceDetailModal.jsx): Action CTA uses `{service?.category === 'ratna_salah' ? 'Consult Now' : 'Book Now'}`.
      - [`AboutPanditji.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AboutPanditji.jsx): Buttons updated to `Book Now` and `Consult Now`.
      - [`MuhuratCalendar.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/MuhuratCalendar.jsx): Button updated to `Book Now For This Date`.
      - [`CategoryStrip.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/CategoryStrip.jsx): Action texts updated to `BOOK NOW` and `CONSULT NOW`.
      - [`BookingModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/BookingModal.jsx): Submit button updated to `Book Now (Online / Offline)`.
      - [`AstrologyModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AstrologyModal.jsx): Submit button updated to `Consult Now`.
      - [`ClientBookingsModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ClientBookingsModal.jsx): Empty-state button updated to `Book Now`.
  - [x] **Hero Background Sacred Animation Restored**:
    - Re-introduced the 16 wandering sacred entities (`ॐ`, `ॐ नमः शिवाय`, `卐`, `ॐ नमो भगवते वासुदेवाय`, `☸`, `ॐ भूर्भुवः स्वः`, `🔱`, `ॐ गं गणपतये नमः`, `🪷`, `ॐ महालक्ष्म्यै नमः`, `सत्यमेव जयते`, `ॐ त्र्यम्बकं यजामहे`, `🪔`, `शुभम् भवतु`, `ॐ नमो नारायणाय`, `वसुधैव कुटुम्बकम्`) in [`Hero.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Hero.jsx).
    - Updated particle styling in [`index.css`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/index.css) to lighter royal burgundy (`#8C424E`) with subtle ethereal glow.
    - Integrated central rotating sacred chakra mandala SVG in lighter royal burgundy (`#8C424E` / `#682E36` at 0.13 opacity) with serene 90s linear infinite rotation.
  - [x] **Devanagari Typography Adjustment (No Clipping)**:
    - Fixed line-height (`1.18`), added vertical padding (`0.25rem 0`), and responsive font clamp (`clamp(2.75rem, 9.5vw, 8.8rem)`) in [`Hero.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Hero.jsx).
    - Guaranteed full visibility of Devanagari matras (`े` in `Vedनेत्र` and conjunct `त्र`) on all viewports without edge clipping.
  - [x] **Zero Payment Gateway Dependencies & Complete Removal**:
    - Conducted codebase-wide audits across backend and frontend: verified zero third-party payment gateways (Razorpay, Stripe, dakshina checkout) or payment dependencies exist.
  - [x] **Mobile View Optimization & Zero-Overlap Refactor**:
    - Eliminated negative margins (`margin-bottom: -2.2rem`, `margin-top: -0.5rem`) that caused overlapping on smaller viewports.
    - Cleaned up mobile layout (`@media (max-width: 880px)`): hid redundant desktop editorial copy and side columns (`.hero-col-left`, `.hero-col-right`) to prevent vertical crowding.
    - Centered essential details only on mobile: pristine `Vedनेत्र` watermark, concise subtitle, consecrated stone pedestal Kalash centerpiece, and full-width touch-friendly `BOOK NOW` and `CONSULT NOW` buttons.
  - [x] **Verification**:
    - Production build: `npm run build` compiled cleanly in 1.61s with zero errors.
    - Browser subagent validation: Captured live screenshots verifying background animations, non-clipped typography, and clean button states.

- [x] **Phase 23: Complete Elimination of Fixed Navbar Top Clipping on Desktop & Mobile**
  - [x] **Root Cause Resolution**:
    - The fixed navigation header (top announcement ribbon + main nav) stands at ~100px on desktop and previously reached ~143px on mobile due to ribbon wrapping.
    - The hero section's previous top padding (`6.5rem` on desktop, `5.5rem` on mobile) was too shallow, causing the top of `Vedनेत्र` to graze or tuck underneath the fixed header.
  - [x] **Navbar Optimization**:
    - [`Navbar.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Navbar.jsx): Optimized announcement ribbon on mobile to a single slim line (`flex-wrap: nowrap`, hiding non-critical desktop links like "DEVOTEE HELP" on small screens), reducing mobile header height to a compact ~80px.
  - [x] **Hero Top Clearance & Headroom**:
    - [`Hero.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Hero.jsx): Increased desktop `paddingTop` to `9.8rem` (~157px), providing an open ~56px clearance between the bottom of the navbar and the top of `Vedनेत्र`.
    - Set mobile `padding-top: 9.6rem !important` (and `10.2rem` on small mobile), ensuring `Vedनेत्र` is fully visible below the mobile navbar with ample breathing space.
    - Added `scrollMarginTop: '120px'` to `#hero` and `scroll-padding-top: 110px` to `html` in [`index.css`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/index.css) to ensure anchor scrolling never clips content under the header.
  - [x] **Verification**:
    - Rebuilt frontend with `npm run build` (compiled cleanly in 548ms).
    - Captured and visually confirmed live browser screenshots at both desktop (1400x850) and mobile (390x844) viewports: `Vedनेत्र` renders with full headroom and zero clipping.

- [x] **Phase 24: Official Contact Credentials Update (Phone & Panditji Email)**
  - [x] **Phone Number Update (`+91 9827514489` / `+91 98275 14489`)**:
    - [`Navbar.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Navbar.jsx): Updated announcement center ribbon contact text and `tel:+919827514489` link.
    - [`Footer.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Footer.jsx): Updated contact details to `दूरभाष: +91 98275 14489`.
    - [`ContactSection.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ContactSection.jsx): Updated direct phone anchor (`tel:+919827514489`), display text, direct WhatsApp link (`https://wa.me/919827514489`), and input placeholder.
    - [`App.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/App.jsx): Updated floating concierge WhatsApp button link to `https://wa.me/919827514489`.
    - [`BookingModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/BookingModal.jsx): Updated post-booking WhatsApp dispatch link and phone input placeholder.
    - [`AstrologyModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AstrologyModal.jsx): Updated WhatsApp consultation sharing link and phone input placeholder.
    - [`ClientBookingsModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ClientBookingsModal.jsx): Updated devotee WhatsApp inquiry link for booked rituals.
    - [`NotFoundPage.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/NotFoundPage.jsx): Updated help telephone link to `tel:+919827514489`.
    - [`index.html`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/index.html): Updated Schema.org JSON-LD `telephone` in both `ProfessionalService` and `Person` nodes.
    - [`db.js`](file:///c:/Users/shiwa/Desktop/VedNetra/backend/src/config/db.js): Updated Panditji default phone number in memory store and PostgreSQL seed query.
  - [x] **Panditji Email Update (`panditrakeshrawal26@gmail.com`)**:
    - [`Footer.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Footer.jsx): Updated contact email to `panditrakeshrawal26@gmail.com`.
    - [`ContactSection.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ContactSection.jsx): Updated `mailto:panditrakeshrawal26@gmail.com` link and display text.
    - [`AuthModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AuthModal.jsx): Updated quick-fill demo credentials, input placeholders, and password reset forms to `panditrakeshrawal26@gmail.com`.
    - [`index.html`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/index.html): Updated Schema.org JSON-LD `email` in `ProfessionalService` and `Person` nodes.
    - [`inquiriesController.js`](file:///c:/Users/shiwa/Desktop/VedNetra/backend/src/controllers/inquiriesController.js): Updated backend notification dispatch logging and email recipient to `panditrakeshrawal26@gmail.com`.
    - [`db.js`](file:///c:/Users/shiwa/Desktop/VedNetra/backend/src/config/db.js): Updated Panditji credentials in memory store and PostgreSQL seed query.
    - Backend test suites ([`testAuth.js`](file:///c:/Users/shiwa/Desktop/VedNetra/backend/src/scripts/testAuth.js), [`testPlatformEnhancements.js`](file:///c:/Users/shiwa/Desktop/VedNetra/backend/src/scripts/testPlatformEnhancements.js)): Updated test assertions for Panditji login and inquiry notifications.
  - [x] **Verification**:
    - `npm run build` compiled cleanly in 1.86s with zero errors.

- [x] **Phase 25: Removal of "All Offerings" Category Pill & Defaulting to "Bhagwat Katha"**
  - [x] **Services Catalog Component ([`ServicesCatalog.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ServicesCatalog.jsx))**:
    - Removed `{ id: 'all', label: 'सभी सेवाएं', en: 'All Offerings' }` from the `categories` array.
    - Updated active category initial state and external category watcher to default to `'katha'` instead of `'all'`.
    - Updated `filteredServices` logic so it cleanly filters by the active category without relying on `'all'`.
    - Updated empty state fallback button to point to "भागवत कथा देखें" (`setActiveCategory('katha')`).
  - [x] **Application Root ([`App.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/App.jsx))**:
    - Initialized `catalogCategory` default state to `'katha'`.
    - Handled `'all'` edge cases in `handleSelectCategory` to safely map to `'katha'`.
  - [x] **Verification**:
    - `npm run build` completed cleanly in 464ms with zero errors.

- [x] **Phase 26: Booking Modal Decluttering & Streamlined User Experience**
  - [x] **Eliminated Structural Clutter ([`BookingModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/BookingModal.jsx))**:
    - Removed heavy, nested `.form-division` boxed borders that created excessive visual noise.
    - Removed technical bureaucratic numbering (`१`, `२`, `३`, `१.१`, `१.२`, `२.१`, `२.२`, `३.१`, `३.२`, `३.३`) in favor of clear, human Vedic section labels.
  - [x] **Streamlined Mode Selector**:
    - Replaced large 150px dual text cards with an understated, tactile segmented pill toggle (`प्रत्यक्ष पूजा (Offline)` vs `ऑनलाइन पूजा (Online)`).
    - Reduced vertical space and added a single-line contextual helper caption below the toggle.
  - [x] **Unified Ritual Selection**:
    - Eliminated redundant two-step dropdowns (`सेवा श्रेणी` dropdown + `अभीष्ट पूजा` dropdown).
    - Replaced with a single clean dropdown cleanly grouped by sacred categories (`<optgroup>`).
    - Added a sleek duration and samagri preview chip underneath the selection.
  - [x] **Organized 2-Column Responsive Layout**:
    - Paired **Date & Time** (`अभीष्ट तिथि *` and `समय / मुहूर्त वेला`).
    - Paired **Devotee Details** (`यजमान का पूरा नाम *` and `मोबाइल / WhatsApp नंबर *`).
    - Paired **Location & Gotra** (`पूजा स्थल / पता *` or `गृह नगर एवं देश *` and `गोत्र (वैकल्पिक)`).
    - Single row for `विशेष सङ्कल्प / मनोकामना (वैकल्पिक)`.
  - [x] **Viewport Optimization & Single-Screen Fit**:
    - Calibrated container width, padding, and input heights to fit comfortably within standard desktop and laptop viewports without forced vertical scrolling.
  - [x] **Verification**:
    - `npm run build` compiled cleanly in 611ms.
    - Verified live in browser with screenshot confirmation.

- [x] **Phase 27: 3-Date Band, Calendar Time, Google Calendar Integration & Terms Modal**
  - [x] **Band of 3 Dates (rather than single date)**:
    - Updated [`BookingModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/BookingModal.jsx) to collect 3 dates:
      1. `१. प्राथमिक तिथि (Preferred Date 1) *`
      2. `२. द्वितीय तिथि (2nd Date) *`
      3. `३. अतिरिक्त तिथि (Additional 3rd Date, optional)`
    - Added guidance card explaining that Panditji analyzes all 3 proposed dates to calculate the most auspicious Shastriya Muhurat.
  - [x] **Calendar Time (instead of Muhurat time)**:
    - Replaced the previous generic muhurat text with standard calendar slots:
      - `प्रातः 09:00 - 11:00 AM (Morning Slot)`
      - `मध्याह्न 11:00 - 01:00 PM (Midday Slot)`
      - `दोपहर 02:00 - 04:00 PM (Afternoon Slot)`
      - `सायं 04:00 - 06:00 PM (Evening Slot)`
      - `संध्या 06:00 - 08:00 PM (Late Evening Slot)`
      - `पंडित जी की उपलब्धता अनुसार (Flexible Slot)`
  - [x] **Google Calendar Integration of Panditji**:
    - Added an interactive trigger: `📅 पंडित जी का Google Calendar देखें (Check Panditji's Schedule)` linking to Panditji's official Google Calendar (`panditrakeshrawal26@gmail.com`) with an in-modal preview frame.
    - Added an interactive **"Google Calendar में जोड़ें (Add to Google Calendar)"** button on booking completion that generates a pre-filled Google Calendar event invitation with Panditji as guest (`panditrakeshrawal26@gmail.com`).
  - [x] **Post-Booking Online Call for Final Appointment & Best Mahurat**:
    - Embedded clear notifications before submit and on confirmation:
      "बुकिंग उपरांत ऑनलाइन कॉल: बुकिंग दर्ज होने के बाद पंडित जी द्वारा यजमान के साथ ऑनलाइन वीडियो/ऑडियो कॉल (Google Meet / Phone) आयोजित की जाएगी, जिसमें इन ३ तिथियों का ज्योतिषीय विश्लेषण कर अंतिम सर्वश्रेष्ठ मुहूर्त व अप्वाइंटमेंट तय किया जाएगा।"
    - WhatsApp dispatch link formatted with all 3 dates, calendar slot, and online appointment call request.
  - [x] **Terms & Conditions Page & Modal ([`TermsAndConditionsModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/TermsAndConditionsModal.jsx))**:
    - Created dedicated Terms & Conditions modal covering:
      1. ३ तिथियों का विकल्प एवं ऑनलाइन मुहूर्त निर्धारण प्रक्रिया (Date Band & Online Call)
      2. कैलेंडर समय एवं Google Calendar समन्वय (Calendar Time & Availability)
      3. प्रत्यक्ष एवं ऑनलाइन पूजा दिशानिर्देश (Offline & Online Ritual Guidelines)
      4. वैदिक आचार संहिता, संकल्प एवं मर्यादा (Sacred Conduct)
      5. पुनर्निर्धारण एवं यजमान गोपनीयता (Rescheduling & Privacy)
    - Linked directly in `BookingModal.jsx` via mandatory acceptance checkbox and in `Footer.jsx` for site-wide transparency.
  - [x] **Backend & Database Schema**:
    - [`db.js`](file:///c:/Users/shiwa/Desktop/VedNetra/backend/src/config/db.js): Added `second_date DATE`, `third_date DATE`, `terms_accepted BOOLEAN` to `bookings` schema.
    - [`bookingsController.js`](file:///c:/Users/shiwa/Desktop/VedNetra/backend/src/controllers/bookingsController.js): Added support for `second_date`, `third_date`, and `terms_accepted` in PostgreSQL query and memory store fallback.
    - Updated [`AdminPortal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AdminPortal.jsx) and [`ClientBookingsModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/ClientBookingsModal.jsx) to display all 3 dates.
  - [x] **Verification**:
    - Production build (`npm run build`) compiled cleanly with zero errors.
    - Verified full end-to-end booking in browser subagent with screenshot confirmation.

- [x] **Phase 28: WhatsApp Number Only for OTP Authentication**
  - [x] **Devotee Form Label & Badging ([`AuthModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AuthModal.jsx))**:
    - Updated phone input label to: `व्हाट्सएप नंबर (WhatsApp Number Only) *` with authentic WhatsApp SVG icon.
    - Added high-visibility status badge: `केवल WhatsApp (WhatsApp Only)`.
    - Tab switcher updated to: `यजमान (WhatsApp)` with active/inactive WhatsApp icon styling.
  - [x] **Placeholder & Explicit Guidance Box**:
    - Input placeholder updated to `"10-अंकीय WhatsApp नंबर (उदा. 9827514489)"` / `"WhatsApp number only"`.
    - Added dedicated instruction banner in Step 1:
      "केवल WhatsApp नंबर दर्ज करें (WhatsApp Number Only): सत्यापन व सुरक्षा OTP केवल आपके WhatsApp पर प्रेषित किया जाएगा। नया यजमान स्वतः पंजीकृत होगा अथवा पूर्व खाते में सुरक्षित प्रवेश होगा।"
  - [x] **Action Buttons & Step 2 Verification Flow**:
    - Step 1 button updated to: `WhatsApp पर OTP प्राप्त करें (Get OTP on WhatsApp)` with WhatsApp icon.
    - Step 2 header updated to: `WhatsApp नंबर {countryCode} {phone} पर प्रेषित 6-अंकीय कोड दर्ज करें:`.
    - Added verification notice: `ओटीपी आपके WhatsApp पर भेजा गया है। कृपया अपना WhatsApp चैट इनबॉक्स जांचें।`.
    - Action links updated to `WhatsApp नंबर बदलें` and `WhatsApp पर पुनः भेजें`.
  - [x] **Backend & API Messages ([`authController.js`](file:///c:/Users/shiwa/Desktop/VedNetra/backend/src/controllers/authController.js))**:
    - Updated validation errors to require WhatsApp number only: `"कृपया केवल मान्य WhatsApp नंबर दर्ज करें (Please provide a valid WhatsApp number only)"`.
    - Updated success and verification messages to state: `"ओटीपी आपके WhatsApp नंबर {displayPhone} पर भेज दिया गया है।"`.
  - [x] **Testing & Browser Verification**:
    - Ran `npm run build` with zero errors.
    - Successfully validated both Step 1 (phone entry) and Step 2 (OTP code input) in the browser subagent with visual screenshot confirmation.

- [x] **Phase 29: High-Contrast Dark Styling for OTP & Feedback Banners**
  - [x] **Success & Error Banner Contrast ([`AuthModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AuthModal.jsx))**:
    - Replaced low-contrast light pastel text (`#86efac` and `#fca5a5`) with deep, high-contrast dark tones:
      - **Success Banner**: Dark forest green text (`#14532d`), solid emerald icon (`#16a34a`), defined border (`1.5px solid #4ade80`), and light crisp background (`#f0fdf4`) with `fontWeight: 600`.
      - **Error Banner**: Deep crimson text (`#991b1b`), red alert icon (`#dc2626`), defined border (`1.5px solid #f87171`), and light background (`#fef2f2`) with `fontWeight: 600`.
    - Enhanced the WhatsApp dispatch notice card in Step 2 with dark green text (`#14532d`) and a crisp border (`1.5px solid #86efac`).
  - [x] **Verification**:
    - `npm run build` compiled cleanly in 767ms.
    - Verified in live browser subagent with screenshot confirmation (`media_1793009173402.png`) showing bold, clearly visible text on the sandstone modal background.

- [x] **Phase 30: Automatic Redirect & Navbar Navigation for Panditji Dashboard**
  - [x] **Automatic Redirect on Login ([`AuthModal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AuthModal.jsx) & [`App.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/App.jsx))**:
    - Added `onLoginSuccess(loggedInUser)` callback to `AuthModal.jsx` in both `handleCredentialsLogin` and `handleVerifyOtp`.
    - Wired `onLoginSuccess` in `App.jsx` to immediately open `setIsAdminOpen(true)` whenever Panditji or Admin logs in, auto-scrolling to the top of the dashboard.
    - Added URL hash listener in `App.jsx` (`#dashboard`, `#admin`, `#control-room`) to allow direct bookmarking/linking to the dashboard.
  - [x] **Persistent Navbar & Mobile Toggle ([`Navbar.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Navbar.jsx))**:
    - When authenticated as staff (`isStaff` = Panditji or Admin), the navbar right side now displays a dedicated button:
      - When on homepage: `🛡️ नियंत्रण कक्ष (Dashboard)`
      - When on Dashboard: `🛡️ मुख्य पृष्ठ (Home)`
    - Clicking the button smoothly toggles between the public website and the Panditji control room.
    - Added full-width `पंडित जी नियंत्रण कक्ष (Dashboard)` button in the mobile navigation drawer.
  - [x] **Footer Quick Link ([`Footer.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/Footer.jsx))**:
    - Added `नियंत्रण कक्ष (Dashboard)` link in the footer bottom bar for quick one-click navigation.
  - [x] **End-to-End Verification**:
    - Built with `npm run build` in 776ms with zero errors.
    - Tested full login flow in browser subagent: entered Panditji credentials, verified automatic transition to Dashboard, verified navbar toggle back to homepage, and verified re-opening Dashboard via navbar button.

- [x] **Phase 31: Browser Back Button History Integration & Home Page Navigation**
  - [x] **Root Cause Analysis**:
    - Previously, the Dashboard view was controlled solely via React component state (`isAdminOpen: true`) without creating an entry on the browser's history stack.
    - When a user landed on or navigated to the Dashboard and clicked the browser's native **Back button** (`←`), the browser popped the only history entry for the site, exiting the website entirely.
    - If `#dashboard` was visited without an active session or before state hydration, the restricted zone screen was rendered without a browser history stack to back out from.
  - [x] **Browser History Stack & Event Synchronization ([`App.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/App.jsx))**:
    - Initialized a baseline history state on mount via `window.history.replaceState({ page: 'home' }, '', window.location.href)`.
    - Added synchronization listeners for both `popstate` and `hashchange` events:
      - When browser Back is pressed and the URL hash is no longer `#dashboard`, `#admin`, or `#control-room`, `setIsAdminOpen(false)` is automatically triggered, returning the user directly to the home page within the site.
      - When browser Forward is pressed to `#dashboard`, the dashboard view is seamlessly restored.
    - In `onLoginSuccess`: when Panditji or Admin logs in, `window.history.pushState({ page: 'dashboard' }, '', '#dashboard')` ensures a dedicated history entry is created on the stack. For devotee/client logins, `handleCloseAdmin()` ensures clean home page routing.
    - Updated `handleCloseAdmin` to update the browser URL state cleanly back to `/` using `window.history.pushState({ page: 'home' }, '', window.location.pathname || '/')`.
    - Wired `onClose={handleCloseAdmin}` on [`AdminPortal.jsx`](file:///c:/Users/shiwa/Desktop/VedNetra/frontend/src/components/AdminPortal.jsx) so clicking "← मुख्य वेबसाइट पर वापस जाएं" on the restricted screen or "मुख्य वेबसाइट पर लौटें" resets both state and URL.
  - [x] **Verification**:
    - Built via `npm run build` with zero errors.
    - Tested end-to-end with the browser subagent (`browser_back_to_home_1793011520469.webp`):
      1. Logged in as Panditji (`panditrakeshrawal26@gmail.com`).
      2. Landed directly on the Panditji Dashboard at `#dashboard`.
      3. Pressed browser's native **Back button** (`←`).
      4. Browser smoothly transitioned to the VedNetra **Home page** (Hero, Services, Muhurat) without leaving the website.
      5. Re-entering dashboard and clicking back again verified consistent, predictable behavior.
