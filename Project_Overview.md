# Vedनेत्र (VedNetra) — Comprehensive Project Blueprint & Architecture

> **Official Digital Sanctuary for Pandit Rakesh Chandra Rawal**  
> *Tradition, Vedic Precision, and Modern Elegance in Sacred Ceremonies.*

---

## 1. Executive Summary & Vision

**Vedनेत्र (VedNetra)** is an elevated, bespoke web application designed for **Pandit Rakesh Chandra Rawal**, providing devotees and seekers worldwide access to authentic Vedic rituals, astrological guidance, and spiritual ceremonies.

### Distinctive Positioning:
Unlike typical generic spiritual websites that rely on standard saffron-orange and white templates, **Vedनेत्र** delivers a **luxurious, royal Vedic experience**:
- **Primary Color:** Deep Royal Crimson / Wine Burgundy (`#682e36`).
- **Secondary Accent:** Divine Champagne Gold (`#D4AF37` / `#F3E5AB`).
- **Tertiary Accent:** Sacred Sandalwood / Parchment Ivory (`#FDFBF7`) and Velvet Obsidian Charcoal (`#1B1214`).
- **Texture & Feel:** Subtle sacred Vedic geometry, woven silk / parchment textures, gold foil micro-borders, and smooth glassmorphism.
- **Micro-Interactions:** Elegant transitions, serene animations, and zero horizontal scroll on any viewport.

---

## 2. Service Catalog & Offerings

