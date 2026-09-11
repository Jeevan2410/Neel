# NEEL ENTERPRISES — KNOWN ISSUES

**Last Updated:** 2024-01-XX  
**Status:** Tracking active issues, blockers, and technical debt

---

## ACTIVE ISSUES

### [ISSUE-001] AI-Generated Images in Gallery

**Severity:** Low (content, not code)  
**Category:** Asset Management  
**Status:** ⚠️ Identified

**Description:**
Three AI-generated images exist in `/gallery/` folder:
- `Gemini_Generated_Image_7e7u877e7u877e7u.png` (2.0M)
- `Gemini_Generated_Image_7u6ena7u6ena7u6e.png` (2.1M)
- `Gemini_Generated_Image_xytqxfxytqxfxytq.png` (1.4M)

**Impact:**
These should NOT be used on the production website as they are AI-generated placeholders, not real company photography.

**Resolution:**
- Archive or delete these files before production
- Replace with real NEEL ENTERPRISES photography
- Document in ASSET_INDEX.md (✅ done)

**Workaround:**
Can use as development placeholders only.

---

### [ISSUE-002] Duplicate Favicon Files

**Severity:** Low  
**Category:** Asset Organization  
**Status:** ⚠️ Identified

**Description:**
Favicon assets exist in two folders (`/favicon/` and `/favicon_io/`) with duplicates:
- `apple-touch-icon.png` (different sizes: 33K vs 43K)
- `favicon.ico` (same size: 15K)
- `site.webmanifest` (different content: 436B vs 263B)

**Impact:**
Confusion about which files to use, potential for inconsistent favicons across browsers.

**Resolution:**
- Consolidate to single `/public/favicon/` folder
- Use larger/better variants
- Merge webmanifest files
- Update all references in code

**Workaround:**
Currently both sets exist; browsers will find one of them.

---

### [ISSUE-003] Missing 3D Forklift Model

**Severity:** Medium (Tier 2 feature blocker)  
**Category:** Asset / Feature  
**Status:** ❌ Missing

**Description:**
No 3D forklift model (`.glb`/`.gltf`) exists yet. This blocks the interactive hero experience and Machine Explorer features.

**Impact:**
- Cannot implement Tier 2 signature features
- Homepage will lack intended cinematic 3D element
- Must rely on fallback imagery until model is sourced

**Resolution Options:**
1. Source open-source/creative commons model (must verify license)
2. Commission custom 3D model (cost involved)
3. Purchase stock 3D model (license check required)

**Workaround:**
Implement fallback static image hero section. Site remains fully functional without 3D.

---

### [ISSUE-004] No Location Photography

**Severity:** Low  
**Category:** Asset  
**Status:** ❌ Missing

**Description:**
No photographs of Kinnigoli registered office or Bengaluru branch office exist in the asset collection.

**Impact:**
- Location pages will lack authentic photography
- Reduced local SEO credibility
- Less personal connection with visitors

**Resolution:**
Request business to provide:
- Exterior photos of both offices
- Signage photos
- Team photos at locations (optional)

**Workaround:**
Use map links and address text only. Consider using generic industrial area photos if appropriate (with disclosure).

---

### [ISSUE-005] Large Image Files Need Optimization

**Severity:** Medium (performance)  
**Category:** Performance / Assets  
**Status:** ⚠️ Identified

**Description:**
Several images exceed recommended file sizes:
- `logo.png` (155K → target <50K)
- `baka.png` (150K → target <50K)
- `Hydraulic Cylinders.jpg` (257K → target <100K)
- `Jungheinrich AC Motor Controller.jpeg` (218K → target <100K)
- `Komatsu Counterbalance Forklift.jpeg` (443K → target <150K)
- `Pallet Truck Wheel & Caster Assembly Kit.jpeg` (213K → target <100K)
- `Pins, Bearings & Seal Kits..jpg` (355K → target <150K)

**Impact:**
- Slower page load times
- Higher bandwidth costs
- Potential Core Web Vitals penalties

**Resolution:**
- Convert to WebP/AVIF format
- Resize to appropriate dimensions
- Apply compression
- Implement responsive `srcset`

**Workaround:**
Site will function but may not meet performance targets until optimized.

---

