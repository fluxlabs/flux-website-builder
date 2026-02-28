import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Use this for background workers and administrative tasks that need to bypass RLS
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabase;

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
export type LogCategory = 'INTAKE' | 'AI_GEN' | 'DEPLOY' | 'SYSTEM' | 'ADMIN';

export async function logEvent({
  intakeId,
  level = 'INFO',
  category,
  message,
  metadata = {}
}: {
  intakeId?: string;
  level?: LogLevel;
  category: LogCategory;
  message: string;
  metadata?: any;
}) {
  // Use admin client for logging to ensure logs are always written
  const { error } = await supabaseAdmin
    .from('system_logs')
    .insert([
      {
        intake_id: intakeId,
        level,
        category,
        message,
        metadata
      }
    ]);

  if (error) {
    console.error('Failed to write to system_logs:', error);
  }
}
