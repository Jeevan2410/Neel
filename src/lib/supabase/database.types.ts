export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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

export type PowerType = 'electric' | 'diesel' | 'both' | null;

export type EnquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'closed';

export interface Database {
  public: {
    Tables: {
      enquiries: {
        Row: {
          id: string;
          enquiry_type: EnquiryType;
          status: EnquiryStatus;
          reference_number: string;
          
          // Customer information
          customer_name: string;
          customer_company: string | null;
          customer_email: string;
          customer_phone: string;
          customer_whatsapp: string | null;
          
          // Location information
          city: string;
          state: string;
          site_location: string | null;
          
          // Equipment information
          equipment_type: string | null;
          equipment_brand: string | null;
          equipment_model: string | null;
          equipment_capacity: string | null;
          power_type: PowerType;
          
          // Requirement details
          requirement: string | null;
          problem_description: string | null;
          urgency: 'low' | 'medium' | 'high' | 'critical' | null;
          
          // Additional fields for specific enquiry types
          battery_type: string | null;
          battery_voltage: string | null;
          rental_duration: string | null;
          rental_start_date: string | null;
          part_number: string | null;
          part_quantity: number | null;
          
          // File attachments (Cloudinary URLs)
          attachment_urls: string[] | null;
          
          // Metadata
          consent_given: boolean;
          source_url: string | null;
          user_agent: string | null;
          ip_address: string | null;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['enquiries']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['enquiries']['Row'], 'id' | 'created_at'>>;
      };
      
      services: {
        Row: {
          id: string;
          slug: string;
          category: string;
          power_type: PowerType;
          is_active: boolean;
          display_order: number | null;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at'>>;
      };
      
      service_translations: {
        Row: {
          id: string;
          service_id: string;
          language_code: string;
          title: string;
          description: string | null;
          content: Json | null;
          meta_title: string | null;
          meta_description: string | null;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['service_translations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['service_translations']['Row'], 'id' | 'created_at'>>;
      };
      
      faqs: {
        Row: {
          id: string;
          category: string | null;
          display_order: number | null;
          is_active: boolean;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['faqs']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['faqs']['Row'], 'id' | 'created_at'>>;
      };
      
      faq_translations: {
        Row: {
          id: string;
          faq_id: string;
          language_code: string;
          question: string;
          answer: string;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['faq_translations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['faq_translations']['Row'], 'id' | 'created_at'>>;
      };
      
      locations: {
        Row: {
          id: string;
          slug: string;
          location_type: 'registered' | 'branch';
          is_active: boolean;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['locations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['locations']['Row'], 'id' | 'created_at'>>;
      };
      
      location_translations: {
        Row: {
          id: string;
          location_id: string;
          language_code: string;
          name: string;
          address: string;
          city: string;
          state: string;
          pincode: string;
          phone: string;
          email: string | null;
          google_maps_link: string | null;
          service_area: string | null;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['location_translations']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['location_translations']['Row'], 'id' | 'created_at'>>;
      };
      
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          language_code: string | null;
          description: string | null;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'created_at'>>;
      };
      
      seo_metadata: {
        Row: {
          id: string;
          page_path: string;
          language_code: string;
          title: string;
          description: string;
          keywords: string[] | null;
          canonical_url: string | null;
          og_image: string | null;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['seo_metadata']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['seo_metadata']['Row'], 'id' | 'created_at'>>;
      };
      
      languages: {
        Row: {
          code: string;
          name: string;
          native_name: string;
          is_active: boolean;
          is_default: boolean;
          direction: 'ltr' | 'rtl';
          
          created_at: string;
          updated_at: string;
        };
        Insert: Database['public']['Tables']['languages']['Row'];
        Update: Partial<Database['public']['Tables']['languages']['Row']>;
      };
      
      admins: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'admin' | 'editor' | 'viewer';
          is_active: boolean;
          
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admins']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Database['public']['Tables']['admins']['Row'], 'id' | 'created_at'>>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
