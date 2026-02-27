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
ADD COLUMN extracted_colors text[],
ADD COLUMN logo_quality text,
ADD COLUMN rebuild_logo boolean DEFAULT false;
