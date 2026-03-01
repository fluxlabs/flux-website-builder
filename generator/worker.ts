import { supabase, supabaseAdmin } from "../src/lib/supabase.ts";
import { synthesize } from "./synthesize.ts";

/**
 * Flux Background Worker
 * Listens for new intakes in Supabase and processes them automatically.
 */

async function startWorker() {
  console.log("🚀 Flux AI Build Worker Started...");
  console.log("Monitoring Supabase for new intakes...");

  // 1. Initial Check: Process any "new" intakes using Admin client to bypass RLS
  const { data: missedIntakes } = await supabaseAdmin
    .from("intakes")
    .select("id")
    .eq("status", "new");

  if (missedIntakes && missedIntakes.length > 0) {
    console.log(`Found ${missedIntakes.length} pending intakes. Processing...`);
    for (const intake of missedIntakes) {
      const mode = await getModeForIntake(intake.id);
      await safeSynthesize(intake.id, mode);
    }
  }

  // 2. Realtime Listener: Watch for NEW rows
  supabaseAdmin
    .channel("schema-db-changes")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "intakes",
      },
      async (payload) => {
        console.log("New intake received via Realtime:", payload.new.id);
        const mode = await getModeForIntake(payload.new.id);
        await safeSynthesize(payload.new.id, mode);
      }
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "intakes",
        filter: "status=eq.new"
      },
      async (payload) => {
        console.log("Intake reset to 'new' via update:", payload.new.id);
        const mode = await getModeForIntake(payload.new.id);
        await safeSynthesize(payload.new.id, mode);
      }
    )
    .subscribe();
}

async function getModeForIntake(intakeId: string): Promise<'full' | 'research' | 'design'> {
  const { data: logs } = await supabaseAdmin
    .from('system_logs')
    .select('message')
    .eq('intake_id', intakeId)
    .eq('category', 'SYSTEM')
    .ilike('message', 'REQUESTED_MODE:%')
    .order('created_at', { ascending: false })
    .limit(1);
    
  if (logs && logs.length > 0) {
    const modeStr = logs[0].message.split(': ')[1];
    if (['full', 'research', 'design'].includes(modeStr)) {
      return modeStr as any;
    }
  }
  
  return 'full';
}

let isProcessing = false;
const queue: { id: string, mode: 'full' | 'research' | 'design' }[] = [];

async function safeSynthesize(id: string, mode: 'full' | 'research' | 'design' = 'full') {
  if (isProcessing) {
    // Deduplicate — don't queue the same intake twice
    if (queue.find(item => item.id === id)) {
      console.log(`Worker busy. ${id} already in queue, skipping.`);
      return;
    }
    console.log(`Worker busy. Adding ${id} (${mode}) to queue.`);
    queue.push({ id, mode });
    return;
  }

  isProcessing = true;
  try {
    await synthesize(id, mode);
  } catch (err) {
    console.error(`Fatal worker error during synthesis for ${id}:`, err);
  } finally {
    isProcessing = false;
    // Process next in queue if any
    const nextItem = queue.shift();
    if (nextItem) {
      console.log(`Processing next item in queue: ${nextItem.id} (${nextItem.mode})`);
      await safeSynthesize(nextItem.id, nextItem.mode);
    }
  }
}

// Keep the process alive
startWorker();

// Error handling for the worker process
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
