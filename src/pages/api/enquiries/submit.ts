import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import type { Database as SupabaseDatabase } from '../../lib/supabase/database.types';

// Define the Supabase database type for enquiries
type EnquiryInsert = SupabaseDatabase['public']['Tables']['enquiries']['Insert'];

// Validation schema for enquiry submission
const enquirySchema = z.object({
  enquiry_type: z.enum([
    'general', 'service', 'breakdown', 'maintenance', 'amc',
    'rental', 'spare_parts', 'battery', 'charger', 'used_equipment', 'other'
  ]),
  customer_name: z.string().min(2, 'Name must be at least 2 characters'),
  customer_company: z.string().optional(),
  customer_email: z.string().email('Invalid email address'),
  customer_phone: z.string().min(10, 'Phone number must be valid'),
  customer_whatsapp: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  site_location: z.string().optional(),
  equipment_type: z.string().optional(),
  equipment_brand: z.string().optional(),
  equipment_model: z.string().optional(),
  equipment_capacity: z.string().optional(),
  power_type: z.enum(['electric', 'diesel', 'both']).optional().nullable(),
  requirement: z.string().optional(),
  problem_description: z.string().optional(),
  urgency: z.enum(['low', 'medium', 'high', 'critical']).optional().nullable(),
  battery_type: z.string().optional(),
  battery_voltage: z.string().optional(),
  rental_duration: z.string().optional(),
  rental_start_date: z.string().optional(),
  part_number: z.string().optional(),
  part_quantity: z.number().optional(),
  attachment_urls: z.array(z.string()).optional(),
  consent_given: z.boolean().refine(val => val === true, 'Consent is required'),
  source_url: z.string().optional(),
  user_agent: z.string().optional(),
  ip_address: z.string().optional(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = enquirySchema.parse(body);
    
    // Generate reference number
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const referenceNumber = `NEEL-${timestamp}-${random}`;
    
    // Create Supabase client using service role key (server-side only)
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error('Missing Supabase environment variables');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Server configuration error. Please contact support.' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient<SupabaseDatabase>(
      supabaseUrl,
      supabaseServiceRoleKey
    );
    
    // Prepare enquiry data for insertion
    const enquiryData: EnquiryInsert = {
      enquiry_type: validatedData.enquiry_type,
      status: 'new',
      reference_number: referenceNumber,
      customer_name: validatedData.customer_name,
      customer_company: validatedData.customer_company || null,
      customer_email: validatedData.customer_email,
      customer_phone: validatedData.customer_phone,
      customer_whatsapp: validatedData.customer_whatsapp || null,
      city: validatedData.city,
      state: validatedData.state,
      site_location: validatedData.site_location || null,
      equipment_type: validatedData.equipment_type || null,
      equipment_brand: validatedData.equipment_brand || null,
      equipment_model: validatedData.equipment_model || null,
      equipment_capacity: validatedData.equipment_capacity || null,
      power_type: validatedData.power_type || null,
      requirement: validatedData.requirement || null,
      problem_description: validatedData.problem_description || null,
      urgency: validatedData.urgency || null,
      battery_type: validatedData.battery_type || null,
      battery_voltage: validatedData.battery_voltage || null,
      rental_duration: validatedData.rental_duration || null,
      rental_start_date: validatedData.rental_start_date || null,
      part_number: validatedData.part_number || null,
      part_quantity: validatedData.part_quantity || null,
      attachment_urls: validatedData.attachment_urls || null,
      consent_given: validatedData.consent_given,
      source_url: validatedData.source_url || null,
      user_agent: validatedData.user_agent || null,
      ip_address: validatedData.ip_address || null,
    };
    
    // Insert enquiry into database
    const { data, error } = await supabase
      .from('enquiries')
      .insert(enquiryData)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Failed to submit enquiry. Please try again or contact us directly.' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // TODO: Send email notification to NEEL ENTERPRISES
    // TODO: Send confirmation email to customer
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        reference_number: referenceNumber,
        message: 'Your enquiry has been submitted successfully. We will get back to you soon.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Enquiry submission error:', error);
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Validation error',
          details: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
