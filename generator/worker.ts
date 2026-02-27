
import { supabase } from "../src/lib/supabase.ts";
import { manifest } from "./manifest.ts";

/**
 * Flux Background Worker
 * Listens for new intakes in Supabase and processes them automatically.
 */

async function startWorker() {
  console.log("🚀 Flux AI Build Worker Started...");
  console.log("Monitoring Supabase for new intakes...");

  // 1. Initial Check: Process any "new" intakes that were missed while worker was down
  const { data: missedIntakes } = await supabase
    .from("intakes")
    .select("id")
    .eq("status", "new");

  if (missedIntakes && missedIntakes.length > 0) {
    console.log(`Found ${missedIntakes.length} pending intakes. Processing...`);
    for (const intake of missedIntakes) {
      await safeManifest(intake.id);
    }
  }

  // 2. Realtime Listener: Watch for NEW rows
  supabase
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
        await safeManifest(payload.new.id);
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
        await safeManifest(payload.new.id);
      }
    )
    .subscribe();
}

let isProcessing = false;
const queue: string[] = [];

async function safeManifest(id: string) {
  if (isProcessing) {
    console.log(`Worker busy. Adding ${id} to queue.`);
    queue.push(id);
    return;
  }

  isProcessing = true;
  try {
    await manifest(id);
  } catch (err) {
    console.error(`Fatal worker error during manifest for ${id}:`, err);
  } finally {
    isProcessing = false;
    // Process next in queue if any
    const nextId = queue.shift();
    if (nextId) {
      console.log(`Processing next item in queue: ${nextId}`);
      await safeManifest(nextId);
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
