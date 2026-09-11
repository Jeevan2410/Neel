# NEEL ENTERPRISES — NEXT STEPS

**Last Updated:** 2024-01-XX  
**Current Phase:** Discovery Complete → Architecture (Phase 0 → Phase 1)

---

## IMMEDIATE NEXT TASKS (Session Continuation)

### 1. Complete Documentation Setup
- [x] `ASSET_INDEX.md` — Asset inventory complete
- [x] `PROJECT_STATE.md` — Project tracking created
- [x] `DECISIONS.md` — Decision log created
- [x] `ARCHITECTURE.md` — Technical architecture defined
- [ ] `NEXT_STEPS.md` — **This file** (in progress)
- [ ] `CONTENT_STATUS.md` — Content tracking (pending)
- [ ] `SEO_STATUS.md` — SEO checklist (pending)
- [ ] `DATABASE_SCHEMA.md` — Database design (pending)
- [ ] `KNOWN_ISSUES.md` — Issue tracking (pending)

### 2. Present Implementation Plan
- [ ] Review documentation with stakeholder (if applicable)
- [ ] Confirm architecture decisions
- [ ] Identify any missing requirements
- [ ] Get approval to proceed with Phase 1

### 3. Begin Phase 1: Architecture Setup
- [ ] Initialize Astro project (`npm create astro@latest`)
- [ ] Configure TypeScript (`tsconfig.json`)
- [ ] Configure Tailwind CSS (`tailwind.config.js`)
- [ ] Set up ESLint + Prettier
- [ ] Create `.env.example` with all required variables
- [ ] Set up Git ignore rules
- [ ] Create base folder structure (per `ARCHITECTURE.md`)

---

## PHASE 1: ARCHITECTURE & DESIGN SYSTEM

**Estimated Duration:** 1-2 sessions  
**Priority:** High (foundation for everything else)

### Tasks
1. **Astro Project Initialization**
   - [ ] Install Astro with TypeScript template
   - [ ] Configure `astro.config.mjs` (i18n, output, adapter)
   - [ ] Install Tailwind CSS integration
   - [ ] Set up ESLint + Prettier

2. **Design Tokens**
   - [ ] Define color palette (light + dark themes)
   - [ ] Typography scale (headings, body, captions)
   - [ ] Spacing system (Tailwind config)
   - [ ] Breakpoint configuration
   - [ ] Shadow/radius tokens
   - [ ] Motion/transition tokens

3. **Base Components**
   - [ ] `BaseLayout.astro` (root layout with HTML shell)
   - [ ] `PageLayout.astro` (standard page wrapper)
   - [ ] Navigation component (desktop + mobile)
   - [ ] Footer component
   - [ ] Button variants (primary, secondary, WhatsApp, etc.)
   - [ ] Typography components (H1, H2, lead text, etc.)

4. **Environment Configuration**
   - [ ] Create `.env.example`
   - [ ] Document all required env vars
   - [ ] Set up type-safe config access

5. **Documentation**
   - [ ] `DESIGN_SYSTEM.md` (tokens, components, usage)
   - [ ] Update `PROJECT_STATE.md` after phase completion

---

## PHASE 2: CORE PAGES

**Estimated Duration:** 2-3 sessions  
**Priority:** High (Tier 1 features)

### Tasks
1. **Homepage** (`index.astro`)
   - [ ] Hero section (company intro, CTAs)
   - [ ] Services overview
   - [ ] Electric × Diesel split
   - [ ] Engineering capability section
   - [ ] Industries preview
   - [ ] Brands/technical experience
   - [ ] Locations preview
   - [ ] FAQ preview
   - [ ] Contact CTA section

2. **About Page** (`about.astro`)
   - [ ] Company story (from Company Profile.docx)
   - [ ] 18+ years experience
   - [ ] Team/capabilities
   - [ ] Real photography

3. **Services Index** (`/services/index.astro`)
   - [ ] Service listing grid
   - [ ] Filter by Electric/Diesel
   - [ ] Links to detail pages

4. **Service Detail Template** (`/services/[slug].astro`)
   - [ ] Dynamic routing
   - [ ] Service description
   - [ ] Related services
   - [ ] CTA (Request Service)
   - [ ] FAQ integration

5. **Contact Page** (`contact.astro`)
   - [ ] Contact information
   - [ ] Map links (Kinnigoli, Bengaluru)
   - [ ] Email/WhatsApp CTAs
   - [ ] Enquiry form

