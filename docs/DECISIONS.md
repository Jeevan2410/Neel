# NEEL ENTERPRISES — DECISIONS LOG

**Purpose:** Track significant architectural, design, and business decisions with rationale and alternatives considered.

---

## DECISION 001: Framework Selection

**Date:** 2024-01-XX  
**Decision:** Use Astro as the primary framework  
**Status:** ✅ Decided

### Rationale
- Static-first architecture aligns with SEO requirements
- Islands architecture allows selective client-side interactivity (3D, forms)
- Built-in i18n routing support for multilingual (EN/KN/HI)
- Excellent performance out of the box (minimal JS by default)
- Cloudflare Pages deployment is well-supported
- Can use React/Preact/Svelte components where needed without committing to a full SPA

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| Next.js | Overkill for primarily static content; heavier client bundle |
| Nuxt | Similar concerns; Vue ecosystem less familiar to team |
| Pure HTML/CSS/JS | No component system, harder to maintain, no SSR options |
| Gatsby | Slower builds, more complex than needed |

### Consequences
- Need to learn Astro-specific patterns (if team unfamiliar)
- Some React ecosystem libraries need Astro adapters
- Limited server-side functionality (use Supabase Edge Functions if needed)

---

## DECISION 002: Styling Approach

**Date:** 2024-01-XX  
**Decision:** Tailwind CSS with design tokens  
**Status:** ✅ Decided

### Rationale
- Rapid development with utility classes
- Consistent design system through token configuration
- Purges unused CSS automatically (performance)
- Dark mode support built-in
- Large ecosystem and community support
- Works seamlessly with Astro

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| Plain CSS | Harder to maintain consistency, no design tokens |
| Sass/SCSS | More build complexity, less standardized |
| CSS-in-JS | Client-side overhead, not ideal for Astro's static-first approach |
| Styled Components | Same as above; unnecessary for this project |

### Consequences
- Need disciplined token management (no arbitrary values)
- Learning curve for team members unfamiliar with utility-first CSS
- Must audit both light and dark themes for accessibility

---

## DECISION 003: Database & Backend

**Date:** 2024-01-XX  
**Decision:** Supabase (PostgreSQL + Auth + RLS)  
**Status:** ✅ Decided

### Rationale
- Managed PostgreSQL with Row Level Security (critical for multi-user admin)
- Built-in authentication (no custom password system needed)
- Real-time subscriptions possible for future features
- Integrates well with Astro (server-side and client-side)
- Cost-effective for small-to-medium traffic
- Provides structured content storage for services, FAQs, enquiries, translations

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| MongoDB Atlas | No RLS, would need custom auth/authorization layer |
| Firebase | Less SQL flexibility, weaker relational data support |
| PlanetScale | No built-in auth, would need separate solution |
| Self-hosted PostgreSQL | Operational overhead, not justified for this scale |

### Consequences
- Need to configure RLS policies carefully (security critical)
- Service role key must never be exposed client-side
- Migration management required (`database/migrations/`)
- Dependency on Supabase uptime (acceptable risk)

---

## DECISION 004: Media Storage

**Date:** 2024-01-XX  
**Decision:** Cloudinary (not Supabase Storage)  
**Status:** ✅ Decided

### Rationale
- Superior image optimization (auto WebP/AVIF, responsive sizes)
- Transformations via URL (crop, resize, format conversion)
- CDN included (faster global delivery)
- `astro-cloudinary` integration available
- Better suited for image-heavy industrial website
- Supabase Storage lacks advanced image processing

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| Supabase Storage | No built-in transformations, would need separate service |
| AWS S3 + CloudFront | More complex setup, no transformations without Lambda |
| Local `/public/` folder | No optimization, no CDN, hard to manage at scale |
| Imgix | Similar to Cloudinary but Cloudinary has better Astro integration |

### Consequences
- Additional environment variables to manage
- Need to sync media metadata to Supabase (for admin panel)
- Vendor lock-in (mitigated by abstraction layer)

---

## DECISION 005: 3D Library

**Date:** 2024-01-XX  
**Decision:** Three.js (vanilla, dynamically imported)  
**Status:** ✅ Decided

### Rationale
- Industry standard for WebGL
- Full control over scene, camera, lighting, interactions
- Lightweight when tree-shaken and lazy-loaded
- Compatible with Astro islands (load only where needed)
- Large ecosystem (examples, shaders, loaders)
- Supports Draco/Meshopt compression for model optimization

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| React Three Fiber | Requires React, unnecessary abstraction for this use case |
| Spline | Proprietary, less control, vendor lock-in |
| Babylon.js | Heavier, less community adoption |
| Model Viewer | Too limited for custom interactions (exploded view, hotspots) |

### Consequences
- Need careful performance management (mobile fallback mandatory)
- Must implement `prefers-reduced-motion` support
- Dynamic imports add complexity to code structure
- Team needs Three.js expertise (or learning curve)

---

## DECISION 006: Animation Libraries

**Date:** 2024-01-XX  
**Decision:** GSAP + Lenis + CSS (no Framer Motion)  
**Status:** ✅ Decided

### Rationale
- **GSAP:** Best-in-class scroll-triggered animations, timelines, scrubbing
- **Lenis:** Smooth scrolling without hijacking native scroll behavior
- **CSS:** Simple transitions (hover, focus, theme switch) don't need JS
- **No Framer Motion:** Designed for React, unnecessary for Astro architecture

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| Framer Motion | React-only, overkill for this project |
| Anime.js | Less feature-rich than GSAP for scroll choreography |
| Locomotive Scroll | More invasive, compatibility issues |
| Pure CSS | Cannot handle complex scroll-linked animations |

