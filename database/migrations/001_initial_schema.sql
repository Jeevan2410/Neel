-- NEEL ENTERPRISES Database Schema
-- Migration: 001_initial_schema.sql
-- Description: Initial database schema with RLS policies

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- LANGUAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS languages (
  code VARCHAR(2) PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  native_name VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,
  direction VARCHAR(3) DEFAULT 'ltr' CHECK (direction IN ('ltr', 'rtl')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default languages
INSERT INTO languages (code, name, native_name, is_active, is_default, direction) VALUES
  ('en', 'English', 'English', true, true, 'ltr'),
  ('kn', 'Kannada', 'ಕನ್ನಡ', true, false, 'ltr'),
  ('hi', 'Hindi', 'हिन्दी', true, false, 'ltr')
ON CONFLICT (code) DO NOTHING;

-- ============================================
-- ADMINS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(50) NOT NULL,
  power_type VARCHAR(20) CHECK (power_type IN ('electric', 'diesel', 'both', NULL)),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SERVICE TRANSLATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS service_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  language_code VARCHAR(2) REFERENCES languages(code),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content JSONB,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(service_id, language_code)
);

-- ============================================
-- FAQS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(100),
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FAQ TRANSLATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faq_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  faq_id UUID REFERENCES faqs(id) ON DELETE CASCADE,
  language_code VARCHAR(2) REFERENCES languages(code),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(faq_id, language_code)
);

-- ============================================
-- LOCATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  location_type VARCHAR(20) NOT NULL CHECK (location_type IN ('registered', 'branch')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LOCATION TRANSLATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS location_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,
  language_code VARCHAR(2) REFERENCES languages(code),
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  google_maps_link TEXT,
  service_area TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(location_id, language_code)
);

-- ============================================
-- SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  language_code VARCHAR(2) REFERENCES languages(code),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SEO METADATA TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS seo_metadata (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path VARCHAR(500) NOT NULL,
  language_code VARCHAR(2) REFERENCES languages(code),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  keywords TEXT[],
  canonical_url TEXT,
  og_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(page_path, language_code)
);

-- ============================================
-- ENQUIRIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_type VARCHAR(50) NOT NULL CHECK (enquiry_type IN (
    'general', 'service', 'breakdown', 'maintenance', 'amc',
    'rental', 'spare_parts', 'battery', 'charger', 'used_equipment', 'other'
  )),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'in_progress', 'completed', 'closed'
  )),
  reference_number VARCHAR(20) UNIQUE NOT NULL,
  
  -- Customer information
  customer_name VARCHAR(255) NOT NULL,
  customer_company VARCHAR(255),
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_whatsapp VARCHAR(20),
  
  -- Location information
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  site_location TEXT,
  
  -- Equipment information
  equipment_type VARCHAR(100),
  equipment_brand VARCHAR(100),
  equipment_model VARCHAR(100),
  equipment_capacity VARCHAR(50),
  power_type VARCHAR(20) CHECK (power_type IN ('electric', 'diesel', 'both', NULL)),
  
  -- Requirement details
  requirement TEXT,
  problem_description TEXT,
  urgency VARCHAR(20) CHECK (urgency IN ('low', 'medium', 'high', 'critical', NULL)),
  
  -- Additional fields for specific enquiry types
  battery_type VARCHAR(100),
  battery_voltage VARCHAR(20),
  rental_duration VARCHAR(50),
  rental_start_date DATE,
  part_number VARCHAR(100),
  part_quantity INTEGER,
  
  -- File attachments (Cloudinary URLs stored as JSON array)
  attachment_urls JSONB,
  
  -- Metadata
  consent_given BOOLEAN DEFAULT false,
  source_url TEXT,
  user_agent TEXT,
  ip_address INET,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_type ON enquiries(enquiry_type);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);
CREATE INDEX IF NOT EXISTS idx_seo_page_path ON seo_metadata(page_path);

-- ============================================
-- TRIGGER FUNCTION FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_languages_updated_at BEFORE UPDATE ON languages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_translations_updated_at BEFORE UPDATE ON service_translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_translations_updated_at BEFORE UPDATE ON faq_translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_location_translations_updated_at BEFORE UPDATE ON location_translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_metadata_updated_at BEFORE UPDATE ON seo_metadata
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Languages: Public read access
CREATE POLICY "Public can read languages"
  ON languages FOR SELECT
  USING (is_active = true);

-- Services: Public read active services
CREATE POLICY "Public can read active services"
  ON services FOR SELECT
  USING (is_active = true);

-- Service translations: Public read for active services
CREATE POLICY "Public can read service translations"
  ON service_translations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM services WHERE services.id = service_translations.service_id AND services.is_active = true
    )
  );

-- FAQs: Public read active FAQs
CREATE POLICY "Public can read active faqs"
  ON faqs FOR SELECT
  USING (is_active = true);

