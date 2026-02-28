-- Run this in your Supabase SQL Editor to update the schema
ALTER TABLE intakes
ADD COLUMN phone text,
ADD COLUMN has_website boolean,
ADD COLUMN industry text,
ADD COLUMN location text,
ADD COLUMN employee_count text,
ADD COLUMN deploy_hook text,
ADD COLUMN vertical text,
ADD COLUMN layout text,
ADD COLUMN social_links text,
ADD COLUMN services_list text,
ADD COLUMN extracted_colors text[],
ADD COLUMN logo_quality text,
ADD COLUMN rebuild_logo boolean DEFAULT false;

-- System Logs for Admin Dashboard
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