6. **FAQ Page** (`faq.astro`)
   - [ ] FAQ listing (from Supabase)
   - [ ] Accordion interaction
   - [ ] FAQPage schema

7. **Location Pages** (`/locations/[slug].astro`)
   - [ ] Kinnigoli page
   - [ ] Bengaluru page
   - [ ] Map embeds
   - [ ] LocalBusiness schema

8. **Legal Pages**
   - [ ] Privacy Policy
   - [ ] Terms & Conditions

9. **Error Pages**
   - [ ] 404 page
   - [ ] 500 page

---

## PHASE 3: DATABASE & ADMIN

**Estimated Duration:** 2 sessions  
**Priority:** High (enables content management)

### Tasks
1. **Supabase Setup**
   - [ ] Create Supabase project
   - [ ] Run initial migrations (schema from `DATABASE_SCHEMA.md`)
   - [ ] Configure RLS policies
   - [ ] Create admin user
   - [ ] Test connection from Astro

2. **Database Schema Implementation**
   - [ ] `profiles` table
   - [ ] `admins` table
   - [ ] `services` + `service_translations`
   - [ ] `faqs` + `faq_translations`
   - [ ] `industries` + `industry_translations`
   - [ ] `locations` + `location_translations`
   - [ ] `brands` + `brand_relationships`
   - [ ] `media` table
   - [ ] `enquiries` table
   - [ ] `site_settings` table
   - [ ] `seo_metadata` table
   - [ ] `languages` table

3. **Admin Panel** (`/admin/*`)
   - [ ] Login page
   - [ ] Dashboard (enquiry overview)
   - [ ] Enquiries management (view, filter, mark as read)
   - [ ] Services CRUD
   - [ ] FAQs CRUD
   - [ ] Site settings
   - [ ] Translations management
   - [ ] SEO metadata management

4. **Security**
   - [ ] Protected routes (middleware)
   - [ ] Session management
   - [ ] RLS policy testing
   - [ ] Input validation

---

## PHASE 4: ENQUIRY SYSTEM

**Estimated Duration:** 1 session  
**Priority:** High (conversion-critical)

### Tasks
1. **Enquiry Form**
   - [ ] Multi-step form UX
   - [ ] Conditional fields by enquiry type
   - [ ] File upload (with validation)
   - [ ] Progress indicator
   - [ ] Client-side validation (Zod)

2. **Server-Side Handling**
   - [ ] Server action endpoint
   - [ ] Server-side validation (Zod)
   - [ ] Supabase insertion
   - [ ] Email notification service
   - [ ] Success/thank-you page

3. **WhatsApp Integration**
   - [ ] WhatsApp link generator utility
   - [ ] Pre-filled messages
   - [ ] Service-specific variants

4. **Email Integration**
   - [ ] Email service abstraction
   - [ ] Enquiry notification template
   - [ ] Customer confirmation template
   - [ ] SMTP/API provider setup

5. **Spam Protection**
   - [ ] Rate limiting
   - [ ] Cloudflare Turnstile (or alternative)
   - [ ] File upload restrictions

---

## PHASE 5: ADVANCED EXPERIENCE (TIER 2)

**Estimated Duration:** 2-3 sessions  
**Priority:** Medium (signature features, post-launch possible)

### Tasks
1. **Three.js Setup**
   - [ ] Dynamic import pattern
   - [ ] Scene configuration
   - [ ] Camera controls
   - [ ] Lighting setup
   - [ ] Fallback implementation

2. **3D Forklift Integration**
   - [ ] Model loader (GLTFLoader)
   - [ ] Draco/Meshopt decoder setup
   - [ ] Model optimization
   - [ ] Hotspot system
   - [ ] Component highlighting

3. **Interactive Features**
   - [ ] Machine Explorer (Electric/Diesel tabs)
   - [ ] Exploded View toggle
   - [ ] Component selection → Service linking
   - [ ] Scroll-linked camera movement

4. **Animation System**
   - [ ] GSAP integration
   - [ ] Lenis smooth scroll
   - [ ] ScrollTrigger setups
   - [ ] Page transitions
   - [ ] Reduced motion support

---

## PHASE 6: CLOUDINARY INTEGRATION

**Estimated Duration:** 1 session  
**Priority:** Medium (can start with local assets)

### Tasks
1. **Cloudinary Setup**
   - [ ] Create Cloudinary account
   - [ ] Configure environment variables
   - [ ] Install `astro-cloudinary`
   - [ ] Set up folder structure

