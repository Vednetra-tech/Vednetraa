import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryStrip from './components/CategoryStrip';
import EditorialFeature from './components/EditorialFeature';
import TrustBadges from './components/TrustBadges';
import FeaturedCollection from './components/FeaturedCollection';
import ServicesCatalog from './components/ServicesCatalog';
import BookingModal from './components/BookingModal';
import AstrologyModal from './components/AstrologyModal';
import AboutPanditji from './components/AboutPanditji';
import MuhuratCalendar from './components/MuhuratCalendar';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import AdminPortal from './components/AdminPortal';
import AuthModal from './components/AuthModal';
import ClientBookingsModal from './components/ClientBookingsModal';
import NotFoundPage from './components/NotFoundPage';
import UserPreferences from './components/UserPreferences';
import TermsAndConditionsModal from './components/TermsAndConditionsModal';
import Footer from './components/Footer';
import { MessageSquare } from 'lucide-react';
import { staticServices } from './data/staticServices';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, isStaff } = useAuth();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState(null);
  const [isAstrologyOpen, setIsAstrologyOpen] = useState(false);
  const [astrologyInitialService, setAstrologyInitialService] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // 404 Route handling (supports /404 route and manual triggers)
  const [isNotFound, setIsNotFound] = useState(() => {
    try {
      const p = window.location.pathname;
      return p === '/404' || p === '/404.html';
    } catch {
      return false;
    }
  });

  // Ensure base initial history state on first mount
  useEffect(() => {
    try {
      if (!window.history.state) {
        window.history.replaceState({ page: 'home' }, '', window.location.href);
      }
    } catch (e) {}
  }, []);

  // Listen for browser popstate & hashchange (Browser Back & Forward Buttons)
  useEffect(() => {
    const syncRouteFromBrowser = () => {
      try {
        const p = window.location.pathname;
        const h = window.location.hash;

        // If 404 route
        setIsNotFound(p === '/404' || p === '/404.html');

        // If user navigated via browser Back/Forward to/from dashboard hash
        if (h === '#dashboard' || h === '#admin' || h === '#control-room') {
          setIsAdminOpen(true);
        } else {
          // User hit Back button from Dashboard -> return to Home page!
          setIsAdminOpen(false);
        }
      } catch (e) {}
    };

    // Run on initial mount
    syncRouteFromBrowser();

    window.addEventListener('popstate', syncRouteFromBrowser);
    window.addEventListener('hashchange', syncRouteFromBrowser);
    return () => {
      window.removeEventListener('popstate', syncRouteFromBrowser);
      window.removeEventListener('hashchange', syncRouteFromBrowser);
    };
  }, []);

  const handleReturnHome = () => {
    try {
      window.history.pushState({ page: 'home' }, '', '/');
    } catch (e) {}
    setIsNotFound(false);
    setIsAdminOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    try {
      if (window.location.hash === '#dashboard' || window.location.hash === '#admin' || window.location.hash === '#control-room') {
        window.history.pushState({ page: 'home' }, '', window.location.pathname || '/');
      }
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAdmin = () => {
    if (isNotFound) setIsNotFound(false);
    if (!isAdminOpen) {
      try {
        window.history.pushState({ page: 'dashboard' }, '', '#dashboard');
      } catch (e) {}
      setIsAdminOpen(true);
    } else {
      handleCloseAdmin();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Authentication & Client Portal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState('client');
  const [isClientBookingsOpen, setIsClientBookingsOpen] = useState(false);
  const [resetTokenFromUrl, setResetTokenFromUrl] = useState(null);
  const [emailFromUrl, setEmailFromUrl] = useState(null);

  // Listen for Password Reset Token in URL (e.g. ?resetToken=...&email=...)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('resetToken');
      const email = searchParams.get('email');
      if (token) {
        setResetTokenFromUrl(token);
        if (email) setEmailFromUrl(email);
        setAuthInitialTab('panditji');
        setIsAuthOpen(true);
      }
    } catch (e) {
      console.warn('URL search parse error:', e);
    }
  }, []);

  const handleOpenAuth = (tab = 'client') => {
    setAuthInitialTab(tab);
    setIsAuthOpen(true);
  };

  const handleOpenBooking = (service = null) => {
    setBookingInitialService(service);
    setIsBookingOpen(true);
  };

  const handleOpenAstrology = (service = null) => {
    setAstrologyInitialService(service);
    setIsAstrologyOpen(true);
  };

  const [catalogCategory, setCatalogCategory] = useState('katha');

  const handleSelectMuhurat = (serviceTitle) => {
    const matched = staticServices.find(s => s.title === serviceTitle || s.subcategory === serviceTitle);
    handleOpenBooking(matched || { title: serviceTitle, id: null });
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat) => {
    setCatalogCategory(cat === 'all' ? 'katha' : cat);
    handleExploreServices();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      {/* Navbar with Admin Portal toggle and Auth triggers */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAstrology={() => handleOpenAstrology()}
        onToggleAdmin={handleToggleAdmin}
        isAdminOpen={isAdminOpen}
        onOpenAuth={(tab) => handleOpenAuth(tab)}
        onOpenClientBookings={() => setIsClientBookingsOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content: 404 Not Found vs Admin View vs Public Devotee View */}
      <main style={{ flex: 1, width: '100%', overflowX: 'hidden' }}>
        {isNotFound ? (
          <NotFoundPage
            onReturnHome={handleReturnHome}
            onExploreServices={() => {
              handleReturnHome();
              setTimeout(handleExploreServices, 120);
            }}
            onOpenBooking={() => {
              handleReturnHome();
              handleOpenBooking();
            }}
            onOpenAstrology={() => {
              handleReturnHome();
              handleOpenAstrology();
            }}
          />
        ) : isAdminOpen ? (
          <AdminPortal
            onClose={handleCloseAdmin}
            onOpenAuth={(tab) => handleOpenAuth(tab)}
          />
        ) : (
          <>
            {/* 1. Grand Editorial Hero (Matching NORD Template with Watermark & Kalash on Pedestal) */}
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onOpenAstrology={() => handleOpenAstrology()}
              onExploreServices={handleExploreServices}
            />

            {/* 2. Dark 3-Column Category Strip (Matching Template Dark Bar: Katha, Pooja, Jyotish) */}
            <CategoryStrip
              onSelectCategory={handleSelectCategory}
              onOpenBooking={() => handleOpenBooking()}
              onOpenAstrology={() => handleOpenAstrology()}
            />

            {/* 3. Editorial Feature Banner (Matching RAW TEXTURES Section: Shankh on Stone Slab) */}
            <EditorialFeature
              onExploreServices={handleExploreServices}
              onOpenBooking={() => handleOpenBooking()}
            />

            {/* 4. Value Props / Trust Badges Strip (Matching 4-Badge Value Strip) */}
            <TrustBadges />

            {/* 5. Featured Collection Grid (Matching BEST OF NORD Grid with Wishlist & Clean Cards) */}
            <FeaturedCollection
              onSelectServiceForBooking={(srv) => handleOpenBooking(srv)}
              onOpenAstrology={(srv) => handleOpenAstrology(srv)}
              onExploreServices={handleExploreServices}
            />

            {/* 6. Comprehensive Ritual Catalog & Filters */}
            <ServicesCatalog
              externalCategory={catalogCategory}
              onSelectServiceForBooking={(srv) => handleOpenBooking(srv)}
              onOpenAstrology={(srv) => handleOpenAstrology(srv)}
            />

            {/* 7. Panditji Gurukul Lineage & Sacred Background */}
            <AboutPanditji
              onOpenBooking={() => handleOpenBooking()}
              onOpenAstrology={() => handleOpenAstrology()}
            />

            {/* 8. Auspicious Muhurat Calendar */}
            <MuhuratCalendar
              onSelectMuhurat={handleSelectMuhurat}
            />

            {/* 9. Yajman Devotee Experiences & Reviews */}
            <Testimonials />

            {/* 10. Frequently Asked Questions */}
            <FaqSection />

            {/* 11. Contact & Priority WhatsApp Booking */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onSelectCategory={(cat) => handleExploreServices()} 
        onOpenTerms={() => setIsTermsOpen(true)}
        onToggleAdmin={handleToggleAdmin}
      />

      {/* Booking and Astrology Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        initialService={bookingInitialService}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingInitialService(null);
        }}
      />

      <AstrologyModal
        isOpen={isAstrologyOpen}
        initialService={astrologyInitialService}
        onClose={() => {
          setIsAstrologyOpen(false);
          setAstrologyInitialService(null);
        }}
      />

      {/* Unified Vedic Authentication Modal (Client OTP, Panditji, Admin) */}
      <AuthModal
        isOpen={isAuthOpen}
        initialTab={authInitialTab}
        resetTokenFromUrl={resetTokenFromUrl}
        emailFromUrl={emailFromUrl}
        onLoginSuccess={(loggedInUser) => {
          if (loggedInUser?.role === 'panditji' || loggedInUser?.role === 'admin') {
            try {
              if (window.location.hash !== '#dashboard') {
                window.history.pushState({ page: 'dashboard' }, '', '#dashboard');
              }
            } catch (e) {}
            setIsAdminOpen(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            handleCloseAdmin();
          }
        }}
        onClose={() => {
          setIsAuthOpen(false);
          setResetTokenFromUrl(null);
          setEmailFromUrl(null);
        }}
      />

      {/* Client My Bookings Modal */}
      <ClientBookingsModal
        isOpen={isClientBookingsOpen}
        onClose={() => setIsClientBookingsOpen(false)}
        onOpenNewBooking={() => handleOpenBooking()}
      />

      {/* Terms and Conditions Modal */}
      <TermsAndConditionsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />


      {/* Floating Transparent Vedic Concierge Chatbox (Identifies clearly as chatbox, 2-color compatible) */}
      <a
        href="https://wa.me/919827514489?text=नमस्ते%20पंडित%20राकेश%20चन्द्र%20रावल%20जी,%20मुझे%20पूजा%20Booking%20हेतु%20जानकारी%20चाहिए।"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 90,
          background: 'rgba(48, 16, 22, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(234, 139, 112, 0.45)',
          borderRadius: 'var(--radius-full)',
          padding: '0.55rem 1.15rem 0.55rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: '0 8px 24px rgba(15, 3, 6, 0.55)',
          textDecoration: 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: 'subtleFloat 6s ease-in-out infinite'
        }}
        title="पंडित जी से व्हाट्सएप पर चैट करें"
        aria-label="Chat with Panditji on WhatsApp"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.borderColor = 'var(--color-terracotta)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(15, 3, 6, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'rgba(234, 139, 112, 0.45)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(15, 3, 6, 0.55)';
        }}
      >
        {/* Transparent Icon Circle with subtle pulse ring */}
        <div style={{
          position: 'relative',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'rgba(234, 139, 112, 0.12)',
          border: '1px solid rgba(234, 139, 112, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--color-terracotta)">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.44 0-2.85-.38-4.09-1.11l-.29-.17-3.05.8 1.1-2.97-.19-.31a8.19 8.19 0 0 1-1.25-4.48c0-4.54 3.7-8.24 8.24-8.24m4.52 11.59c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8 2.53 1.08 2.53.72 2.99.68.46-.05 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29" />
          </svg>
          {/* Active status indicator dot */}
          <span style={{
            position: 'absolute',
            top: '0px',
            right: '0px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--color-terracotta)',
            boxShadow: '0 0 6px var(--color-terracotta)'
          }} />
        </div>

        {/* Chatbox Text Labels */}
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.25 }}>
          <div style={{
            fontSize: '0.82rem',
            color: 'var(--color-ivory)',
            fontWeight: 500,
            letterSpacing: '0.01em'
          }}>
            पंडित जी से चैट करें
          </div>
          <div style={{
            fontSize: '0.68rem',
            color: 'var(--color-terracotta)',
            fontWeight: 400,
            opacity: 0.95
          }}>
            WhatsApp सीधा संवाद
          </div>
        </div>
      </a>

      {/* User Preferences & Privacy Banner (Ad-blocker Safe) */}
      <UserPreferences />
    </div>
  );
}
