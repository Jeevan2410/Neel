# NEEL ENTERPRISES — ARCHITECTURE

**Last Updated:** 2024-01-XX  
**Version:** 1.0  
**Status:** Initial architecture defined

---

## 1. SYSTEM OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                      CLOUDFLARE PAGES                        │
│  (CDN, HTTPS, Compression, Caching, Edge Functions)          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    ASTRO APPLICATION                         │
│  (Static Pages + Islands + SSR where needed)                 │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Public    │  │   Client    │  │   Server    │          │
│  │   Pages     │  │   Islands   │  │   Routes    │          │
│  │  (Static)   │  │ (3D, Forms) │  │  (API/SSR)  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
         │                    │                    │
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   CLOUDINARY    │  │    SUPABASE     │  │  EMAIL SERVICE  │
│  (Media CDN)    │  │ (DB + Auth + RLS)│  │  (SMTP/API)     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 2. TECH STACK

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Astro 5.x | Static site generation, islands architecture, i18n |
| **Language** | TypeScript | Type safety, better DX |
| **Styling** | Tailwind CSS | Utility-first CSS, design tokens |
| **3D** | Three.js | Interactive forklift visualization |
| **Animation** | GSAP + Lenis | Scroll choreography, smooth scroll |
| **Database** | Supabase (PostgreSQL) | Content storage, enquiries, admin auth |
| **Media** | Cloudinary | Image optimization, transformations, CDN |
| **Forms** | Zod + Server Actions | Validation, submission handling |
| **Hosting** | Cloudflare Pages | Deployment, CDN, edge functions |
| **CI/CD** | GitHub Actions | Automated testing, deployment |

---

## 3. PROJECT STRUCTURE

```
/workspace/
├── public/                     # Static assets (served as-is)
│   ├── images/                 # Organized image assets
│   │   ├── brand/              # Company logos
│   │   ├── brands/             # Brand partner logos
│   │   ├── gallery/            # General photography
│   │   ├── locations/          # Office photos
│   │   ├── services/           # Service-specific imagery
│   │   └── favicon/            # Favicons
│   ├── models/                 # 3D models (.glb/.gltf)
│   └── fonts/                  # Custom fonts
│
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Base components (Button, Card, etc.)
│   │   ├── layout/             # Layout components (Header, Footer, etc.)
│   │   ├── sections/           # Page sections (Hero, Services, etc.)
│   │   ├── forms/              # Form components
│   │   ├── 3d/                 # Three.js components
│   │   └── seo/                # SEO components (Schema, Meta, etc.)
│   │
│   ├── layouts/                # Page layouts
│   │   ├── BaseLayout.astro    # Root layout
│   │   ├── PageLayout.astro    # Standard page layout
│   │   └── AdminLayout.astro   # Admin panel layout
│   │
│   ├── pages/                  # Astro pages (routes)
│   │   ├── index.astro         # Homepage
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── services/           # Service pages
│   │   ├── industries/         # Industry pages
│   │   ├── locations/          # Location pages
│   │   ├── faq.astro
│   │   ├── privacy-policy.astro
│   │   ├── terms.astro
│   │   └── admin/              # Admin panel (protected)
│   │
│   ├── styles/                 # Global styles
│   │   └── global.css          # Tailwind imports, custom CSS
│   │
│   ├── lib/                    # Utilities and libraries
│   │   ├── supabase/           # Supabase client, queries
│   │   ├── cloudinary/         # Cloudinary utilities
│   │   ├── whatsapp/           # WhatsApp link generator
│   │   ├── email/              # Email service abstraction
│   │   ├── validation/         # Zod schemas
│   │   └── utils/              # General utilities
│   │
│   ├── config/                 # Configuration files
│   │   ├── site.ts             # Site-wide config
│   │   ├── navigation.ts       # Navigation structure
│   │   ├── services.ts         # Services config
│   │   └── 3d.ts               # Three.js scene config
│   │
│   ├── content/                # Content collections (if used)
│   │   └── ...
│   │
│   └── middleware.ts           # Astro middleware (auth, i18n, etc.)
│
├── database/
│   └── migrations/             # Supabase SQL migrations
│
├── docs/                       # Documentation
│   ├── PROJECT_STATE.md
│   ├── DECISIONS.md
│   ├── ASSET_INDEX.md
│   ├── ARCHITECTURE.md
│   ├── NEXT_STEPS.md
│   ├── CONTENT_STATUS.md
│   ├── SEO_STATUS.md
│   ├── DATABASE_SCHEMA.md
│   ├── KNOWN_ISSUES.md
│   └── ...
│
├── .env.example                # Environment variable template
├ .gitignore
├ package.json
├ tsconfig.json
├ tailwind.config.js
├ astro.config.mjs
└── README.md
```