## BLOCKERS

| ID | Blocker | Owner | Impact | Resolution Needed |
|----|---------|-------|--------|-------------------|
| BLK-001 | Supabase credentials | Business/Admin | Cannot set up database, admin panel, or dynamic content | Create Supabase project, share credentials |
| BLK-002 | Cloudinary credentials | Business/Admin | Cannot optimize images or use CDN | Create Cloudinary account, share credentials |
| BLK-003 | Domain name decision | Business | Cannot configure production URLs, canonical tags | Decide on domain, update SITE_URL |
| BLK-004 | 3D model source | Decision needed | Cannot implement Tier 2 features | Decide: source/commission/purchase |
| BLK-005 | Email provider choice | Decision needed | Cannot send enquiry notifications | Choose SMTP service or transactional email API |

---

## TECHNICAL DEBT

| ID | Description | Priority | When to Address |
|----|-------------|----------|-----------------|
| TD-001 | AI-generated images need removal | Low | Before production |
| TD-002 | Favicon consolidation | Low | Phase 1 setup |
| TD-003 | Image optimization pending | Medium | Phase 1 or 6 |
| TD-004 | Missing translations (KN, HI) | High | Phase 7 (multilingual) |
| TD-005 | Legal pages need review | High | Before production |

---

## OPEN QUESTIONS

| ID | Question | Priority | Impact | Status |
|----|----------|----------|--------|--------|
| Q-001 | Are any brand relationships "authorized" vs. just "experience"? | High | Legal accuracy | Pending business confirmation |
| Q-002 | What is the actual service coverage area beyond office locations? | Medium | Location page content | Pending |
| Q-003 | Are customer testimonials available? | Low | Trust section | Pending |
| Q-004 | Do social media accounts exist (LinkedIn, Facebook, etc.)? | Low | Footer links | Pending |
| Q-005 | What are the actual business hours for each location? | Medium | LocalBusiness schema | Pending |
| Q-006 | Is there a GST number or other registration to display? | Medium | Legal compliance | Pending |
| Q-007 | Can we promise any response time for breakdowns? | High | Avoid overpromising | **Do not promise unless confirmed** |

---

## SCOPE CLARIFICATIONS

### Out of Scope (Phase 1 Launch)

- Fleet management system
- Customer portal
- Service history tracking
- AMC subscription management
- Rental inventory system
- E-commerce for spare parts
- Blog/content marketing system
- AI chatbot

### May Be Added Later (Phase 3+)

- Used forklift catalogue
- Spare parts catalogue with search
- Equipment rental booking calendar
- Customer login for service history
- Multi-technician dispatch system

---

## MONITORING THIS SESSION

| Issue | Action Taken | Status |
|-------|--------------|--------|
| ISSUE-001 | Documented in ASSET_INDEX.md | ✅ Tracked |
| ISSUE-002 | Documented in ASSET_INDEX.md | ✅ Tracked |
| ISSUE-003 | Architecture designed for later integration | ✅ Planned |
| ISSUE-004 | Noted in CONTENT_STATUS.md | ✅ Tracked |
| ISSUE-005 | Optimization plan in ASSET_INDEX.md | ✅ Planned |

---

## RESOLVED ISSUES

| ID | Description | Resolved Date | Resolution |
|----|-------------|---------------|------------|
| — | None yet | — | First session in progress |

---

## REPORTING NEW ISSUES

When discovering new issues during development:

1. **Categorize:** Bug, Enhancement, Content, Asset, Blocker, Question
2. **Assess severity:** Critical, High, Medium, Low
3. **Document:** Add to this file with clear description
4. **Prioritize:** Add to appropriate phase or sprint
5. **Track:** Update status as work progresses

**Template:**
```markdown
### [ISSUE-XXX] Short Title

**Severity:** [Critical/High/Medium/Low]  
**Category:** [Bug/Enhancement/Content/Asset/Blocker]  
**Status:** [Identified/In Progress/Resolved]

**Description:**
[Clear description]

**Impact:**
[What does this block or affect?]

**Resolution:**
[How should this be fixed?]

**Workaround:**
[If any temporary solution exists]
```

---

**Document maintained by:** Technical Project Manager  
**Review cadence:** Update at end of each session, review weekly
