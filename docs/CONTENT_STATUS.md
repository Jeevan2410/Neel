# NEEL ENTERPRISES — CONTENT STATUS

**Last Updated:** 2024-01-XX  
**Status:** Content inventory complete, creation pending

---

## CONTENT INVENTORY BY PAGE

### Homepage (`/`)

| Section | Content Status | Source | Notes |
|---------|----------------|--------|-------|
| Hero headline | ✅ Ready | Company Profile | "Material Handling Engineering" |
| Hero subhead | ✅ Ready | Prompt | Electric × Diesel positioning |
| Services list | ✅ Ready | Prompt | 15+ services defined |
| Problem section | ⏳ Needs copy | — | Downtime cost (no invented stats) |
| Electric/Diesel split | ✅ Ready | Prompt | Technically accurate claims only |
| Engineering capability | ✅ Ready | Company Profile | 18+ years, qualified staff |
| Industries | ✅ Ready | Prompt | Auto, Engineering, Pharma, Warehousing |
| Brands section | ✅ Ready | Assets | 9 brand logos available |
| Locations preview | ✅ Ready | Verified info | Kinnigoli, Bengaluru |
| FAQ preview | ⏳ Needs Supabase | — | Pull from database |
| Contact CTA | ✅ Ready | Verified info | WhatsApp, Email, Form |

---

### About Page (`/about/`)

| Section | Content Status | Source | Notes |
|---------|----------------|--------|-------|
| Company story | ✅ Ready | Company Profile.docx | Extracted text available |
| Experience claim | ✅ Ready | Company Profile | 18+ years |
| Team capabilities | ✅ Ready | Company Profile | Qualified technical staff |
| Service philosophy | ⏳ Needs refinement | — | From company profile, polished |
| Real photography | ✅ Available | Gallery | Service photos, equipment |

**Content to write:**
- [ ] Refined company narrative (based on extracted text)
- [ ] Team section (3 technical assistants mentioned)
- [ ] Values/mission statement (if any)

---

### Services Index (`/services/`)

| Service | Status | Power Type | Category |
|---------|--------|------------|----------|
| Electric Forklift Repair | ✅ Defined | Electric | Repair |
| Diesel Forklift Repair | ✅ Defined | Diesel | Repair |
| Breakdown Repair | ✅ Defined | Both | Repair |
| Preventive Maintenance | ✅ Defined | Both | Maintenance |
| AMC (Annual Maintenance Contract) | ✅ Defined | Both | Maintenance |
| Battery Service | ✅ Defined | Electric | Power Systems |
| Charger Service | ✅ Defined | Electric | Power Systems |
| Traction Controller Repair | ✅ Defined | Electric | Power Systems |
| Engine Overhauling | ✅ Defined | Diesel | Repair |
| Transmission Overhauling | ✅ Defined | Diesel | Repair |
| Hydraulic Repair | ✅ Defined | Both | Repair |
| Tyre Service | ✅ Defined | Both | Parts |
| Spare Parts | ✅ Defined | Both | Parts |
| Forklift Rental | ✅ Defined | Both | Rental |
| Refurbishment / Used Sales | ✅ Defined | Both | Rental |
| On-site Service | ✅ Defined | Both | Other |

**Content needed per service:**
- [ ] Title (per language)
- [ ] Short description (1-2 sentences)
- [ ] What it covers (bullet points)
- [ ] Common symptoms/problems
- [ ] NEEL capability statement
- [ ] Related services
- [ ] FAQ links

---

### Industries Pages

| Industry | Status | Content Needs |
|----------|--------|---------------|
| Automobile | ⏳ Placeholder | Material handling challenges, forklift applications |
| Engineering | ⏳ Placeholder | Equipment types, industry-specific needs |
| Pharma | ⏳ Placeholder | Clean environment requirements, electric preference |
| Warehousing | ⏳ Placeholder | High-volume operations, rental demand |

**Note:** Do not invent case studies or specific client names. Keep content general but technically accurate.

---

### Locations Pages

| Location | Status | Content Available |
|----------|--------|-------------------|
| Kinnigoli (Registered Office) | ✅ Address verified | Full address from prompt |
| Bengaluru/Chikkabanavara (Branch) | ✅ Address verified | Full address from prompt |

**Content needed per location:**
- [ ] Full address (✅ available)
- [ ] Google Maps link (to be generated)
- [ ] Service area description (careful not to overclaim)
- [ ] LocalBusiness schema data
- [ ] Location-specific photography (⚠️ not available yet)

---

### FAQ Page (`/faq/`)

**FAQ entries need to be created in Supabase.** Suggested topics:

| Question | Category | Language Dependency |
|----------|----------|---------------------|
| What types of forklifts do you repair? | General | All |
| Do you provide on-site service? | Service | All |
| What brands do you work with? | General | All |
| How quickly can you respond to breakdowns? | Breakdown | All (no promised time) |
| Do you offer preventive maintenance? | Maintenance | All |
| Can you repair batteries? | Battery | All |
| Do you sell spare parts? | Parts | All |
| Do you offer forklift rental? | Rental | All |
| Which areas do you serve? | Coverage | All |
| How do I request service? | Process | All |
| Can I send photos of my equipment? | Process | All |