2. **Media Management**
   - [ ] Upload existing assets
   - [ ] Generate optimized URLs
   - [ ] Update Supabase media table
   - [ ] Admin upload interface

3. **Image Optimization**
   - [ ] Responsive `srcset` generation
   - [ ] Format conversion (WebP/AVIF)
   - [ ] Lazy loading
   - [ ] Placeholder generation

---

## PHASE 7: SEO & MULTILINGUAL

**Estimated Duration:** 1-2 sessions  
**Priority:** High (search visibility)

### Tasks
1. **Multilingual System**
   - [ ] Astro i18n configuration
   - [ ] Language switcher component
   - [ ] URL routing (`/en/`, `/kn/`, `/hi/`)
   - [ ] hreflang implementation
   - [ ] Translation workflow (admin panel)

2. **SEO Implementation**
   - [ ] Metadata component (title, description, canonical)
   - [ ] Open Graph tags
   - [ ] Twitter Card tags
   - [ ] Structured data (JSON-LD)
   - [ ] Sitemap generation
   - [ ] robots.txt configuration

3. **Content Localization**
   - [ ] English content (primary)
   - [ ] Kannada translations
   - [ ] Hindi translations
   - [ ] Form labels/errors in all languages

---

## PHASE 8: TESTING & QA

**Estimated Duration:** 1 session  
**Priority:** High (pre-launch)

### Tasks
1. **Automated Testing**
   - [ ] Build test (CI)
   - [ ] TypeScript check (CI)
   - [ ] Lint check (CI)
   - [ ] Critical path tests (Vitest)

2. **Manual QA**
   - [ ] Functional testing (all forms, navigation)
   - [ ] Responsive testing (mobile, tablet, desktop)
   - [ ] Accessibility audit (keyboard, screen reader)
   - [ ] Performance audit (Lighthouse)
   - [ ] Cross-browser testing

3. **Security Review**
   - [ ] Environment variable audit
   - [ ] RLS policy testing
   - [ ] Form validation testing
   - [ ] File upload security
   - [ ] Dependency audit (`npm audit`)

---

## PHASE 9: DEPLOYMENT

**Estimated Duration:** 1 session  
**Priority:** High (launch)

### Tasks
1. **Cloudflare Setup**
   - [ ] Create Cloudflare account
   - [ ] Connect GitHub repository
   - [ ] Configure build settings
   - [ ] Set environment variables
   - [ ] Configure custom domain (when available)

2. **CI/CD Pipeline**
   - [ ] GitHub Actions workflow
   - [ ] Lint/typecheck/test on PR
   - [ ] Build on merge to main
   - [ ] Deploy to Cloudflare Pages
   - [ ] Preview deployments

3. **Production Checklist**
   - [ ] All Tier 1 features complete
   - [ ] SEO audit passed
   - [ ] Accessibility audit passed
   - [ ] Performance targets met
   - [ ] Security review passed
   - [ ] Documentation up-to-date
   - [ ] Backup strategy confirmed

---

## POST-LAUNCH (PHASE 10+)

**Priority:** Low (future enhancements)

- [ ] Fleet management system
- [ ] Customer portal
- [ ] Service history tracking
- [ ] AMC management
- [ ] Rental inventory system
- [ ] Used forklift catalogue
- [ ] Spare parts catalogue
- [ ] Blog/content marketing
- [ ] Advanced analytics dashboard

---

## CURRENT SESSION GOALS

**What we will accomplish in this session:**

1. ✅ Complete discovery documentation
2. ⏳ Create remaining docs (`CONTENT_STATUS.md`, `SEO_STATUS.md`, `DATABASE_SCHEMA.md`, `KNOWN_ISSUES.md`)
3. ⏳ Present implementation plan to user
4. ⏳ Begin Phase 1 setup (if approved)

**What we will NOT do in this session:**

- Build the homepage (too early without architecture)
- Set up Supabase (need credentials)
- Implement 3D features (Phase 5)
- Deploy to production (Phase 9)

---

## BLOCKERS / DEPENDENCIES

| Blocker | Owner | Impact |
|---------|-------|--------|
| Supabase credentials | Business/Admin | Cannot set up database |
| Cloudinary credentials | Business/Admin | Cannot optimize images |
| Domain name decision | Business | Cannot configure production URLs |
| 3D model source | Decision needed | Cannot implement Tier 2 features |
| Email provider choice | Decision needed | Cannot send notifications |

---

**Document maintained by:** Lead Product Architect  
**Next update:** After Phase 1 completion
