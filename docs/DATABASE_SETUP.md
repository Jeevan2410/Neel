# Database Setup Guide - NEEL ENTERPRISES

## Overview
This guide walks you through setting up the Supabase database for the NEEL ENTERPRISES website.

## Prerequisites
1. A Supabase account (free tier is sufficient)
2. Node.js 22+ recommended (Node 20 works but shows deprecation warnings)
3. The migration file: `database/migrations/001_initial_schema.sql`

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization (or create one)
4. Fill in:
   - **Project name**: `neel-enterprises`
   - **Database password**: Generate a strong password (save it securely)
   - **Region**: Choose closest to your target audience (e.g., Asia South for India)
5. Click "Create new project"
6. Wait for provisioning (~2 minutes)

## Step 2: Get API Keys

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `PUBLIC_SUPABASE_URL`
   - **anon public key** → `PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ **NEVER expose this client-side**

## Step 3: Configure Environment Variables

Create or update your `.env` file:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Step 4: Run Database Migration

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click "New query"
4. Copy the entire contents of `database/migrations/001_initial_schema.sql`
5. Paste into the editor
6. Click "Run" or press `Ctrl+Enter`
7. Verify success message

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

## Step 5: Verify Tables

In the Supabase Dashboard, go to **Table Editor** and verify these tables exist:

- ✅ `languages` (3 rows: en, kn, hi)
- ✅ `admins` (empty initially)
- ✅ `services` (15 rows)
- ✅ `service_translations` (empty - translations added via admin)
- ✅ `faqs` (empty - FAQs added via admin)
- ✅ `faq_translations` (empty)
- ✅ `locations` (2 rows: kinnigoli, bengaluru)
- ✅ `location_translations` (2 rows)
- ✅ `site_settings` (empty)
- ✅ `seo_metadata` (empty)
- ✅ `enquiries` (empty - populated via form submissions)

## Step 6: Create First Admin User

You need at least one admin user to access the admin panel:

### Via SQL Editor

Run this SQL (replace with your actual email):

```sql
INSERT INTO admins (email, full_name, role, is_active)
VALUES ('your-email@neelenterprises.com', 'Admin User', 'admin', true);
```

### Via Supabase Auth (Recommended for production)

1. Go to **Authentication** → **Users**
2. Click "Add user"
3. Enter email and temporary password
4. User will need to reset password on first login
5. Then add them to the `admins` table manually via SQL Editor

## Step 7: Test Enquiry Submission

1. Start your development server: `npm run dev`
2. Navigate to `/request-service`
3. Fill out and submit the form
4. Check Supabase Table Editor → `enquiries` table
5. Verify the enquiry appears with status "new"

## Row Level Security (RLS)

The migration includes RLS policies that:

- ✅ Allow public to read active services, FAQs, locations
- ✅ Allow public to submit enquiries
- ✅ Require authentication to read/update enquiries
- ✅ Require authentication to manage content (services, FAQs, etc.)

**Important:** The enquiry submission API uses the service role key to bypass RLS INSERT checks, which is safe because:
1. It runs server-side only
2. Input is validated with Zod schema
3. Service role key is never exposed to client

## Troubleshooting

### Error: "relation does not exist"
- Run the migration SQL script in Supabase SQL Editor

### Error: "permission denied for table"
- Check that RLS policies are enabled
- Verify you're using the correct API key (anon vs service_role)

### Enquiry not appearing in database
- Check browser console for errors
- Verify environment variables are set correctly
- Check API route logs: `npm run dev` shows request logs

### Node.js version warning
- Warning is safe to ignore for now
- Upgrade to Node 22+ when possible: `nvm install 22 && nvm use 22`

## Next Steps

After database setup:

1. ✅ Set up admin panel (`/admin` route)
2. ✅ Configure Cloudinary for media storage
3. ✅ Implement email notifications for enquiries
4. ✅ Add multilingual content (Kannada, Hindi)
5. ✅ Deploy to Cloudflare Pages

## Security Notes

- ⚠️ **NEVER** commit `.env` file to Git
- ⚠️ **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- ✅ Use `PUBLIC_SUPABASE_PUBLISHABLE_KEY` for client-side operations
- ✅ Enable RLS on all tables (done in migration)
- ✅ Validate all inputs server-side (implemented in API route)

## Support

For Supabase-specific issues:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)

For project-specific issues:
- Check `KNOWN_ISSUES.md`
- Review `PROJECT_STATE.md`
- See `DATABASE_SCHEMA.md` for detailed schema documentation
