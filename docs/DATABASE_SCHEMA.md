# NEEL ENTERPRISES — DATABASE SCHEMA

**Last Updated:** 2024-01-XX  
**Status:** Schema designed, migrations pending  
**Database:** Supabase (PostgreSQL)

---

## OVERVIEW

This document defines the complete database schema for NEEL ENTERPRISES. All tables use Row Level Security (RLS) for access control. The schema supports:

- Multilingual content (EN/KN/HI)
- Admin authentication via Supabase Auth
- Enquiry management
- Service/FAQ/Industry/Location content
- Media metadata (Cloudinary references)
- SEO metadata per page
- Site settings

---

## TABLE DEFINITIONS

### 1. `languages`

Supported languages for multilingual content.

```sql
CREATE TABLE languages (
  code TEXT PRIMARY KEY,          -- 'en', 'kn', 'hi'
  name TEXT NOT NULL,             -- 'English', 'ಕನ್ನಡ', 'हिन्दी'
  locale TEXT NOT NULL,           -- 'en-US', 'kn-IN', 'hi-IN'
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Initial data:**
```sql
INSERT INTO languages (code, name, locale, is_default, sort_order) VALUES
  ('en', 'English', 'en-US', TRUE, 1),
  ('kn', 'ಕನ್ನಡ', 'kn-IN', FALSE, 2),
  ('hi', 'हिन्दी', 'hi-IN', FALSE, 3);
