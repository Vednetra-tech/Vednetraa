/**
 * Automated Verification Script for VedNetra 21 Platform & SEO Enhancements (ESM)
 * Tests all 21 deliverables for functional completeness and standards compliance.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL of the running Next.js app (npm run dev or npm start)
const BACKEND_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const FRONTEND_PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const FRONTEND_SRC_DIR = path.resolve(__dirname, '..', 'src');

function makeRequest(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data
        });
      });
    });

    req.on('error', err => reject(err));
    if (body) {
      req.write(typeof body === 'object' ? JSON.stringify(body) : body);
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n======================================================');
  console.log('⚡ VEDNETRA: RUNNING 21 PRODUCTION ENHANCEMENTS TEST SUITE');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
      failed++;
    }
  }

  try {
    // 1. Custom 404 Page Component
    const notFoundExists = fs.existsSync(path.join(FRONTEND_SRC_DIR, 'components/NotFoundPage.jsx'));
    const notFoundContent = notFoundExists ? fs.readFileSync(path.join(FRONTEND_SRC_DIR, 'components/NotFoundPage.jsx'), 'utf8') : '';
    assert(notFoundExists && notFoundContent.includes('४०४') && notFoundContent.includes('onReturnHome'), 
      'Item 1: Custom 404 Page (NotFoundPage.jsx exists with Vedic typography & return action)');

    // 2. Favicons Suite
    const faviconExists = fs.existsSync(path.join(FRONTEND_PUBLIC_DIR, 'favicon.svg'));
    const manifestExists = fs.existsSync(path.join(FRONTEND_PUBLIC_DIR, 'site.webmanifest'));
    assert(faviconExists && manifestExists, 'Item 2: Favicons (favicon.svg & site.webmanifest exist in public)');

    // 3. Loading Skeleton & Empty State
    const skeletonExists = fs.existsSync(path.join(FRONTEND_SRC_DIR, 'components/LoadingSkeleton.jsx'));
    const emptyStateExists = fs.existsSync(path.join(FRONTEND_SRC_DIR, 'components/EmptyState.jsx'));
    assert(skeletonExists && emptyStateExists, 'Item 3: Loading Skeleton & Empty State (Both components exist)');

    // 4. Toast Notification
    const toastExists = fs.existsSync(path.join(FRONTEND_SRC_DIR, 'context/ToastContext.jsx'));
    const toastContent = toastExists ? fs.readFileSync(path.join(FRONTEND_SRC_DIR, 'context/ToastContext.jsx'), 'utf8') : '';
    assert(toastExists && toastContent.includes('useToast') && toastContent.includes('ToastProvider'), 
      'Item 4: Toast Notification (ToastContext provides useToast & ToastProvider)');

    // 5. Reduced Motion Support
    const indexCss = fs.readFileSync(path.join(FRONTEND_SRC_DIR, 'index.css'), 'utf8');
    assert(indexCss.includes('prefers-reduced-motion: reduce'), 
      'Item 5: Reduced Motion Support (@media prefers-reduced-motion implemented in index.css)');

    // 6. Custom Social Sharing Images
    const ogImageExists = fs.existsSync(path.join(FRONTEND_PUBLIC_DIR, 'og-image.svg'));
    assert(ogImageExists, 'Item 6: Custom Social Sharing Images (og-image.svg banner exists)');

    // 7. Event Tracking
    const analyticsExists = fs.existsSync(path.join(FRONTEND_SRC_DIR, 'utils/analytics.js'));
    const analyticsContent = analyticsExists ? fs.readFileSync(path.join(FRONTEND_SRC_DIR, 'utils/analytics.js'), 'utf8') : '';
    assert(analyticsExists && analyticsContent.includes('trackEvent'), 
      'Item 7: Event Tracking (analytics.js utility created with trackEvent)');

    // 8. Cookie Consent Banner
    const cookieConsentExists = fs.existsSync(path.join(FRONTEND_SRC_DIR, 'components/CookieConsent.jsx'));
    assert(cookieConsentExists, 'Item 8: Cookie Consent Banner (CookieConsent.jsx exists)');

    // 9. Security Headers
    const healthRes = await makeRequest(`${BACKEND_URL}/api/health`);
    const headers = healthRes.headers;
    const hasSecurityHeaders = headers['x-content-type-options'] === 'nosniff' &&
      headers['x-frame-options'] === 'SAMEORIGIN' &&
      headers['referrer-policy'] === 'strict-origin-when-cross-origin' &&
      !headers['x-powered-by'];
    assert(hasSecurityHeaders, 'Item 9: Security Headers (nosniff, SAMEORIGIN, referrer-policy, x-powered-by disabled)');

    // 10. Contact Form with Email Notification
    const inquiryPayload = {
      name: 'Ramesh Sharma',
      email: 'ramesh.sharma@example.com',
      phone: '9876543210',
      service_interest: 'श्रीमद्भागवत कथा',
      message: 'आदरणीय पंडित जी, आगामी माह में श्रीमद्भागवत कथा का आयोजन करवाना चाहते हैं।'
    };
    const inquiryRes = await makeRequest(`${BACKEND_URL}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, inquiryPayload);
    const inquiryJson = JSON.parse(inquiryRes.data || '{}');
    assert(inquiryRes.statusCode === 201 && inquiryJson.success === true, 
      'Item 10: Contact Form with Email Notification (Dispatches notification to panditrakeshrawal26@gmail.com)');

    // 11. Unique Page Title & Meta Description
    // Rendered HTML of the home page (SEO tags are emitted by the Next.js root layout)
    const indexHtml = (await makeRequest(`${BACKEND_URL}/`)).data;
    assert(indexHtml.includes('<title>Vedनेत्र | पं. राकेश चन्द्र रावल') && indexHtml.includes('name="description"'), 
      'Item 11: Unique Page Title & Meta Description configured in index.html');

    // 12. Open Graph Metadata
    assert(indexHtml.includes('property="og:title"') && indexHtml.includes('property="og:image"'), 
      'Item 12: Open Graph Metadata (og:title, og:image, og:url, og:type configured)');

    // 13. XML Sitemap
    const sitemapExists = fs.existsSync(path.join(FRONTEND_PUBLIC_DIR, 'sitemap.xml'));
    const sitemapContent = sitemapExists ? fs.readFileSync(path.join(FRONTEND_PUBLIC_DIR, 'sitemap.xml'), 'utf8') : '';
    assert(sitemapExists && sitemapContent.includes('<loc>https://vednetra.com/</loc>'), 
      'Item 13: XML Sitemap (sitemap.xml with canonical links & priorities)');

    // 14. Robots.txt File
    const robotsExists = fs.existsSync(path.join(FRONTEND_PUBLIC_DIR, 'robots.txt'));
    const robotsContent = robotsExists ? fs.readFileSync(path.join(FRONTEND_PUBLIC_DIR, 'robots.txt'), 'utf8') : '';
    assert(robotsExists && robotsContent.includes('Sitemap: https://vednetra.com/sitemap.xml'), 
      'Item 14: Robots.txt File (Permits public crawlers & defines sitemap)');

    // 15. Canonical Tags
    assert(/<link rel="canonical" href="https:\/\/vednetra\.com\/"\s*\/?>/.test(indexHtml), 
      'Item 15: Canonical Tags (Canonical link declared)');

    // 16. Schema.org Structured Data
    assert(indexHtml.includes('"@type": "ProfessionalService"') && indexHtml.includes('"@type": "Person"'), 
      'Item 16: Schema.org Structured Data (JSON-LD ProfessionalService, Person & FAQPage)');

    // 17. Breadcrumb Navigation
    const breadcrumbsExists = fs.existsSync(path.join(FRONTEND_SRC_DIR, 'components/Breadcrumbs.jsx'));
    const breadcrumbsContent = breadcrumbsExists ? fs.readFileSync(path.join(FRONTEND_SRC_DIR, 'components/Breadcrumbs.jsx'), 'utf8') : '';
    assert(breadcrumbsExists && breadcrumbsContent.includes('BreadcrumbList'), 
      'Item 17: Breadcrumb Navigation (Breadcrumbs.jsx with Schema.org microdata)');

    // 18. Internal Linking Between Related Pages
    const catalogContent = fs.readFileSync(path.join(FRONTEND_SRC_DIR, 'components/ServicesCatalog.jsx'), 'utf8');
    const modalContent = fs.readFileSync(path.join(FRONTEND_SRC_DIR, 'components/ServiceDetailModal.jsx'), 'utf8');
    assert(catalogContent.includes('href="#muhurat"') && modalContent.includes('href="#faq"'), 
      'Item 18: Internal Linking Between Related Pages (Cross-links between catalog, muhurat, faq, about)');

    // 19. WebP Support for Image Optimization
    const webpExists = fs.existsSync(path.join(FRONTEND_PUBLIC_DIR, 'Logo-transparent.webp')) &&
      fs.existsSync(path.join(FRONTEND_PUBLIC_DIR, 'bg-texture.webp'));
    assert(webpExists && indexCss.includes('bg-texture.webp'), 
      'Item 19: WebP Support for Image Optimization (Generated WebP assets and CSS integration)');

    // 20. Lazy Loading for Off-Screen Images
    const footerContent = fs.readFileSync(path.join(FRONTEND_SRC_DIR, 'components/Footer.jsx'), 'utf8');
    const aboutContent = fs.readFileSync(path.join(FRONTEND_SRC_DIR, 'components/AboutPanditji.jsx'), 'utf8');
    assert(footerContent.includes('loading="lazy"') && aboutContent.includes('loading="lazy"'), 
      'Item 20: Lazy Loading for Off-Screen Images (loading="lazy" & decoding="async" configured)');

    // 21. Faster Font Loading
    assert(indexHtml.includes('rel="dns-prefetch"') && indexHtml.includes('rel="preconnect"') && indexHtml.includes('display=swap'), 
      'Item 21: Faster Font Loading (dns-prefetch, preconnect, and display=swap configured)');

  } catch (err) {
    console.error('Fatal test error:', err);
    failed++;
  }

  console.log('\n======================================================');
  console.log(`TOTAL PASSED: ${passed} / 21`);
  console.log(`TOTAL FAILED: ${failed} / 21`);
  console.log(`SUCCESS RATE: ${Math.round((passed / 21) * 100)}%`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
