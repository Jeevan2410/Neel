// Database Types for NEEL ENTERPRISES Supabase Schema
// Auto-generated types should be updated via `npx supabase gen types`

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Enum Types
export type EnquiryType =
  | 'general'
  | 'service'
  | 'breakdown'
  | 'maintenance'
  | 'amc'
  | 'rental'
  | 'spare_parts'
  | 'battery'
  | 'charger'
  | 'used_equipment'
  | 'other';

export type LanguageCode = 'en' | 'kn' | 'hi';

export type ResourceType = 'image' | 'video' | 'document' | 'model';

export type EntityTypes =
  | 'service'
  | 'faq'
  | 'industry'
  | 'location'
  | 'project'
  | 'brand'
  | 'media';

// Core Tables
export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Admin {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor';
  permissions: Json | null;
  created_at: string;
  last_login: string | null;
}

// Content Tables
export interface Service {
  id: string;
  slug: string;
  category: string;
  enabled: boolean;
  icon: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceTranslation {
  id: string;
  service_id: string;
  language_code: LanguageCode;
  title: string;
  description: string | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  keywords: string[] | null;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  icon: string | null;
  enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategoryTranslation {
  id: string;
  category_id: string;
  language_code: LanguageCode;
  name: string;
  description: string | null;
}

export interface FAQ {
  id: string;
  slug: string;
  category: string | null;
  enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FAQTranslation {
  id: string;
  faq_id: string;
  language_code: LanguageCode;
  question: string;
  answer: string;
}

export interface Industry {
  id: string;
  slug: string;
  icon: string | null;
  enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface IndustryTranslation {
  id: string;
  industry_id: string;
  language_code: LanguageCode;
  name: string;
  description: string | null;
  content: string | null;
}

export interface Location {
  id: string;
  slug: string;
  type: 'registered' | 'branch' | 'service_center';
  enabled: boolean;
  latitude: number | null;
  longitude: number | null;
  google_maps_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LocationTranslation {
  id: string;
  location_id: string;
  language_code: LanguageCode;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string | null;
  email: string | null;
  description: string | null;
}

export interface Project {
  id: string;
  slug: string;
  featured: boolean;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectTranslation {
  id: string;
  project_id: string;
  language_code: LanguageCode;
  title: string;
  description: string | null;
  content: string | null;
  client_name: string | null;
  location: string | null;
}

export interface Brand {
  id: string;
  slug: string;
  logo_url: string | null;
  is_partner: boolean; // false = technical experience only
  enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BrandRelationship {
  id: string;
  brand_id: string;
  relationship_type: 'technical_experience' | 'authorized_partner' | 'dealer';
  notes: string | null;
  verified_at: string | null;
}

// Media Table
export interface Media {
  id: string;
  cloudinary_public_id: string | null;
  secure_url: string | null;
  resource_type: ResourceType;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  caption: string | null;
  category: string | null;
  entity_type: EntityTypes | null;
  entity_id: string | null;
  language: LanguageCode | null;
  created_at: string;
  updated_at: string;
}

// Enquiry System
export interface Enquiry {
  id: string;
  reference_number: string;
  enquiry_type: EnquiryType;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Customer Info
  customer_name: string;
  customer_company: string | null;
  customer_email: string;
  customer_phone: string;
  customer_whatsapp: string | null;
  
  // Location
  city: string | null;
  state: string | null;
  site_location: string | null;
  
  // Equipment
  equipment_type: string | null;
  equipment_brand: string | null;
  equipment_model: string | null;
  equipment_capacity: string | null;
  power_type: 'electric' | 'diesel' | 'hybrid' | null;
  
  // Requirement
  requirement_type: string | null;
  problem_description: string | null;
  urgency: 'low' | 'medium' | 'high' | 'critical' | null;
  
  // Attachments (stored as JSON array)
  attachments: Json | null;
  
  // Consent
  consent_given: boolean;
  
  // Admin
  assigned_to: string | null;
  internal_notes: string | null;
  
  created_at: string;
  updated_at: string;
  contacted_at: string | null;
  closed_at: string | null;
}

export interface EnquiryItem {
  id: string;
  enquiry_id: string;
  item_type: 'equipment' | 'part' | 'service';
  item_name: string;
  item_details: Json | null;
  quantity: number | null;
  notes: string | null;
  created_at: string;
}

// Site Settings
export interface SiteSetting {
  id: string;
  key: string;
  value: Json;
  language: LanguageCode | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

// SEO Metadata
export interface SeoMetadata {
  id: string;
  page_path: string;
  language: LanguageCode;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  canonical_url: string | null;
  og_image: string | null;
  noindex: boolean;
  created_at: string;
  updated_at: string;
}

// Language Table
export interface Language {
  code: LanguageCode;
  name: string;
  native_name: string;
  enabled: boolean;
  is_default: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Database Schema Type
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      admins: {
        Row: Admin;
        Insert: Omit<Admin, 'created_at'>;
        Update: Partial<Omit<Admin, 'id' | 'created_at'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Service, 'id' | 'created_at' | 'updated_at'>>;
      };
      service_translations: {
        Row: ServiceTranslation;
        Insert: Omit<ServiceTranslation, 'id'>;
        Update: Partial<Omit<ServiceTranslation, 'id'>>;
      };
      service_categories: {
        Row: ServiceCategory;
        Insert: Omit<ServiceCategory, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ServiceCategory, 'id' | 'created_at' | 'updated_at'>>;
      };
      service_category_translations: {
        Row: ServiceCategoryTranslation;
        Insert: Omit<ServiceCategoryTranslation, 'id'>;
        Update: Partial<Omit<ServiceCategoryTranslation, 'id'>>;
      };
      faqs: {
        Row: FAQ;
        Insert: Omit<FAQ, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FAQ, 'id' | 'created_at' | 'updated_at'>>;
      };
      faq_translations: {
        Row: FAQTranslation;
        Insert: Omit<FAQTranslation, 'id'>;
        Update: Partial<Omit<FAQTranslation, 'id'>>;
      };
      industries: {
        Row: Industry;
        Insert: Omit<Industry, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Industry, 'id' | 'created_at' | 'updated_at'>>;
      };
      industry_translations: {
        Row: IndustryTranslation;
        Insert: Omit<IndustryTranslation, 'id'>;
        Update: Partial<Omit<IndustryTranslation, 'id'>>;
      };
      locations: {
        Row: Location;
        Insert: Omit<Location, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Location, 'id' | 'created_at' | 'updated_at'>>;
      };
      location_translations: {
        Row: LocationTranslation;
        Insert: Omit<LocationTranslation, 'id'>;
        Update: Partial<Omit<LocationTranslation, 'id'>>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>;
      };
      project_translations: {
        Row: ProjectTranslation;
        Insert: Omit<ProjectTranslation, 'id'>;
        Update: Partial<Omit<ProjectTranslation, 'id'>>;
      };
      brands: {
        Row: Brand;
        Insert: Omit<Brand, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Brand, 'id' | 'created_at' | 'updated_at'>>;
      };
      brand_relationships: {
        Row: BrandRelationship;
        Insert: Omit<BrandRelationship, 'id'>;
        Update: Partial<Omit<BrandRelationship, 'id'>>;
      };
      media: {
        Row: Media;
        Insert: Omit<Media, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Media, 'id' | 'created_at' | 'updated_at'>>;
      };
      enquiries: {
        Row: Enquiry;
        Insert: Omit<Enquiry, 'id' | 'reference_number' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Enquiry, 'id' | 'created_at' | 'updated_at'>>;
      };
      enquiry_items: {
        Row: EnquiryItem;
        Insert: Omit<EnquiryItem, 'id' | 'created_at'>;
        Update: Partial<Omit<EnquiryItem, 'id'>>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SiteSetting, 'id' | 'created_at' | 'updated_at'>>;
      };
      seo_metadata: {
        Row: SeoMetadata;
        Insert: Omit<SeoMetadata, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SeoMetadata, 'id' | 'created_at' | 'updated_at'>>;
      };
      languages: {
        Row: Language;
        Insert: Omit<Language, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Language, 'code' | 'created_at' | 'updated_at'>>;
      };
    };
    Views: {};
    Functions: {};
  };
}