**Each FAQ needs:**
- [ ] Question (EN, KN, HI)
- [ ] Answer (EN, KN, HI)
- [ ] Category assignment
- [ ] Related service links

---

### Contact Page (`/contact/`)

| Element | Status | Content |
|---------|--------|---------|
| Registered Office Address | ✅ | Verified from prompt |
| Branch Office Address | ✅ | Verified from prompt |
| Email | ✅ | neelenterprises.741@gmail.com |
| Phone/WhatsApp | ✅ | +91 81051 42089 |
| Enquiry Form | ⏳ To build | See enquiry system spec |
| Map Links | ⏳ To generate | Google Maps URLs needed |

---

### Legal Pages

| Page | Status | Notes |
|------|--------|-------|
| Privacy Policy | ⏳ Template needed | Must reflect actual data practices |
| Terms & Conditions | ⏳ Template needed | Service terms, limitations, disclaimers |

**Legal content warnings:**
- ⚠️ These templates need legal review
- ⚠️ Do not promise what business cannot deliver
- ⚠️ Include GST/registration if applicable (not provided)
- ⚠️ Clarify service coverage limitations

---

### Error Pages

| Page | Status | Content Concept |
|------|--------|-----------------|
| 404 | ⏳ To create | "Looks like this route has stopped moving" |
| 500 | ⏳ To create | Generic error, contact info |

---

## MULTILINGUAL CONTENT

### Translation Status

| Language | Code | Status | Translator Needed |
|----------|------|--------|-------------------|
| English | `en` | ✅ Primary | — |
| Kannada | `kn` | ❌ Pending | Native/professional translator |
| Hindi | `hi` | ❌ Pending | Native/professional translator |

**Translation workflow:**
1. Create English content first
2. Export to translation-friendly format (JSON/CSV)
3. Send to translator (provide context, glossary)
4. Import translations to Supabase
5. QA check (native speaker review)
6. Publish

**Technical terminology note:**
- Do not machine-translate technical terms blindly
- Maintain consistency across all pages
- Some English terms may be standard in local industry (e.g., "forklift", "battery", "hydraulic")

---

## CONTENT GAPS

### Missing Content (High Priority)

- [ ] **Location photography** — Kinnigoli and Bengaluru office exteriors
- [ ] **Team photos** — For About page credibility
- [ ] **Service-in-action photos** — Technicians working
- [ ] **Detailed service descriptions** — Per-service page content
- [ ] **FAQ entries** — Need to populate Supabase
- [ ] **Industry page content** — 4 industries need write-ups
- [ ] **Privacy Policy** — Legal template
- [ ] **Terms & Conditions** — Legal template

### Missing Content (Medium Priority)

- [ ] **Project/Work gallery descriptions** — Captions for real photos
- [ ] **Testimonials** — If available from business
- [ ] **Social media links** — If accounts exist
- [ ] **Additional industry verticals** — Beyond initial 4

### Missing Content (Low Priority / Future)

- [ ] **Blog articles** — Content marketing
- [ ] **Case studies** — Formal project documentation
- [ ] **Video content** — Service demonstrations
- [ ] **Downloadable resources** — Brochures, spec sheets

---

## CONTENT QUALITY GUIDELINES

### Tone & Voice

- **Professional** — B2B industrial audience
- **Technically credible** — Show expertise without jargon overload
- **Concise** — Scannable, action-oriented
- **Trustworthy** — No exaggerated claims, no fabricated statistics
- **Conversion-focused** — Clear CTAs throughout

### Do's

- ✅ Use verified company information only
- ✅ Link services to real capabilities
- ✅ Acknowledge limitations (coverage, authorization)
- ✅ Prioritize clarity over cleverness
- ✅ Write for scanning (headings, bullets, short paragraphs)

### Don'ts

- ❌ Invent customer testimonials
- ❌ Claim authorized partnership without confirmation
- ❌ Promise response times not confirmed by business
- ❌ Use generic corporate buzzwords
- ❌ Overuse superlatives ("best", "#1", "leading" without evidence)

---

## CONTENT OWNERSHIP

| Content Type | Owner | Review Required |
|--------------|-------|-----------------|
| Company narrative | Business owner | Yes |
| Service descriptions | Technical team | Yes |
| FAQ content | Customer-facing staff | Yes |
| Legal pages | Legal counsel | **Required** |
| Translations | Professional translators | Yes (native QA) |
| Photography | Business (provided) | — |

---

## NEXT STEPS

1. ✅ Complete content inventory (this document)
2. ⏳ Create content templates for service pages
3. ⏳ Draft English content for core pages
4. ⏳ Populate Supabase with initial FAQs
5. ⏳ Commission translations (KN, HI)
6. ⏳ Request missing photography from business
7. ⏳ Draft legal page templates (flag for review)

---

**Document maintained by:** Lead Product Architect  
**Review cadence:** Update as content is created/approved
