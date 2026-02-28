-- Full Schema for Flux Website Builder
-- Run this in your Supabase SQL Editor

-- 1. Create Intakes Table
CREATE TABLE IF NOT EXISTS intakes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text,
  email text,
  phone text,
  business_name text,
  industry text,
  location text,
  employee_count text,
  has_website boolean DEFAULT false,
  current_url text,
  links text,
  social_links text,
  services_list text,
  goal text,
  brand_voice text,
  target_audience text,
  hero_message text,
  colors text,
  logo_url text,
  pages text[] DEFAULT '{}'::text[],
  status text DEFAULT 'new',
  vertical text,
  layout text,
  extracted_colors text[] DEFAULT '{}'::text[],
  logo_quality text,
  rebuild_logo boolean DEFAULT false,
  deploy_hook text,
  build_time_ms bigint -- added for analytics
);

-- Enable RLS
ALTER TABLE intakes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public intake)
CREATE POLICY "Enable insert for all users" ON intakes FOR INSERT WITH CHECK (true);

-- Create policy to allow admin to select/update/delete
-- Note: Replace with proper auth check if needed
CREATE POLICY "Enable full access for authenticated users" ON intakes
  FOR ALL USING (auth.role() = 'authenticated');

-- 2. System Logs for Admin Dashboard
CREATE TABLE IF NOT EXISTS system_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  intake_id uuid REFERENCES intakes(id) ON DELETE CASCADE,
  level text NOT NULL DEFAULT 'INFO', -- INFO, WARN, ERROR, DEBUG
  category text NOT NULL, -- INTAKE, AI_GEN, DEPLOY, SYSTEM, ADMIN
  message text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_logs_intake_id ON system_logs(intake_id);
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON system_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_logs_category ON system_logs(category);

-- Enable RLS for system_logs
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for admin to see logs
CREATE POLICY "Enable select for authenticated users" ON system_logs
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow system to write logs (this is usually done via service role, but for local dev we might need more)
CREATE POLICY "Enable insert for authenticated users" ON system_logs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