```

---

### 2. `profiles`

User profiles linked to Supabase Auth.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',       -- 'user', 'admin', 'super_admin'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS Policies:**
- Users can read their own profile
- Admins can read all profiles
- No public writes

---

### 3. `admins`

Admin-specific metadata (extends profiles).

```sql
CREATE TABLE admins (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  can_manage_services BOOLEAN DEFAULT FALSE,
  can_manage_faqs BOOLEAN DEFAULT FALSE,
  can_manage_enquiries BOOLEAN DEFAULT TRUE,
  can_manage_settings BOOLEAN DEFAULT FALSE,
  can_manage_translations BOOLEAN DEFAULT FALSE,
  can_manage_seo BOOLEAN DEFAULT FALSE,
  can_manage_media BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS Policies:**
- Only admins can read/write this table
- Super admin manages permissions

---

### 4. `site_settings`

Global site configuration.

```sql
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,  -- Safe to expose to client
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Example settings:**
```sql
INSERT INTO site_settings (key, value, description, is_public) VALUES
  ('site_title', '{"en": "NEEL ENTERPRISES", "kn": "...", "hi": "..."}', 'Site title', TRUE),
  ('contact_email', '{"value": "neelenterprises.741@gmail.com"}', 'Contact email', TRUE),
  ('contact_phone', '{"value": "+918105142089"}', 'Contact phone (WhatsApp)', TRUE),
  ('analytics_enabled', '{"value": true}', 'Enable analytics tracking', FALSE),
  ('maintenance_mode', '{"value": false}', 'Site maintenance mode', FALSE);
```

---

### 5. `locations`

Physical office/service locations.

```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,             -- 'registered_office', 'branch_office', 'service_area'
  is_active BOOLEAN DEFAULT TRUE,
  google_maps_link TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 6. `location_translations`

Multilingual location content.

```sql
CREATE TABLE location_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL REFERENCES languages(code),
  name TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  phone TEXT,
  email TEXT,
  description TEXT,
  UNIQUE(location_id, language_code),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Initial data (from verified info):**
```sql
-- Kinnigoli (Registered Office)
INSERT INTO locations (id, type) VALUES ('kinnigoli-uuid', 'registered_office');
INSERT INTO location_translations (location_id, language_code, name, address_line1, city, state, postal_code)
VALUES 
  ('kinnigoli-uuid', 'en', 'Registered Office', 'No.11-87/3 & 11-87/4, SDANANDA BUILDING, KINNIGOLI MAIN ROAD', 'Kinnigoli', 'Karnataka', '574150'),
  ('kinnigoli-uuid', 'kn', 'ನೋಂದಾಯಿತ ಕಚೇರಿ', 'ನಂ.11-87/3 ಮತ್ತು 11-87/4, SDANANDA BUILDING, ಕಿನ್ನಿಗೋಳಿ ಮುಖ್ಯ ರಸ್ತೆ', 'ಕಿನ್ನಿಗೋಳಿ', 'ಕರ್ನಾಟಕ', '574150'),
  ('kinnigoli-uuid', 'hi', 'पंजीकृत कार्यालय', 'नं.11-87/3 और 11-87/4, SDANANDA BUILDING, किन्निगोली मुख्य रोड', 'किन्निगोली', 'कर्नाटक', '574150');

-- Bengaluru (Branch Office)
INSERT INTO locations (id, type) VALUES ('bengaluru-uuid', 'branch_office');
INSERT INTO location_translations (location_id, language_code, name, address_line1, city, state, postal_code)
VALUES 
  ('bengaluru-uuid', 'en', 'Branch Office', 'Sy No-14/5, Hanuman Layout, Hesaraghatta Main Road, Near Chikkabanavara Railway Station, Chikkabanavara', 'Bangalore', 'Karnataka', '560090');
```

---

### 7. `service_categories`

Service grouping (Repair, Maintenance, Parts, etc.).

```sql
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0,
  icon TEXT,                      -- Lucide icon name
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 8. `service_category_translations`

```sql
CREATE TABLE service_category_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL REFERENCES languages(code),
  name TEXT NOT NULL,
  description TEXT,
  UNIQUE(category_id, language_code),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Initial categories:**
```sql
INSERT INTO service_categories (id, slug, sort_order) VALUES
  ('cat-repair', 'repair', 1),
  ('cat-maintenance', 'maintenance', 2),
  ('cat-power-systems', 'power-systems', 3),
  ('cat-parts', 'parts', 4),
  ('cat-rental', 'rental', 5),
  ('cat-other', 'other', 6);
```

---

### 9. `services`

Core service definitions.

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES service_categories(id),
  slug TEXT UNIQUE NOT NULL,
  power_type TEXT,                -- 'electric', 'diesel', 'both'
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  related_service_ids UUID[],     -- Array of related service IDs
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 10. `service_translations`

```sql
CREATE TABLE service_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL REFERENCES languages(code),
  title TEXT NOT NULL,
  short_description TEXT,         -- 1-2 sentences
  full_description TEXT,          -- Detailed content
  what_it_covers JSONB,           -- Array of bullet points
  symptoms_problems JSONB,        -- Array of common issues
  capability_statement TEXT,
  meta_title TEXT,                -- SEO
  meta_description TEXT,          -- SEO
  UNIQUE(service_id, language_code),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Example service:**
```sql
INSERT INTO services (id, category_id, slug, power_type, is_active) VALUES
  ('svc-electric-repair', 'cat-repair', 'electric-forklift-repair', 'electric', TRUE);

INSERT INTO service_translations (service_id, language_code, title, short_description) VALUES
  ('svc-electric-repair', 'en', 'Electric Forklift Repair', 'Expert repair services for all electric forklift brands and models.'),
  ('svc-electric-repair', 'kn', 'ವಿದ್ಯುತ್ ಫೋರ್ಕ್‌ಲಿಫ್ಟ್ ದುರಸ್ತಿ', 'ಎಲ್ಲಾ ವಿದ್ಯುತ್ ಫೋರ್ಕ್‌ಲಿಫ್ಟ್ ಬ್ರಾಂಡ್‌ಗಳು ಮತ್ತು ಮಾದರಿಗಳಿಗೆ ತಜ್ಞ ದುರಸ್ತಿ ಸೇವೆಗಳು.'),
  ('svc-electric-repair', 'hi', 'इलेक्ट्रिक फोर्कलिफ्ट मरम्मत', 'सभी इलेक्ट्रिक फोर्कलिफ्ट ब्रांडों और मॉडलों के लिए विशेषज्ञ मरम्मत सेवाएं।');
```

---

### 11. `industries`

Industries served.

```sql
CREATE TABLE industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 12. `industry_translations`

```sql
CREATE TABLE industry_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_id UUID NOT NULL REFERENCES industries(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL REFERENCES languages(code),
  name TEXT NOT NULL,
  description TEXT,
  challenges JSONB,               -- Array of industry challenges
  equipment_types JSONB,          -- Array of equipment used
  UNIQUE(industry_id, language_code),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Initial industries:**
```sql
INSERT INTO industries (id, slug) VALUES
  ('ind-auto', 'automobile'),
  ('ind-eng', 'engineering'),
  ('ind-pharma', 'pharma'),
  ('ind-warehouse', 'warehousing');
```

---

### 13. `brands`

Equipment brands NEEL has experience with.

```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  logo_cloudinary_id TEXT,        -- Cloudinary public ID
  is_active BOOLEAN DEFAULT TRUE,
  authorization_level TEXT DEFAULT 'experience',  -- 'experience', 'authorized', 'partner'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 14. `brand_relationships`

Brands per service/industry.

```sql
CREATE TABLE brand_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  industry_id UUID REFERENCES industries(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(brand_id, service_id, industry_id)
);
```

**Initial brands:**
```sql
INSERT INTO brands (slug, authorization_level) VALUES
  ('jungheinrich', 'experience'),
  ('toyota-bt', 'experience'),
  ('jost', 'experience'),
  ('maini', 'experience'),
  ('macneill', 'experience'),
  ('baka', 'experience'),
  ('godrej', 'experience'),
  ('voltas', 'experience'),
  ('yale', 'experience');
```

---

### 15. `faqs`

Frequently asked questions.

```sql
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT,                  -- 'general', 'service', 'battery', 'rental', etc.
  is_active BOOLEAN DEFAULT TRUE,
  related_service_ids UUID[],
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 16. `faq_translations`

```sql
CREATE TABLE faq_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  faq_id UUID NOT NULL REFERENCES faqs(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL REFERENCES languages(code),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  UNIQUE(faq_id, language_code),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 17. `media`

Media metadata (Cloudinary references).

```sql
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cloudinary_public_id TEXT NOT NULL,
  secure_url TEXT NOT NULL,
  resource_type TEXT DEFAULT 'image',  -- 'image', 'video'
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  caption TEXT,
  category TEXT,                  -- 'brand', 'service', 'gallery', etc.
  entity_type TEXT,               -- 'service', 'industry', 'location', etc.
  entity_id UUID,                 -- Related entity ID
  language_code TEXT REFERENCES languages(code),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 18. `enquiries`

Customer enquiries (form submissions).

```sql
CREATE TYPE enquiry_type AS ENUM (
  'general', 'service', 'breakdown', 'maintenance', 'amc',
  'rental', 'spare_parts', 'battery', 'charger',
  'used_equipment', 'other'
);

CREATE TYPE enquiry_status AS ENUM (
  'new', 'contacted', 'in_progress', 'completed', 'closed'
);

CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT UNIQUE NOT NULL,  -- Generated on submit
  type enquiry_type NOT NULL DEFAULT 'general',
  status enquiry_status DEFAULT 'new',
  
  -- Customer info
  customer_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp_opt_in BOOLEAN DEFAULT TRUE,
  
  -- Location
  city TEXT,
  state TEXT,
  site_location TEXT,
  
  -- Equipment
  equipment_type TEXT,          -- 'forklift', 'pallet_truck', etc.
  equipment_brand TEXT,
  equipment_model TEXT,
  equipment_capacity TEXT,
  power_type TEXT,              -- 'electric', 'diesel'
  
  -- Requirement
  requirement_type TEXT,        -- 'breakdown', 'preventive', etc.
  problem_description TEXT,
  urgency TEXT,                 -- 'low', 'medium', 'high', 'critical'
  
  -- Attachments (Cloudinary URLs)
  attachment_urls TEXT[],
  
  -- Internal
  assigned_to UUID REFERENCES profiles(id),
  internal_notes TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS Policies:**
- Public can INSERT (submit enquiries)
- Public CANNOT SELECT (no viewing other enquiries)
- Admins can SELECT/UPDATE all enquiries

---

### 19. `seo_metadata`

Page-specific SEO overrides.

```sql
CREATE TABLE seo_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,             -- URL path (e.g., '/services/electric-repair')
  language_code TEXT NOT NULL REFERENCES languages(code),
  title TEXT,
  description TEXT,
  canonical_url TEXT,
  og_image_cloudinary_id TEXT,
  is_indexable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(path, language_code)
);
```

---

## ROW LEVEL SECURITY (RLS) POLICIES

### General Pattern

```sql
-- Enable RLS on all tables
ALTER TABLE [table_name] ENABLE ROW LEVEL SECURITY;

-- Example: enquiries table
CREATE POLICY "Public can insert enquiries"
ON enquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Public cannot view enquiries"
ON enquiries FOR SELECT
USING (false);

CREATE POLICY "Admins can view all enquiries"
ON enquiries FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM admins
    WHERE admins.user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update enquiries"
ON enquiries FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM admins
    WHERE admins.user_id = auth.uid()
  )
);
```

### Critical Tables Requiring RLS

| Table | Public Read | Public Write | Admin Access |
|-------|-------------|--------------|--------------|
| languages | ✅ | ❌ | ✅ Full |
| profiles | Own only | Own only | ✅ All |
| admins | ❌ | ❌ | ✅ Full |
| site_settings | Public only | ❌ | ✅ Full |
| locations | ✅ | ❌ | ✅ Full |
| location_translations | ✅ | ❌ | ✅ Full |
| services | ✅ | ❌ | ✅ Full |
| service_translations | ✅ | ❌ | ✅ Full |
| industries | ✅ | ❌ | ✅ Full |
| industry_translations | ✅ | ❌ | ✅ Full |
| brands | ✅ | ❌ | ✅ Full |
| faqs | ✅ | ❌ | ✅ Full |
| faq_translations | ✅ | ❌ | ✅ Full |
| media | ✅ | ❌ | ✅ Full |
| enquiries | ❌ | ✅ Insert only | ✅ Full |
| seo_metadata | ✅ | ❌ | ✅ Full |

---

## INDEXES

```sql
-- Performance indexes
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_power_type ON services(power_type);
CREATE INDEX idx_services_active ON services(is_active);