---

## 4. DATA FLOW

### 4.1 Content Flow (Public Pages)

```
Supabase DB → Astro (build time) → Static HTML → Cloudflare CDN → User
                          ↓
                    (Incremental rebuild on content change)
```

**Key Points:**
- Most public pages are static (generated at build time)
- Content fetched from Supabase during build
- ISR (Incremental Static Regeneration) for frequently updated content
- No database calls on page load (fast TTFB)

### 4.2 Enquiry Flow

```
User → Form (Client) → Server Action → Validation (Zod) → Supabase (Store)
                                              ↓
                                        Email Notification
                                              ↓
                                         Admin Panel
```

**Key Points:**
- Server-side validation (never trust client)
- Store enquiry in Supabase (permanent record)
- Send email notification (immediate awareness)
- Admin can view/manage in dashboard

### 4.3 Admin Authentication Flow

```
Admin → /admin/login → Supabase Auth → Session Cookie → Protected Routes
                                      ↓
                                RLS Policies (DB level)
```

**Key Points:**
- Supabase Auth handles password hashing
- Secure HTTP-only cookies for sessions
- Row Level Security enforces access at DB level
- Never expose service role key to client

### 4.4 Media Flow

```
Admin Upload → Cloudinary API → Optimized CDN URLs → Supabase (metadata)
                                              ↓
                                        Public Pages (via build)
```

**Key Points:**
- Cloudinary handles optimization (WebP/AVIF, responsive sizes)
- Supabase stores metadata (URLs, alt text, captions)
- Astro fetches metadata during build
- Images served via Cloudinary CDN (fast, global)

---

## 5. I18N ARCHITECTURE

### 5.1 URL Structure

```
/                   → Redirects to /en/ (or detects preference)
/en/                → English (default)
/kn/                → Kannada
/hi/                → Hindi

/en/services/electric-forklift-repair
/kn/services/electric-forklift-repair
/hi/services/electric-forklift-repair
```

### 5.2 Content Strategy

```
Supabase Tables:
- services (base data)
- service_translations (service_id, language, title, description, ...)
- faqs (base data)
- faq_translations (faq_id, language, question, answer)
- ... (same pattern for all translatable content)
```

**Build Process:**
1. Fetch all content for specific language from Supabase
2. Generate static pages for each language variant
3. Add hreflang tags for SEO
4. Language switcher preserves current page path

---

## 6. SECURITY ARCHITECTURE

### 6.1 Environment Variables

```env
# Public (safe for client-side)
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_PUBLISHABLE_KEY=
PUBLIC_CLOUDINARY_CLOUD_NAME=
PUBLIC_CLOUDINARY_API_KEY=
SITE_URL=

# Server-only (NEVER expose to client)
SUPABASE_SERVICE_ROLE_KEY=
CLOUDINARY_API_SECRET=
EMAIL_PROVIDER_KEY=
TURNSTILE_SECRET_KEY=
```

### 6.2 Row Level Security (RLS)

```sql
-- Example: enquiries table
CREATE POLICY "Public can insert enquiries"
ON enquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all enquiries"
ON enquiries FOR SELECT
USING (auth.uid() IN (SELECT user_id FROM admins));

CREATE POLICY "Users cannot view other enquiries"
ON enquiries FOR SELECT
USING (false); -- Block all public reads
```

### 6.3 Input Validation

- **Client-side:** Zod schemas (UX, immediate feedback)
- **Server-side:** Zod schemas (security, never trust client)
- **File uploads:** Type whitelist, size limits, quantity limits

### 6.4 CSP & Headers

```
Content-Security-Policy: default-src 'self'; img-src 'self' cloudinary.com; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
```

---

## 7. PERFORMANCE STRATEGY

### 7.1 Loading Strategy

| Resource | Load Strategy | Priority |
|----------|---------------|----------|
| HTML | Static (pre-built) | Critical |
| CSS | Inline critical, defer rest | High |
| JS (core) | Minimal, defer | Medium |
| JS (3D) | Dynamic import (only on homepage) | Low |
| JS (GSAP) | Dynamic import (only where needed) | Low |
| Images | Lazy load, priority on hero | Variable |
| Fonts | Preload critical, swap strategy | Medium |
| 3D Model | Lazy load, show fallback first | Low |