### Consequences
- GSAP license requires attribution (free for most use cases)
- Need to respect `prefers-reduced-motion` throughout
- Must lazy-load animation libraries (not on every page)

---

## DECISION 007: Hosting & Deployment

**Date:** 2024-01-XX  
**Decision:** Cloudflare Pages + GitHub Actions  
**Status:** ✅ Decided

### Rationale
- Astro has first-party Cloudflare Pages adapter
- Global CDN included (excellent performance)
- Free tier generous for this project scale
- Built-in HTTPS, compression, caching
- GitHub Actions integration for CI/CD
- Environment variable management
- Preview deployments on PRs

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| Vercel | Excellent but more expensive at scale, Astro optimized for CF |
| Netlify | Similar to Vercel, Cloudflare has edge function advantages |
| AWS Amplify | More complex, overkill for this project |
| Self-hosted VPS | Operational burden, not justified |

### Consequences
- Need to configure Cloudflare-specific settings (headers, redirects)
- Serverless function limits (use Supabase for heavy backend logic)
- DNS management through Cloudflare (acceptable)

---

## DECISION 008: Multilingual Strategy

**Date:** 2024-01-XX  
**Decision:** Astro i18n routing with subpaths (`/en/`, `/kn/`, `/hi/`)  
**Status:** ✅ Decided

### Rationale
- Clear URL structure for users and search engines
- hreflang tags supported natively
- Separate content per language (not machine-translated on the fly)
- Admin can manage translations in Supabase
- SEO-friendly (each language indexed separately)

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| Subdomain (`en.site.com`) | More complex DNS, cookie sharing issues |
| Query params (`?lang=kn`) | Poor SEO, unclear UX |
| Cookie-based | Not indexable, poor accessibility |
| Single language (English only) | Excludes local Kannada/Hindi speakers, reduces reach |

### Consequences
- Content duplication across languages (manageable via admin)
- Need translation workflow (admin panel will support)
- hreflang implementation critical for SEO
- All pages must have all language variants (or use `x-default`)

---

## DECISION 009: Form Handling

**Date:** 2024-01-XX  
**Decision:** Server-side validation + Supabase storage + Email notifications  
**Status:** ✅ Decided

### Rationale
- Server-side validation prevents spam/bad data
- Store all enquiries in Supabase (admin can track)
- Email notifications for immediate awareness
- WhatsApp follow-up option (user-initiated, not automated spam)
- Zod for schema validation (TypeScript-safe)

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| Client-side only validation | Easily bypassed, insecure |
| Third-party form service (Formspree, etc.) | Vendor lock-in, less control |
| Email-only (no database) | No tracking, no admin visibility |
| WhatsApp-only | Excludes users who prefer email/forms |

### Consequences
- Need email provider integration (SMTP or transactional email service)
- Rate limiting required to prevent abuse
- File upload validation critical (security)
- GDPR/privacy compliance considerations

---

## DECISION 010: Admin Authentication

**Date:** 2024-01-XX  
**Decision:** Supabase Auth (email/password, no custom system)  
**Status:** ✅ Decided

### Rationale
- Battle-tested authentication system
- Password hashing handled securely
- Session management included
- RLS integrates with auth user ID
- No passwords stored in application database
- Reduces security surface area

### Alternatives Considered
| Option | Why Rejected |
|--------|--------------|
| Custom password system | Security risk, reinventing the wheel |
| OAuth only (Google, etc.) | Overkill for single-admin or small team |
| No auth (static admin) | Completely insecure |
| JWT-based custom auth | Unnecessary complexity |

### Consequences
- Need secure password reset flow
- Session expiry handling
- Rate limiting on login attempts
- Admin user creation process (first-run setup)

---

## DECISION 011: Asset Organization

**Date:** 2024-01-XX  
**Decision:** Consolidate to `/public/images/` with categorized subfolders  
**Status:** ✅ Decided

### Rationale
- Clear separation of concerns (brand, brands, gallery, services, etc.)
- Easy to migrate to Cloudinary later (same logical structure)
- Avoids duplicate favicon files
- Scalable structure for future assets

### Structure
```
/public/images/
  brand/          # Company logos
  brands/         # Brand partner logos (Jungheinrich, Toyota, etc.)
  gallery/        # General photography
    components/
    equipment/
    parts/
  locations/      # Office photos
  services/       # Service-specific imagery
  ui/             # Icons, patterns
  favicon/        # Consolidated favicons
```

### Consequences
- Need to move existing assets from root and subfolders
- Update all references in code
- Delete AI-generated images (do not use in production)

---

## DECISION 012: 3D Fallback Strategy

**Date:** 2024-01-XX  
**Decision:** Mandatory fallback for all WebGL scenarios  
**Status:** ✅ Decided

### Fallback Triggers
- WebGL unsupported
- Low-power device detected
- `prefers-reduced-motion` enabled
- Model fails to load
- User explicitly disables 3D

### Fallback Implementation
- High-quality static image (optimized WebP/AVIF)
- Full site functionality preserved
- No empty canvas or broken UI
- Accessible text alternative for all 3D content

### Consequences
- Need to source/design fallback imagery
- Extra development time for dual implementation
- Accessibility compliance achieved
- Better mobile experience

---

## OPEN DECISIONS

| ID | Topic | Priority | Status |
|----|-------|----------|--------|
| 013 | Email provider selection | Medium | Pending |
| 014 | Spam protection (Turnstile vs. alternatives) | Medium | Pending |
| 015 | 3D model sourcing strategy | High | Pending |
| 016 | Analytics platform (privacy-focused) | Low | Pending |

---

**Document maintained by:** Lead Product Architect  
**Review cadence:** Update with each significant decision