CREATE INDEX idx_service_translations_service ON service_translations(service_id);
CREATE INDEX idx_service_translations_language ON service_translations(language_code);

CREATE INDEX idx_enquiries_type ON enquiries(type);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created ON enquiries(created_at DESC);
CREATE INDEX idx_enquiries_read ON enquiries(is_read);

CREATE INDEX idx_faq_translations_faq ON faq_translations(faq_id);
CREATE INDEX idx_faq_translations_language ON faq_translations(language_code);

CREATE INDEX idx_media_entity ON media(entity_type, entity_id);
CREATE INDEX idx_media_category ON media(category);

CREATE INDEX idx_seo_metadata_path ON seo_metadata(path);
CREATE INDEX idx_seo_metadata_language ON seo_metadata(language_code);
```

---

## MIGRATIONS

All schema changes must go through documented migrations in `/database/migrations/`.

**Migration naming convention:**
```
YYYYMMDDHHMMSS_description.sql
```

**Example:**
```
20240101120000_initial_schema.sql
20240102120000_add_industries.sql
20240103120000_rls_policies.sql
```

---

## SEED DATA

After initial schema setup, run seed script to populate:
- Languages (EN, KN, HI)
- Service categories
- Initial services
- Industries
- Brands
- Locations (from verified addresses)
- Default site settings

---

**Document maintained by:** Database Architect  
**Review cadence:** Update with each schema change