### 7.2 Performance Budget

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP | < 2.5s | Lighthouse |
| CLS | < 0.1 | Lighthouse |
| INP | < 200ms | Lighthouse |
| TTFB | < 600ms | Lighthouse |
| Total JS (homepage) | < 150KB | Bundle analyzer |
| Total JS (other pages) | < 50KB | Bundle analyzer |
| Hero image | < 100KB | Manual audit |
| 3D model | < 5MB (compressed) | Manual audit |

### 7.3 Optimization Techniques

- **Images:** AVIF/WebP, responsive `srcset`, lazy loading
- **Fonts:** `font-display: swap`, subset characters
- **3D:** Draco/Meshopt compression, LOD, lazy loading
- **JS:** Tree-shaking, code-splitting, dynamic imports
- **CSS:** Purge unused, minimize specificity
- **HTML:** Minify, semantic structure

---

## 8. ACCESSIBILITY STRATEGY

### 8.1 WCAG 2.1 AA Compliance

- **Keyboard navigation:** All interactive elements accessible
- **Focus states:** Visible focus indicators on all elements
- **Color contrast:** Minimum 4.5:1 for text, 3:1 for UI elements
- **ARIA:** Used only when native semantics insufficient
- **Alt text:** Meaningful descriptions for all images
- **Form labels:** Every input has associated label
- **Heading hierarchy:** Logical H1 → H2 → H3 structure
- **Skip links:** Skip to main content option

### 8.2 Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable parallax */
  /* Disable scroll-linked animations */
  /* Disable cursor effects */
  /* Shorten transition durations */
  /* Replace complex animations with fades */
}
```

### 8.3 3D Accessibility

- Text alternatives for all 3D content
- Keyboard navigation for 3D interactions
- Option to disable 3D entirely
- Fallback content always available

---

## 9. SEO ARCHITECTURE

### 9.1 Structured Data

- **Organization:** Company info, contacts, social profiles
- **LocalBusiness:** Location-specific data (Kinnigoli, Bengaluru)
- **Service:** Each service page has Service schema
- **FAQPage:** FAQ page with valid FAQ schema
- **BreadcrumbList:** Navigation breadcrumbs
- **WebSite:** Site-wide metadata
- **WebPage:** Page-specific metadata

### 9.2 Metadata Per Page

- Title tag (unique, < 60 chars)
- Meta description (unique, < 160 chars)
- Canonical URL
- Open Graph tags (title, description, image)
- Twitter Card tags
- hreflang alternates (for multilingual)
- Robots meta (index/noindex, follow/nofollow)

### 9.3 Sitemap & Robots

- **sitemap.xml:** All public, indexable pages
- **robots.txt:** Allow public, block admin
- **Noindex:** Admin pages, thank-you pages, 404

---

## 10. DEPLOYMENT ARCHITECTURE

### 10.1 CI/CD Pipeline

```yaml
GitHub Push → GitHub Actions → Install → Lint → Typecheck → Test → Build → Deploy
                                           ↓
                                    (Fail fast on errors)
```

### 10.2 Environments

| Environment | Branch | Purpose |
|-------------|--------|---------|
| Production | `main` | Live website |
| Preview | PR branches | Review before merge |
| Development | Local/feature branches | Development |

### 10.3 Cloudflare Configuration

- **DNS:** Managed by Cloudflare
- **SSL:** Automatic HTTPS
- **Caching:** Static assets cached aggressively
- **Compression:** Brotli enabled
- **Headers:** Security headers configured
- **Redirects:** WWW → non-WWW, HTTP → HTTPS
- **Edge Functions:** SSR routes (if needed)

---

## 11. MONITORING & ANALYTICS

### 11.1 Analytics Events

- WhatsApp click
- Email click
- Request service form start/complete
- Service page view
- Language switch
- Location click (map link)

### 11.2 Performance Monitoring

- Core Web Vitals (LCP, CLS, INP)
- Lighthouse scores (periodic audits)
- Bundle size tracking (CI check)

### 11.3 Error Tracking

- 404 logging (missing pages)
- Form submission failures
- 3D loading failures
- Database query errors

---

## 12. MAINTENANCE STRATEGY

### 12.1 Documentation Updates

- Update `/docs/` after each significant change
- Keep `PROJECT_STATE.md` current
- Log decisions in `DECISIONS.md`
- Track known issues in `KNOWN_ISSUES.md`

### 12.2 Dependency Management

- Regular security audits (`npm audit`)
- Update dependencies quarterly (or sooner for security patches)
- Pin versions in `package.json` (no `^` or `~` for critical deps)

### 12.3 Content Updates

- Admin panel for non-technical users
- Version control for code changes
- Staging/preview before production deploy

---

**Document maintained by:** Lead Product Architect  
**Review cadence:** Update with each architectural change
