import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const { error } = await supabase
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