Every service mentioned in [Context.md](file:///c:/Users/shiwa/Desktop/VedNetra/Context.md) is structured with full detail, offerings, duration, samagri details, and booking options:

### 1. श्रीमद्भागवत कथा (Shrimad Bhagwat Katha)
- **सादा पाठ (Sada Paath):** Traditional seven-day/nine-day recitation with authentic Vedic shlokas and explanations.
- **संगीतमय भागवत (Bhagwat with Sangeet):** Devotional musical rendition accompanied by traditional instruments, kirtan, and rasamrit vyakhyan.

### 2. विशिष्ट पूजा (Pooja & Anushthan)
- **Online Pooja:** Live HD stream rituals with interactive Sankalp via video conference for devotees anywhere in the world.
- **Offline Pooja:** In-person ceremonial puja at devotee's home, temple, or sacred teerth sthal.

### 3. दोष निवारण (Dosh Nivaran)
- **Complete Dosh Nivaran:** Kaal Sarp, Mangal, Pitra, Shani Sade Sati, and Graha Shanti vidhi with prescribed Vedic remedies.
- **Vastu Dosh Checking:** Detailed Vastu inspection, energy balancing, and Vedic remedy recommendations for residential & commercial spaces.

### 4. रत्न सलाह एवं ज्योतिष (Ratna Salah & Astrological Guidance)
- **कुण्डली मिलान (Kundali Milan):** Comprehensive Ashtakoot and Dashakoot matching with Mangal dosh analysis and remedy advisory.
- **फलादेश (Faladesh):** In-depth horoscope reading, planetary dasha analysis, career, health, and spiritual life path predictions.

### 5. अभिषेक (Abhishekh)
- **Simple Abhishekh:** Panchamrit and sacred water abhishekh for daily or festive propitiation.
- **रुद्र अभिषेक (Rudra Abhishekh):** Elaborate Rudrabhishek chanting Sri Rudram, Chamakam, Mahamrityunjaya, and Bilva archana for health and prosperity.

### 6. वैदिक हवन (Vedic Hawan)
- **सप्तशती पाठ हवन (Sapt Sati Paath Hawan):** Durga Saptashati 13 adhyayas path with Ahuti, Samagri, and Chandi homam.
- **Online Hawan:** Live interactive Hawan ceremony where devotees participate with their own domestic hawan kund or sankalp.

---

## 3. Core Features & User Journey

### For Devotees & Clients
1. **Atmospheric Hero Section:**
   - Majestic welcome with Pandit Rakesh Chandra Rawal's introduction, blessings, and quick actions ("Book a Pooja", "Consult Kundali", "Explore Kathas").
2. **Interactive Service Explorer:**
   - Filterable catalog (Katha, Pooja, Dosh Nivaran, Jyotish, Abhishekh, Hawan).
   - Rich modal / drawer with ritual significance, samagri checklist, preparation guidelines, and booking button.
3. **Seamless Ritual Booking & Sankalp Engine:**
   - Select service, ritual mode (Online vs Offline), preferred date & time.
   - Sankalp form capturing Devotee Name, Gotra, Nakshatra/Rashi, Birth details (for Jyotish), Address/Location, and special intentions.
4. **Ratna Salah & Kundali Consultation Form:**
   - Dedicated portal for birth chart details (Date, Time, Place of Birth) and specific questions.
5. **Panditji's Profile & Vedic Lineage:**
   - Authentic biography, years of practice, philosophy, gurukul traditions, and testimonials from satisfied devotees.
6. **Sacred Calendar & Muhurat Inquiry:**
   - Guide to upcoming auspicious dates (Amavasya, Purnima, Ekadashi, Pradosh, Navratri).
7. **Direct WhatsApp & Instant Contact Integration:**
   - One-tap priority connection to Panditji's office.

### For Management / Panditji (Backend & Admin)
1. **Bookings & Inquiries Manager:**
   - View pending, confirmed, and completed ritual bookings.
   - Filter by Online / Offline, date, and service type.
2. **Sankalp & Devotee Records:**
   - Quick export/view of gotra, birth details, and puja notes for conducting rituals smoothly.

---

## 4. Technical Architecture

### Frontend (React.js)
- **Build Tool:** Vite + React (Fast HMR, optimized production build)
- **Styling:** Bespoke Vanilla CSS & CSS Variables design system:
  - Custom color tokens (`--color-burgundy-900: #42161c`, `--color-burgundy-700: #682e36`, `--color-burgundy-500: #883e49`, `--color-gold-500: #d4af37`, `--color-gold-300: #f3e5ab`, `--color-ivory: #fdfbf7`, etc.)
  - Elegant typography: Serif headers (Cinzel / Rozha One / Playfair) + Clean sans body (Outfit / Plus Jakarta Sans)
  - Responsive layouts using CSS Grid & Flexbox, strict mobile width clamp (`overflow-x: hidden`, `width: 100%`) to prevent side scrolling.
- **Icons:** Lucide-react for lightweight, crisp vector icons.
- **State & Routing:** Clean modular state management for booking flow, service filtering, and modal drawers.

### Backend (Node.js & Express.js)
- **Framework:** Express.js REST API with CORS, Helmet, and structured error handling.
- **Endpoints:**
  - `GET /api/services` — Full service catalog with categories, sub-services, and descriptions.
  - `POST /api/bookings` — Submit ritual booking / sankalp request.
  - `GET /api/bookings` — Retrieve bookings (filtered by status or date).
  - `POST /api/consultations` — Submit Ratna Salah / Kundali consultation.
  - `POST /api/inquiries` — Quick contact / Muhurat inquiry.
  - `GET /api/health` — API health check.

### Database (PostgreSQL)
- **Tables:**
  - `services` (id, title, category, description, duration, mode_available, base_dakshina)
  - `bookings` (id, devotee_name, phone, email, gotra, service_id, ritual_mode, preferred_date, preferred_time, venue_address, special_requests, status, created_at)
  - `consultations` (id, devotee_name, phone, email, dob, tob, pob, consultation_type, query, status, created_at)
  - `inquiries` (id, name, phone, email, subject, message, created_at)

---

## 5. Development Phases

| Phase | Milestone Description | Status |
|---|---|---|
| **Phase 1** | **Blueprint & Architecture Finalization**<br>Finalize requirements, database schemas, directory structures, and design tokens. | 🔄 In Progress |
| **Phase 2** | **Full-Stack Project Setup**<br>Initialize Express backend, PostgreSQL connection & migrations, and React Vite frontend. | ⏳ Pending |
| **Phase 3** | **Backend REST API & Database Layer**<br>Build service models, booking handlers, consultation endpoints, and validation logic. | ⏳ Pending |
| **Phase 4** | **Luxury Vedic UI Design System & Frontend Shell**<br>Implement `#682e36` theme, gold accents, textures, typography, header, footer, and responsive layout. | ⏳ Pending |
| **Phase 5** | **Core Modules & Interactive Pages**<br>Hero section, Service Catalog & Modals, Multi-step Booking & Sankalp Engine, Ratna/Kundali Consultation, Panditji Bio, Testimonials, FAQ. | ⏳ Pending |
| **Phase 6** | **Admin / Panditji Management Portal & Testing**<br>Booking dashboard, filter by date/status, mobile responsiveness audit (zero overflow check), and documentation updates in `Updates.md`. | ⏳ Pending |
