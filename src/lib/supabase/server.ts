import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';
import type { Database } from './database.types';
import type { AstroCookies } from 'astro';

export function createClient(cookies: AstroCookies) {
  return createServerClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        get(name: string) {
          return cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookies.set(name, value, options);
          } catch (error) {
            // Handle cookie setting in server components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookies.set(name, '', { ...options, maxAge: 0 });
          } catch (error) {
            // Handle cookie removal in server components
          }
        },
      },
    }
  );
}