-- FAQ translations: Public read for active FAQs
CREATE POLICY "Public can read faq translations"
  ON faq_translations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM faqs WHERE faqs.id = faq_translations.faq_id AND faqs.is_active = true
    )
  );

-- Locations: Public read active locations
CREATE POLICY "Public can read active locations"
  ON locations FOR SELECT
  USING (is_active = true);

-- Location translations: Public read for active locations
CREATE POLICY "Public can read location translations"
  ON location_translations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM locations WHERE locations.id = location_translations.location_id AND locations.is_active = true
    )
  );

-- Site settings: Public read
CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

-- SEO metadata: Public read
CREATE POLICY "Public can read seo metadata"
  ON seo_metadata FOR SELECT
  USING (true);

-- Enquiries: Public can insert, authenticated users can read/update
CREATE POLICY "Public can create enquiries"
  ON enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (true);

-- Admins: Only authenticated users can read admins
CREATE POLICY "Authenticated users can read admins"
  ON admins FOR SELECT
  TO authenticated
  USING (true);

-- Services/Faqs/Locations/Settings/SEO: Authenticated users can manage
CREATE POLICY "Authenticated users can manage services"
  ON services TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage service translations"
  ON service_translations TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage faqs"
  ON faqs TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage faq translations"
  ON faq_translations TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage locations"
  ON locations TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage location translations"
  ON location_translations TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage seo metadata"
  ON seo_metadata TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- INITIAL DATA SEEDING
-- ============================================

-- Insert Kinnigoli location
INSERT INTO locations (slug, location_type, is_active) VALUES
  ('kinnigoli', 'registered', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO location_translations (location_id, language_code, name, address, city, state, pincode, phone, email, google_maps_link, service_area)
SELECT 
  l.id,
  'en',
  'Kinnigoli (Registered Office)',
  'No.11-87/3 & 11-87/4, SDANANDA BUILDING, KINNIGOLI MAIN ROAD, OPPOSITE DURGAPRASAD RECIDENCY, MENNABETU, KINNIGOLI – 574150',
  'Kinnigoli',
  'Karnataka',
  '574150',
  '+91 81051 42089',
  'neelenterprises.741@gmail.com',
  'https://maps.google.com/?q=Kinnigoli+574150',
  'Mangaluru region, Karnataka'
FROM locations l
WHERE l.slug = 'kinnigoli'
ON CONFLICT DO NOTHING;

-- Insert Bengaluru location
INSERT INTO locations (slug, location_type, is_active) VALUES
  ('bengaluru', 'branch', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO location_translations (location_id, language_code, name, address, city, state, pincode, phone, email, google_maps_link, service_area)
SELECT 
  l.id,
  'en',
  'Bengaluru (Branch Office)',
  'Sy No-14/5, Hanuman Layout, Hesaraghatta Main Road, Near Chikkabanavara Railway Station, Chikkabanavara, Bangalore – 560090',
  'Bangalore',
  'Karnataka',
  '560090',
  '+91 81051 42089',
  'neelenterprises.741@gmail.com',
  'https://maps.google.com/?q=Chikkabanavara+Bangalore+560090',
  'Bangalore Metropolitan Area, Karnataka'
FROM locations l
WHERE l.slug = 'bengaluru'
ON CONFLICT DO NOTHING;

-- Insert services
INSERT INTO services (slug, category, power_type, is_active, display_order) VALUES
  ('electric-forklift-repair', 'repair', 'electric', true, 1),
  ('diesel-forklift-repair', 'repair', 'diesel', true, 2),
  ('preventive-maintenance', 'maintenance', 'both', true, 3),
  ('breakdown-repair', 'repair', 'both', true, 4),
  ('amc', 'maintenance', 'both', true, 5),
  ('battery-service', 'power-systems', 'electric', true, 6),
  ('charger-service', 'power-systems', 'electric', true, 7),
  ('traction-controller-repair', 'power-systems', 'electric', true, 8),
  ('engine-overhauling', 'repair', 'diesel', true, 9),
  ('transmission-overhauling', 'repair', 'diesel', true, 10),
  ('hydraulic-repair', 'repair', 'both', true, 11),
  ('tyre-service', 'parts', 'both', true, 12),
  ('spare-parts', 'parts', 'both', true, 13),
  ('forklift-rental', 'rental', 'both', true, 14),
  ('refurbishment', 'rental', 'both', true, 15)
ON CONFLICT (slug) DO NOTHING;

COMMENT ON TABLE enquiries IS 'Customer service enquiries and service requests';
COMMENT ON TABLE services IS 'Available services offered by NEEL ENTERPRISES';
COMMENT ON TABLE faqs IS 'Frequently asked questions';
COMMENT ON TABLE locations IS 'Physical office locations';
COMMENT ON TABLE admins IS 'Admin users with access to the admin panel';
