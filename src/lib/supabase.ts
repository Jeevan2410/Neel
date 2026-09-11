// Supabase Client Configuration for NEEL ENTERPRISES
// Handles both client-side and server-side Supabase connections

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// Validate required environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Some features may not work.');
}

/**
 * Create a Supabase client for browser/edge usage
 * Uses the public anon key - safe for client-side
 */
export function createBrowserClient(): SupabaseClient<Database> {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client in development if not configured
    console.warn('Supabase not configured - using mock client');
    return {} as SupabaseClient<Database>;
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'x-application-name': 'neel-enterprises-web'
      }
    }
  });
}

/**
 * Create a Supabase client for server-side usage
 * Uses the service role key when available - NEVER expose to client
 */
export function createServerClient(
  accessToken?: string
): SupabaseClient<Database> {
  if (!supabaseUrl) {
    console.warn('Supabase URL not configured - using mock client');
    return {} as SupabaseClient<Database>;
  }

  // Use service role key on server if available, otherwise use anon key
  const token = supabaseServiceKey || supabaseAnonKey;

  return createClient<Database>(supabaseUrl, token, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
            'x-application-name': 'neel-enterprises-server'
          }
        : {
            'x-application-name': 'neel-enterprises-server'
          }
    }
  });
}

/**
 * Create a Supabase client for admin operations
 * Uses the service role key - ONLY use server-side
 */
export function createAdminClient(): SupabaseClient<Database> {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Admin Supabase client requires SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    },
    db: {
      schema: 'public'
    },
    global: {
      headers: {
        'x-application-name': 'neel-enterprises-admin'
      }
    }
  });
}

// Singleton instances for common usage
let browserClient: SupabaseClient<Database> | null = null;

export function getBrowserClient(): SupabaseClient<Database> {
  if (!browserClient) {
    browserClient = createBrowserClient();
  }
  return browserClient;
}

/**
 * Helper to check if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}

/**
 * Helper to check if running in production with real credentials
 */
export function isProductionReady(): boolean {
  return !!(supabaseUrl && supabaseAnonKey && supabaseServiceKey);
}

// Export types for convenience
export type { Database };
